import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useMembershipStore = defineStore('membership', () => {
  const plans = ref([
    { id: 'essential', label: 'Essential', price: 49,  cuts: 2,    color: '#a8b8c8', perks: ['2 cuts/month', 'Booking priority', 'Member check-in'] },
    { id: 'premium',   label: 'Premium',   price: 89,  cuts: null, color: '#c9a84c', perks: ['Unlimited cuts', '15% retail discount', 'Skip-the-line'] },
    { id: 'vip',       label: 'VIP',       price: 149, cuts: null, color: '#e8e8e8', perks: ['Unlimited cuts', 'Free monthly product', 'Concierge booking', 'Dedicated barber'] },
  ])
  const subscribers = ref([
    { id: 1,  name: 'Marcus Johnson', plan: 'vip',       status: 'active',   billingDate: '2026-03-15', cutsUsed: null, cutsAllowed: null, locationId: 'loc-1' },
    { id: 2,  name: 'James T.',       plan: 'premium',   status: 'active',   billingDate: '2026-03-22', cutsUsed: null, cutsAllowed: null, locationId: 'loc-1' },
    { id: 3,  name: 'Antoine B.',     plan: 'essential', status: 'active',   billingDate: '2026-03-10', cutsUsed: 1,    cutsAllowed: 2,    locationId: 'loc-2' },
    { id: 4,  name: 'Chris W.',       plan: 'premium',   status: 'active',   billingDate: '2026-03-28', cutsUsed: null, cutsAllowed: null, locationId: 'loc-1' },
    { id: 5,  name: 'David K.',       plan: 'essential', status: 'at-risk',  billingDate: '2026-03-09', cutsUsed: 2,    cutsAllowed: 2,    locationId: 'loc-2' },
    { id: 6,  name: 'Michael R.',     plan: 'vip',       status: 'active',   billingDate: '2026-03-18', cutsUsed: null, cutsAllowed: null, locationId: 'loc-1' },
    { id: 7,  name: 'Carlos M.',      plan: 'premium',   status: 'active',   billingDate: '2026-03-25', cutsUsed: null, cutsAllowed: null, locationId: 'loc-2' },
    { id: 8,  name: 'Tyrone B.',      plan: 'essential', status: 'active',   billingDate: '2026-03-12', cutsUsed: 0,    cutsAllowed: 2,    locationId: 'loc-1' },
    { id: 9,  name: 'Jordan T.',      plan: 'vip',       status: 'active',   billingDate: '2026-03-20', cutsUsed: null, cutsAllowed: null, locationId: 'loc-1' },
    { id: 10, name: 'DeShawn P.',     plan: 'premium',   status: 'inactive', billingDate: '2026-03-05', cutsUsed: null, cutsAllowed: null, locationId: 'loc-2' },
  ])
  const stats = ref({ totalSubscribers: 10, mrr: 921, churnRate: 4.2, avgPlanValue: 92.1, upgradeRate: 12.5 })
  return { plans, subscribers, stats }
})
