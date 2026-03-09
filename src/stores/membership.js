import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

const PLAN_META = {
  Essential: { color: '#a8b8c8', perks: ['2 cuts/month', 'Booking priority', 'Member check-in'] },
  Premium:   { color: '#c9a84c', perks: ['Unlimited cuts', '15% retail discount', 'Skip-the-line'] },
  VIP:       { color: '#e8e8e8', perks: ['Unlimited cuts', 'Free monthly product', 'Concierge booking', 'Dedicated barber'] },
}

const FALLBACK_PLANS = [
  { id: 'essential', label: 'Essential', price: 49,  cuts: 2,    color: PLAN_META.Essential.color, perks: PLAN_META.Essential.perks },
  { id: 'premium',   label: 'Premium',   price: 89,  cuts: null, color: PLAN_META.Premium.color,   perks: PLAN_META.Premium.perks   },
  { id: 'vip',       label: 'VIP',       price: 149, cuts: null, color: PLAN_META.VIP.color,       perks: PLAN_META.VIP.perks       },
]

const FALLBACK_SUBSCRIBERS = [
  { id: 's1',  name: 'Marcus Johnson', plan: 'vip',       status: 'active',   billingDate: '2026-03-15', cutsUsed: null, cutsAllowed: null, locationId: '11111111-0001-0001-0001-000000000001' },
  { id: 's2',  name: 'James T.',       plan: 'premium',   status: 'active',   billingDate: '2026-03-22', cutsUsed: null, cutsAllowed: null, locationId: '11111111-0001-0001-0001-000000000001' },
  { id: 's3',  name: 'Antoine B.',     plan: 'essential', status: 'active',   billingDate: '2026-03-10', cutsUsed: 1,    cutsAllowed: 2,    locationId: '11111111-0001-0001-0001-000000000002' },
  { id: 's4',  name: 'Chris W.',       plan: 'premium',   status: 'active',   billingDate: '2026-03-28', cutsUsed: null, cutsAllowed: null, locationId: '11111111-0001-0001-0001-000000000001' },
  { id: 's5',  name: 'David K.',       plan: 'essential', status: 'at-risk',  billingDate: '2026-03-09', cutsUsed: 2,    cutsAllowed: 2,    locationId: '11111111-0001-0001-0001-000000000002' },
  { id: 's6',  name: 'Michael R.',     plan: 'vip',       status: 'active',   billingDate: '2026-03-18', cutsUsed: null, cutsAllowed: null, locationId: '11111111-0001-0001-0001-000000000001' },
  { id: 's7',  name: 'Carlos M.',      plan: 'premium',   status: 'active',   billingDate: '2026-03-25', cutsUsed: null, cutsAllowed: null, locationId: '11111111-0001-0001-0001-000000000002' },
  { id: 's8',  name: 'Tyrone B.',      plan: 'essential', status: 'active',   billingDate: '2026-03-12', cutsUsed: 0,    cutsAllowed: 2,    locationId: '11111111-0001-0001-0001-000000000001' },
  { id: 's9',  name: 'Jordan T.',      plan: 'vip',       status: 'active',   billingDate: '2026-03-20', cutsUsed: null, cutsAllowed: null, locationId: '11111111-0001-0001-0001-000000000001' },
  { id: 's10', name: 'DeShawn P.',     plan: 'premium',   status: 'inactive', billingDate: '2026-03-05', cutsUsed: null, cutsAllowed: null, locationId: '11111111-0001-0001-0001-000000000002' },
]

const FALLBACK_STATS = { totalSubscribers: 10, mrr: 921, churnRate: 4.2, avgPlanValue: 92.1, upgradeRate: 12.5 }

export const useMembershipStore = defineStore('membership', () => {
  const plans       = ref(FALLBACK_PLANS)
  const subscribers = ref(FALLBACK_SUBSCRIBERS)
  const stats       = ref(FALLBACK_STATS)
  const loading     = ref(false)

  async function fetch() {
    loading.value = true
    try {
      const [planRes, subRes] = await Promise.all([
        supabase.from('membership_plans').select('id, name, price, cuts_per_month').order('price'),
        supabase.from('subscriptions').select(`
          id,
          status,
          billing_date,
          cuts_used_this_month,
          clients ( id, name, preferred_barber_id ),
          membership_plans ( id, name, price, cuts_per_month )
        `),
      ])

      if (planRes.error) throw planRes.error
      if (subRes.error) throw subRes.error

      if (!(planRes.data?.length > 0) && !(subRes.data?.length > 0)) return

      // Plans
      plans.value = (planRes.data || []).map(p => ({
        id: p.name.toLowerCase(),
        label: p.name,
        price: parseFloat(p.price),
        cuts: p.cuts_per_month >= 999 ? null : p.cuts_per_month,
        color: PLAN_META[p.name]?.color || '#888',
        perks: PLAN_META[p.name]?.perks || [],
      }))

      // Get barber location map for preferred barbers
      const barberIds = [...new Set(
        (subRes.data || [])
          .map(s => s.clients?.preferred_barber_id)
          .filter(Boolean)
      )]
      let barberLocMap = {}
      if (barberIds.length > 0) {
        const { data: barberData } = await supabase
          .from('barbers')
          .select('id, location_id')
          .in('id', barberIds)
        ;(barberData || []).forEach(b => {
          barberLocMap[b.id] = b.location_id
        })
      }

      // Subscribers
      subscribers.value = (subRes.data || []).map(s => {
        const planName = s.membership_plans?.name || ''
        const cutsAllowed = s.membership_plans?.cuts_per_month
        return {
          id: s.id,
          name: s.clients?.name || 'Unknown',
          plan: planName.toLowerCase(),
          status: s.status,
          billingDate: s.billing_date,
          cutsUsed: s.cuts_used_this_month ?? null,
          cutsAllowed: cutsAllowed >= 999 ? null : cutsAllowed,
          locationId: barberLocMap[s.clients?.preferred_barber_id] || null,
        }
      })

      // Stats
      const active = subscribers.value.filter(s => s.status === 'active')
      const inactive = subscribers.value.filter(s => s.status === 'cancelled' || s.status === 'past_due')
      const mrr = (subRes.data || [])
        .filter(s => s.status === 'active')
        .reduce((sum, s) => sum + parseFloat(s.membership_plans?.price || 0), 0)
      const churnRate = subscribers.value.length > 0
        ? Math.round((inactive.length / subscribers.value.length) * 1000) / 10
        : 0
      const avgPlanValue = active.length > 0
        ? Math.round((mrr / active.length) * 10) / 10
        : 0

      stats.value = {
        totalSubscribers: subscribers.value.length,
        mrr: Math.round(mrr),
        churnRate,
        avgPlanValue,
        upgradeRate: 12.5,
      }
    } finally {
      loading.value = false
    }
  }

  fetch()

  return { plans, subscribers, stats, loading, fetch }
})
