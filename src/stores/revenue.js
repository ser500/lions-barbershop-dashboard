import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useRevenueStore = defineStore('revenue', () => {
  const daily = ref({ today: 3840, yesterday: 3120, goal: 4200, mtd: 68420, lastMtd: 61800 })
  const weekly = ref([3840, 4200, 3650, 4800, 3200, 4100, 3900])
  const monthly = ref([
    { month: 'Sep', service: 14200, retail: 2100, mrr: 820 },
    { month: 'Oct', service: 15800, retail: 2400, mrr: 860 },
    { month: 'Nov', service: 16200, retail: 2800, mrr: 880 },
    { month: 'Dec', service: 18900, retail: 3600, mrr: 900 },
    { month: 'Jan', service: 15400, retail: 2200, mrr: 910 },
    { month: 'Feb', service: 17800, retail: 2900, mrr: 921 },
  ])
  const byBarber = ref([
    { name: 'Devon R.',  revenue: 28400, appts: 218, avgTicket: 130 },
    { name: 'Marcus V.', revenue: 19800, appts: 162, avgTicket: 122 },
    { name: 'James P.',  revenue: 16200, appts: 138, avgTicket: 117 },
    { name: 'Andre S.',  revenue: 11420, appts: 96,  avgTicket: 119 },
  ])
  const byService = ref([
    { name: 'Signature Cut',   revenue: 28400, pct: 38 },
    { name: 'Fade + Design',   revenue: 18600, pct: 25 },
    { name: 'Beard Services',  revenue: 13400, pct: 18 },
    { name: 'Royal Shave',     revenue: 8900,  pct: 12 },
    { name: 'Retail Products', revenue: 5200,  pct: 7 },
  ])
  return { daily, weekly, monthly, byBarber, byService }
})
