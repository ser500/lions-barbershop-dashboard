import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useLiveFeedStore = defineStore('liveFeed', () => {
  const events = ref([
    { id: 1,  text: 'Devon completed Signature Cut + Beard — $110',                    time: '2m ago'  },
    { id: 2,  text: 'New walk-in: Jordan T. — Signature Cut',                          time: '5m ago'  },
    { id: 3,  text: 'VIP member Marcus Johnson checked in',                             time: '8m ago'  },
    { id: 4,  text: 'Premium member Carlos M. rebooked for next Tuesday',               time: '12m ago' },
    { id: 5,  text: 'Marcus V. completed Haircut + Design — $85',                      time: '15m ago' },
    { id: 6,  text: 'Appointment cancelled: 2:00 PM slot now open',                    time: '18m ago' },
    { id: 7,  text: 'New Essential subscriber: Tyrone B. — $49/mo',                    time: '24m ago' },
    { id: 8,  text: 'East Side: 6 clients in queue — avg wait 22 min',                 time: '28m ago' },
    { id: 9,  text: 'James P. completed Royal Shave — $75',                            time: '31m ago' },
    { id: 10, text: 'Downtown revenue on pace for best Tuesday this month',             time: '35m ago' },
  ])
  return { events }
})
