import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStaffStore = defineStore('staff', () => {
  const stats = ref({
    revenue: '$4,280',
    revenueChange: '+12%',
    appointments: 24,
    appointmentsChange: '+3',
    newClients: 6,
    newClientsChange: '+2',
    avgTicket: '$178',
    avgTicketChange: '+8%',
  })

  const schedule = ref([
    { id: 1, time: '9:00 AM',  client: 'Marcus J.',  service: 'Signature Cut + Beard', barber: 'Devon R.',  duration: 45, status: 'completed' },
    { id: 2, time: '10:30 AM', client: 'James T.',   service: 'Royal Shave',            barber: 'Devon R.',  duration: 30, status: 'in-chair'  },
    { id: 3, time: '11:15 AM', client: 'Antoine B.', service: 'Haircut + Design',       barber: 'Marcus V.', duration: 60, status: 'upcoming'  },
    { id: 4, time: '12:00 PM', client: 'Chris W.',   service: 'Fade + Lineup',          barber: 'Devon R.',  duration: 45, status: 'upcoming'  },
    { id: 5, time: '1:30 PM',  client: 'David K.',   service: 'Signature Cut',          barber: 'James P.',  duration: 45, status: 'upcoming'  },
  ])

  const waitingArea = ref([
    { id: 1, name: 'Michael R.', service: 'Haircut',       wait: '5 min',  type: 'walk-in' },
    { id: 2, name: 'Carlos M.',  service: 'Beard Trim',    wait: '12 min', type: 'member'  },
    { id: 3, name: 'Tyrone B.',  service: 'Signature Cut', wait: '20 min', type: 'walk-in' },
  ])

  const servicesBreakdown = ref([
    { name: 'Signature Cut', pct: 35, color: '#b8960c' },
    { name: 'Fade + Design', pct: 28, color: '#6b4c11' },
    { name: 'Beard Services', pct: 22, color: '#4a3500' },
    { name: 'Royal Shave',   pct: 15, color: '#2d2000' },
  ])

  const staffPerformance = ref([
    { id: 1, name: 'Devon Richards', initials: 'DR', appts: 8, revenue: '$1,240', utilization: 92, status: 'active' },
    { id: 2, name: 'Marcus Vance',   initials: 'MV', appts: 6, revenue: '$980',   utilization: 75, status: 'active' },
    { id: 3, name: 'James Pierce',   initials: 'JP', appts: 5, revenue: '$820',   utilization: 68, status: 'active' },
    { id: 4, name: 'Andre Smith',    initials: 'AS', appts: 0, revenue: '$0',     utilization: 0,  status: 'break'  },
  ])

  return { stats, schedule, waitingArea, servicesBreakdown, staffPerformance }
})
