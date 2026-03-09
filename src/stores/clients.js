import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

const FALLBACK_CLIENTS = [
  { id: 'c1',  name: 'Marcus Johnson', initials: 'MJ', plan: 'vip',       lastVisit: '2026-03-06', daysSince: 3,  visits: 48, totalSpend: 4320, preferredBarber: 'Devon R.',  preferredService: 'Signature Cut + Beard',          notes: 'Low fade on sides, keep top longer. Beard: sharp line.',        suggestedUpsell: 'Royal Shave +$35' },
  { id: 'c2',  name: 'James T.',       initials: 'JT', plan: 'premium',   lastVisit: '2026-02-28', daysSince: 9,  visits: 32, totalSpend: 2848, preferredBarber: 'Devon R.',  preferredService: 'Royal Shave',                    notes: 'Allergic to some aftershave. Use unscented.',                   suggestedUpsell: 'Signature Cut +$65' },
  { id: 'c3',  name: 'Antoine B.',     initials: 'AB', plan: 'essential', lastVisit: '2026-02-20', daysSince: 17, visits: 18, totalSpend: 882,  preferredBarber: 'Marcus V.', preferredService: 'Haircut + Design',               notes: 'Always wants design on the left side.',                        suggestedUpsell: 'Upgrade to Premium plan' },
  { id: 'c4',  name: 'Chris W.',       initials: 'CW', plan: 'premium',   lastVisit: '2026-03-05', daysSince: 4,  visits: 25, totalSpend: 2225, preferredBarber: 'Devon R.',  preferredService: 'Fade + Lineup',                  notes: 'Skin fade, very precise on the lineup.',                       suggestedUpsell: 'Add beard trim +$25' },
  { id: 'c5',  name: 'David K.',       initials: 'DK', plan: 'essential', lastVisit: '2026-01-15', daysSince: 52, visits: 9,  totalSpend: 441,  preferredBarber: 'James P.',  preferredService: 'Signature Cut',                  notes: "Long-time client, hasn't been in since Jan.",                  suggestedUpsell: 'Win-back: 20% off next visit' },
  { id: 'c6',  name: 'Michael R.',     initials: 'MR', plan: 'vip',       lastVisit: '2026-03-08', daysSince: 1,  visits: 62, totalSpend: 6200, preferredBarber: 'Devon R.',  preferredService: 'Full Service (Cut+Beard+Shave)', notes: 'VIP — always runs on time. Tips well.',                        suggestedUpsell: 'Monthly product bundle +$40' },
  { id: 'c7',  name: 'Carlos M.',      initials: 'CM', plan: 'premium',   lastVisit: '2026-03-04', daysSince: 5,  visits: 21, totalSpend: 1869, preferredBarber: 'Marcus V.', preferredService: 'Beard Trim',                     notes: 'Square beard, keep it full.',                                  suggestedUpsell: 'Add hair cut +$55' },
  { id: 'c8',  name: 'Tyrone B.',      initials: 'TB', plan: 'essential', lastVisit: '2026-02-22', daysSince: 15, visits: 14, totalSpend: 686,  preferredBarber: 'Andre S.',  preferredService: 'Signature Cut',                  notes: 'Bald taper, keeps it tight.',                                  suggestedUpsell: 'Beard consultation +$20' },
  { id: 'c9',  name: 'Jordan T.',      initials: 'JT', plan: 'vip',       lastVisit: '2026-03-07', daysSince: 2,  visits: 37, totalSpend: 3700, preferredBarber: 'Devon R.',  preferredService: 'Signature Cut + Beard',          notes: 'Travelling client — always calls ahead.',                      suggestedUpsell: 'Refer a friend: +1 free cut' },
  { id: 'c10', name: 'DeShawn P.',     initials: 'DP', plan: 'premium',   lastVisit: '2026-01-08', daysSince: 59, visits: 6,  totalSpend: 534,  preferredBarber: 'James P.',  preferredService: 'Fade + Lineup',                  notes: 'At risk of churn — no visit in 2 months.',                    suggestedUpsell: 'Win-back offer: free beard trim' },
]

export const useClientsStore = defineStore('clients', () => {
  const clients = ref(FALLBACK_CLIENTS)
  const loading = ref(false)

  function initials(name) {
    if (!name) return '??'
    return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
  }

  function daysSince(dateStr) {
    if (!dateStr) return null
    const diff = Date.now() - new Date(dateStr).getTime()
    return Math.floor(diff / 86400000)
  }

  async function fetch() {
    loading.value = true
    try {
      const [clientRes, barberRes, serviceRes] = await Promise.all([
        supabase.from('clients').select(`
          id,
          name,
          style_notes,
          preferred_barber_id,
          preferred_service_id,
          subscriptions (
            status,
            cuts_used_this_month,
            membership_plans ( name, price, cuts_per_month )
          ),
          appointments (
            id,
            starts_at,
            price_paid,
            status
          )
        `),
        supabase.from('barbers_with_profile').select('id, display_name'),
        supabase.from('services').select('id, name'),
      ])

      if (clientRes.error) throw clientRes.error
      if (barberRes.error) throw barberRes.error
      if (serviceRes.error) throw serviceRes.error

      if (!(clientRes.data?.length > 0)) return

      const barberMap = Object.fromEntries((barberRes.data || []).map(b => [b.id, b.display_name]))
      const serviceMap = Object.fromEntries((serviceRes.data || []).map(s => [s.id, s.name]))

      clients.value = (clientRes.data || []).map(c => {
        const completedAppts = (c.appointments || []).filter(a => a.status === 'completed')
        const lastAppt = completedAppts.sort((a, b) => new Date(b.starts_at) - new Date(a.starts_at))[0]
        const totalSpend = completedAppts.reduce((sum, a) => sum + (parseFloat(a.price_paid) || 0), 0)

        const sub = (c.subscriptions || [])[0]
        const planName = sub?.membership_plans?.name?.toLowerCase() || 'none'
        const cutsUsed = sub?.cuts_used_this_month ?? null
        const cutsAllowed = sub?.membership_plans?.cuts_per_month ?? null

        return {
          id: c.id,
          name: c.name || 'Unknown',
          initials: initials(c.name),
          plan: planName === 'none' ? null : planName,
          lastVisit: lastAppt ? lastAppt.starts_at.slice(0, 10) : null,
          daysSince: lastAppt ? daysSince(lastAppt.starts_at) : null,
          visits: completedAppts.length,
          totalSpend: Math.round(totalSpend),
          preferredBarber: barberMap[c.preferred_barber_id] || null,
          preferredService: serviceMap[c.preferred_service_id] || null,
          notes: c.style_notes || '',
          suggestedUpsell: null,
        }
      })
    } finally {
      loading.value = false
    }
  }

  fetch()

  return { clients, loading, fetch }
})
