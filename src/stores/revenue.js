import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

// Dynamic dates — always relative to today
function dateStr(d) { return d.toISOString().slice(0, 10) }
const _now      = new Date()
const _yesterday = new Date(_now); _yesterday.setDate(_now.getDate() - 1)
const _sixMonthsAgo = new Date(_now); _sixMonthsAgo.setMonth(_now.getMonth() - 6)
const _prevMonthStart = new Date(_now.getFullYear(), _now.getMonth() - 1, 1)
const _prevMonthSameDayEnd = new Date(_now.getFullYear(), _now.getMonth() - 1, _now.getDate())

const TODAY           = dateStr(_now)
const YESTERDAY       = dateStr(_yesterday)
const MONTH_START     = `${_now.getFullYear()}-${String(_now.getMonth() + 1).padStart(2,'0')}-01`
const SIX_MONTHS_AGO  = dateStr(_sixMonthsAgo)
const PREV_MONTH_START = dateStr(_prevMonthStart)
const PREV_MONTH_END   = dateStr(_prevMonthSameDayEnd)

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

// Static fallback data — shows immediately before Supabase loads
const FALLBACK_DAILY   = { today: 3840, yesterday: 3120, goal: 4200, mtd: 68420, lastMtd: 61800 }
const FALLBACK_WEEKLY  = [3840, 4200, 3650, 4800, 3200, 4100, 3900]
const FALLBACK_MONTHLY = [
  { month: 'Sep', service: 14200, retail: 2100, mrr: 820 },
  { month: 'Oct', service: 15800, retail: 2400, mrr: 860 },
  { month: 'Nov', service: 16200, retail: 2800, mrr: 880 },
  { month: 'Dec', service: 18900, retail: 3600, mrr: 900 },
  { month: 'Jan', service: 15400, retail: 2200, mrr: 910 },
  { month: 'Feb', service: 17800, retail: 2900, mrr: 921 },
]
const FALLBACK_BY_BARBER = [
  { name: 'Devon R.',  revenue: 28400, appts: 218, avgTicket: 130 },
  { name: 'Marcus V.', revenue: 19800, appts: 162, avgTicket: 122 },
  { name: 'James P.',  revenue: 16200, appts: 138, avgTicket: 117 },
  { name: 'Andre S.',  revenue: 11420, appts: 96,  avgTicket: 119 },
]
const FALLBACK_BY_SERVICE = [
  { name: 'Signature Cut',   revenue: 28400, pct: 38 },
  { name: 'Fade + Design',   revenue: 18600, pct: 25 },
  { name: 'Beard Services',  revenue: 13400, pct: 18 },
  { name: 'Royal Shave',     revenue: 8900,  pct: 12 },
  { name: 'Retail Products', revenue: 5200,  pct: 7  },
]

