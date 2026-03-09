import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'

function _locDateStr(d) { return d.toISOString().slice(0, 10) }
const _locNow = new Date()
const _locMonthStart = `${_locNow.getFullYear()}-${String(_locNow.getMonth() + 1).padStart(2,'0')}-01T00:00:00`
const _locMonthEnd   = _locDateStr(_locNow) + 'T23:59:59'

const MONTH_START = _locMonthStart
const MONTH_END   = _locMonthEnd

const FALLBACK_LOCATIONS = [
  { id: '11111111-0001-0001-0001-000000000001', name: 'Downtown',     city: 'Austin', status: 'open',         managerName: 'Devon R.',  barberCount: 2, revenue: 18420, appts: 142 },
  { id: '11111111-0001-0001-0001-000000000002', name: 'East Side',    city: 'Austin', status: 'open',         managerName: 'Marcus V.', barberCount: 2, revenue: 12380, appts: 98  },
  { id: '11111111-0001-0001-0001-000000000003', name: 'North Campus', city: 'Austin', status: 'coming-soon',  managerName: null,        barberCount: 0, revenue: 0,     appts: 0   },
]

export const useLocationStore = defineStore('location', () => {
  const locations       = ref(FALLBACK_LOCATIONS)
  const activeLocationId = ref('11111111-0001-0001-0001-000000000001')
  const loading         = ref(false)

  const activeLocation = computed(() =>
    locations.value.find(l => l.id === activeLocationId.value) || null
  )

  function setActive(id) {
    activeLocationId.value = id
  }

  async function fetch() {
    loading.value = true
    try {
      const [locRes, apptRes, barberRes] = await Promise.all([
        supabase.from('locations').select('id, name, city, status'),
        supabase
          .from('appointments')
          .select('location_id, price_paid, status')
          .gte('starts_at', MONTH_START)
          .lte('starts_at', MONTH_END),
        supabase.from('barbers').select('id, location_id'),
      ])

      if (locRes.error) throw locRes.error

      if (!(locRes.data?.length > 0)) return

      const appts  = apptRes.data || []
      const barbers = barberRes.data || []

      // Revenue per location (completed only)
      const revenueMap = {}
      const apptCountMap = {}
      appts.forEach(a => {
        const lid = a.location_id
        if (!revenueMap[lid]) { revenueMap[lid] = 0; apptCountMap[lid] = 0 }
        if (a.status === 'completed') revenueMap[lid] += parseFloat(a.price_paid || 0)
        apptCountMap[lid] += 1
      })

      // Barber count per location
      const barberCountMap = {}
      barbers.forEach(b => {
        barberCountMap[b.location_id] = (barberCountMap[b.location_id] || 0) + 1
      })

      locations.value = (locRes.data || []).map(l => ({
        id:           l.id,
        name:         l.name,
        city:         l.city,
        status:       l.status === 'active' ? 'open' : 'coming-soon',
        managerName:  null,
        barberCount:  barberCountMap[l.id] || 0,
        revenue:      Math.round(revenueMap[l.id] || 0),
        appts:        apptCountMap[l.id] || 0,
      }))

      // Default active to first location
      if (!activeLocationId.value && locations.value.length > 0) {
        activeLocationId.value = locations.value[0].id
      }
    } finally {
      loading.value = false
    }
  }

  fetch()

  return { locations, activeLocationId, activeLocation, setActive, loading, fetch }
})
