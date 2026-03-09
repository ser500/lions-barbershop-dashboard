import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

function toISO(d) { return d.toISOString().slice(0, 10) }
const _today = new Date()
const _thirtyAgo = new Date(_today); _thirtyAgo.setDate(_today.getDate() - 30)

const TODAY_START     = toISO(_today) + 'T00:00:00'
const TODAY_END       = toISO(_today) + 'T23:59:59'
const MONTH_START     = `${_today.getFullYear()}-${String(_today.getMonth()+1).padStart(2,'0')}-01T00:00:00`
const THIRTY_DAYS_AGO = toISO(_thirtyAgo) + 'T00:00:00'

const FALLBACK_TODAY_APPTS = [
  { id: 'fa1', time: '9:00 AM',  client: 'Marcus Johnson', plan: 'vip',       service: 'Signature Cut + Beard', duration: 60, status: 'completed', revenue: 110 },
  { id: 'fa2', time: '10:30 AM', client: 'James T.',       plan: 'premium',   service: 'Royal Shave',           duration: 30, status: 'in-chair',  revenue: 75  },
  { id: 'fa3', time: '11:15 AM', client: 'Chris W.',       plan: 'premium',   service: 'Fade + Lineup',         duration: 45, status: 'upcoming',  revenue: 80  },
  { id: 'fa4', time: '1:00 PM',  client: 'Michael R.',     plan: 'vip',       service: 'Full Service',          duration: 75, status: 'upcoming',  revenue: 150 },
  { id: 'fa5', time: '2:30 PM',  client: 'Jordan T.',      plan: 'vip',       service: 'Signature Cut + Beard', duration: 60, status: 'upcoming',  revenue: 110 },
]

const FALLBACK_EARNINGS = { mtd: 7840, avgTicket: 117, tipRate: 22, totalAppts: 67 }

function initials(name) {
  if (!name) return '??'
  return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
}

function formatTime(ts) {
  const d = new Date(ts)
  let h = d.getHours()
  const m = String(d.getMinutes()).padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  return `${h}:${m} ${ampm}`
}

export const useBarberStore = defineStore('barber', () => {
  const profile      = ref({ id: null, name: 'Devon R.', initials: 'DR', location: 'Downtown', locationId: '11111111-0001-0001-0001-000000000001', role: 'Senior Barber' })
  const todayAppts   = ref(FALLBACK_TODAY_APPTS)
  const earnings     = ref(FALLBACK_EARNINGS)
  const earningsTrend = ref([])
  const reviews      = ref([])
  const avgRating    = ref(4.9)
  const loading      = ref(false)

  async function fetch() {
    loading.value = true
    try {
      // 1. Get the current session
      const { data: { session } } = await supabase.auth.getSession()

      let barberId = null
      let locationId = null
      let locationName = ''
      let displayName = ''
      let fullName = ''

      if (session?.user) {
        const { data: prof } = await supabase
          .from('profiles')
          .select('barber_id, name, display_name, location_id, role, locations(name)')
          .eq('id', session.user.id)
          .single()

        if (prof) {
          barberId    = prof.barber_id
          locationId  = prof.location_id
          locationName = prof.locations?.name || ''
          displayName = prof.display_name || prof.name || ''
          fullName    = prof.name || ''
        }
      }

      // Fallback to Devon for demo when not logged in
      if (!barberId) {
        barberId    = 'bbbbbbbb-bbbb-bbbb-bbbb-000000000001'
        locationId  = '11111111-0001-0001-0001-000000000001'
        locationName = 'Downtown'
        displayName = 'Devon R.'
        fullName    = 'Devon Richards'
      }

      profile.value = {
        id: barberId,
        name: fullName || displayName,
        initials: initials(fullName || displayName),
        location: locationName,
        locationId,
        role: 'Senior Barber',
      }

      // 2. Today's appointments
      const { data: apptData } = await supabase
        .from('appointments')
        .select(`
          id,
          starts_at,
          ends_at,
          status,
          price_paid,
          clients ( name ),
          services ( name, duration_min ),
          client_id
        `)
        .eq('barber_id', barberId)
        .gte('starts_at', TODAY_START)
        .lte('starts_at', TODAY_END)
        .order('starts_at')

      // Fetch subscriptions for these clients to get plan names
      const clientIds = [...new Set((apptData || []).map(a => a.client_id))]
      let planMap = {}
      if (clientIds.length > 0) {
        const { data: subData } = await supabase
          .from('subscriptions')
          .select('client_id, membership_plans(name)')
          .in('client_id', clientIds)
          .eq('status', 'active')
        ;(subData || []).forEach(s => {
          planMap[s.client_id] = s.membership_plans?.name?.toLowerCase() || null
        })
      }

      if ((apptData || []).length > 0) todayAppts.value = (apptData || []).map(a => {
        let uiStatus = a.status
        if (a.status === 'confirmed') uiStatus = 'in-chair'
        if (a.status === 'scheduled') uiStatus = 'upcoming'

        return {
          id: a.id,
          time: formatTime(a.starts_at),
          client: a.clients?.name || 'Unknown',
          plan: planMap[a.client_id] || null,
          service: a.services?.name || '',
          duration: a.services?.duration_min || 0,
          status: uiStatus,
          revenue: parseFloat(a.price_paid) || 0,
        }
      })

      // 3. MTD earnings
      const { data: mtdPayments } = await supabase
        .from('payments')
        .select('amount, appointment_id, appointments!inner(barber_id)')
        .eq('appointments.barber_id', barberId)
        .gte('created_at', MONTH_START)

      const mtdTotal = (mtdPayments || []).reduce((s, p) => s + parseFloat(p.amount), 0)
      const mtdCount = (mtdPayments || []).length
      if (mtdCount > 0) {
        earnings.value = {
          mtd: Math.round(mtdTotal),
          avgTicket: Math.round(mtdTotal / mtdCount),
          tipRate: 22,
          totalAppts: mtdCount,
        }
      }

      // 4. Earnings trend — last 30 days
      const { data: trendPayments } = await supabase
        .from('payments')
        .select('amount, created_at, appointments!inner(barber_id)')
        .eq('appointments.barber_id', barberId)
        .gte('created_at', THIRTY_DAYS_AGO)
        .order('created_at')

      const dayBuckets = {}
      const trendStart = new Date(THIRTY_DAYS_AGO)
      for (let i = 0; i < 30; i++) {
        const d = new Date(trendStart)
        d.setDate(d.getDate() + i)
        dayBuckets[d.toISOString().slice(0, 10)] = 0
      }
      ;(trendPayments || []).forEach(p => {
        const day = p.created_at.slice(0, 10)
        if (day in dayBuckets) dayBuckets[day] += parseFloat(p.amount)
      })
      earningsTrend.value = Object.values(dayBuckets).map(v => Math.round(v))

      // 5. Reviews
      const { data: reviewData } = await supabase
        .from('reviews')
        .select('id, rating, body, created_at, client_id, clients(name)')
        .eq('barber_id', barberId)
        .order('created_at', { ascending: false })

      if ((reviewData || []).length > 0) {
        reviews.value = reviewData.map(r => ({
          id: r.id,
          client: r.clients?.name || 'Client',
          rating: r.rating,
          text: r.body || '',
          date: r.created_at?.slice(0, 10) || '',
        }))

        const totalRating = reviews.value.reduce((s, r) => s + r.rating, 0)
        avgRating.value = Math.round((totalRating / reviews.value.length) * 10) / 10
      }

    } finally {
      loading.value = false
    }
  }

  fetch()

  return { profile, todayAppts, earnings, earningsTrend, reviews, avgRating, loading, fetch }
})