export const useRevenueStore = defineStore('revenue', () => {
  const daily   = ref(FALLBACK_DAILY)
  const weekly  = ref(FALLBACK_WEEKLY)
  const monthly = ref(FALLBACK_MONTHLY)
  const byBarber  = ref(FALLBACK_BY_BARBER)
  const byService = ref(FALLBACK_BY_SERVICE)
  const loading = ref(false)

  async function fetch() {
    loading.value = true
    try {
      // Fetch all payments with appointment context for last 6 months
      const { data: payments, error: paymentsErr } = await supabase
        .from('payments')
        .select(`
          id,
          amount,
          method,
          created_at,
          appointments (
            barber_id,
            service_id,
            location_id,
            starts_at,
            services!appointments_service_id_fkey ( name ),
            barbers ( id )
          )
        `)
        .gte('created_at', SIX_MONTHS_AGO)

      if (paymentsErr) throw paymentsErr

      // Fetch barber display names
      const { data: barberProfiles } = await supabase
        .from('barbers_with_profile')
        .select('id, display_name')

      const barberNameMap = Object.fromEntries(
        (barberProfiles || []).map(b => [b.id, b.display_name])
      )

      // Fetch active subscriptions for MRR by month (use current MRR for all months as approximation)
      const { data: subs } = await supabase
        .from('subscriptions')
        .select('status, membership_plans(price)')

      const activeMrr = (subs || [])
        .filter(s => s.status === 'active')
        .reduce((sum, s) => sum + parseFloat(s.membership_plans?.price || 0), 0)

      const allPayments = payments || []

      // Only replace fallback if Supabase returned real data
      if (allPayments.length === 0) return

      // Helper: sum payments for a date range
      function sumForRange(start, end) {
        return allPayments
          .filter(p => p.created_at >= start && p.created_at < end)
          .reduce((s, p) => s + parseFloat(p.amount), 0)
      }

      // Daily
      const todayTotal     = sumForRange(TODAY + 'T00:00:00', TODAY + 'T23:59:59')
      const yesterdayTotal = sumForRange(YESTERDAY + 'T00:00:00', YESTERDAY + 'T23:59:59')
      const mtdTotal       = sumForRange(MONTH_START + 'T00:00:00', TODAY + 'T23:59:59')
      const lastMtd        = sumForRange(PREV_MONTH_START + 'T00:00:00', PREV_MONTH_END + 'T23:59:59')

      daily.value = {
        today:    Math.round(todayTotal),
        yesterday: Math.round(yesterdayTotal),
        goal:     4200,
        mtd:      Math.round(mtdTotal),
        lastMtd:  Math.round(lastMtd),
      }

      // Weekly — last 7 days
      const weeklyData = []
      for (let i = 6; i >= 0; i--) {
        const d = new Date(_now)
        d.setDate(d.getDate() - i)
        const ds = d.toISOString().slice(0, 10)
        weeklyData.push(Math.round(sumForRange(ds + 'T00:00:00', ds + 'T23:59:59')))
      }
      weekly.value = weeklyData

      // Monthly — last 6 months
      const monthlyData = []
      for (let i = 5; i >= 0; i--) {
        const d = new Date(_now.getFullYear(), _now.getMonth() - i, 1)
        const year  = d.getFullYear()
        const month = d.getMonth()
        const start = `${year}-${String(month + 1).padStart(2, '0')}-01T00:00:00`
        const nextMonth = new Date(year, month + 1, 1)
        const end = nextMonth.toISOString().slice(0, 10) + 'T00:00:00'
        const serviceTotal = Math.round(sumForRange(start, end))
        monthlyData.push({
          month: MONTH_NAMES[month],
          service: serviceTotal,
          retail: 0,
          mrr: Math.round(activeMrr),
        })
      }
      monthly.value = monthlyData

      // By barber
      const barberMap = {}
      allPayments.forEach(p => {
        const bid = p.appointments?.barber_id
        if (!bid) return
        if (!barberMap[bid]) barberMap[bid] = { revenue: 0, appts: 0 }
        barberMap[bid].revenue += parseFloat(p.amount)
        barberMap[bid].appts  += 1
      })
      byBarber.value = Object.entries(barberMap)
        .map(([bid, d]) => ({
          name:      barberNameMap[bid] || 'Unknown',
          revenue:   Math.round(d.revenue),
          appts:     d.appts,
          avgTicket: d.appts > 0 ? Math.round(d.revenue / d.appts) : 0,
        }))
        .sort((a, b) => b.revenue - a.revenue)

      // By service
      const serviceMap = {}
      allPayments.forEach(p => {
        const sname = p.appointments?.services?.name
        if (!sname) return
        if (!serviceMap[sname]) serviceMap[sname] = 0
        serviceMap[sname] += parseFloat(p.amount)
      })
      const totalServiceRevenue = Object.values(serviceMap).reduce((s, v) => s + v, 0)
      byService.value = Object.entries(serviceMap)
        .map(([name, revenue]) => ({
          name,
          revenue: Math.round(revenue),
          pct: totalServiceRevenue > 0 ? Math.round((revenue / totalServiceRevenue) * 100) : 0,
        }))
        .sort((a, b) => b.revenue - a.revenue)

    } finally {
      loading.value = false
    }
  }

  fetch()

  return { daily, weekly, monthly, byBarber, byService, loading, fetch }
})
