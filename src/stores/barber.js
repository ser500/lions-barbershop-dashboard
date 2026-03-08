import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useBarberStore = defineStore('barber', () => {
  const profile = ref({ id: 1, name: 'Devon Richards', initials: 'DR', location: 'Downtown', locationId: 'loc-1', role: 'Senior Barber' })
  const todayAppts = ref([
    { id: 1, time: '9:00 AM',  client: 'Marcus Johnson', plan: 'vip',     service: 'Signature Cut + Beard', duration: 45, status: 'completed', revenue: 110 },
    { id: 2, time: '10:30 AM', client: 'James T.',       plan: 'premium', service: 'Royal Shave',           duration: 30, status: 'in-chair',  revenue: 75  },
    { id: 3, time: '11:15 AM', client: 'Chris W.',       plan: 'premium', service: 'Fade + Lineup',         duration: 45, status: 'upcoming',  revenue: 80  },
    { id: 4, time: '1:00 PM',  client: 'Michael R.',     plan: 'vip',     service: 'Full Service',          duration: 60, status: 'upcoming',  revenue: 150 },
    { id: 5, time: '2:30 PM',  client: 'Jordan T.',      plan: 'vip',     service: 'Signature Cut + Beard', duration: 45, status: 'upcoming',  revenue: 110 },
  ])
  const earnings = ref({ mtd: 4280, avgTicket: 118, tipRate: 22, totalAppts: 36 })
  const earningsTrend = ref([82,95,110,88,124,98,115,102,130,88,142,98,118,125,108,112,95,138,115,122,108,98,145,118,130,112,125,142,118,128])
  const reviews = ref([
    { id: 1, client: 'Marcus J.', rating: 5, text: 'Devon is the best barber in Austin, period.', date: '2026-03-05' },
    { id: 2, client: 'James T.',  rating: 5, text: 'Always on point, been coming here for 3 years.', date: '2026-02-28' },
    { id: 3, client: 'Chris W.',  rating: 4, text: 'Great fade, slight wait but worth it.', date: '2026-02-22' },
    { id: 4, client: 'Jordan T.', rating: 5, text: 'Legendary. Every single time.', date: '2026-02-18' },
  ])
  const avgRating = ref(4.8)
  return { profile, todayAppts, earnings, earningsTrend, reviews, avgRating }
})
