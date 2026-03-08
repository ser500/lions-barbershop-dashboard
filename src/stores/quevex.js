import { defineStore } from 'pinia'
import { ref } from 'vue'

const mockResponses = {
  'super-admin': [
    "East Side is running 23% below monthly pace. Tuesday evenings show consistent underperformance — only 2.1 avg appointments per hour vs Downtown's 3.8. Recommend a walk-in promotion or extended hours Tuesday 6–8 PM.",
    "Your top revenue driver this month is Devon Richards at Downtown, generating $4,280 MTD — 18% above his 6-month average. Consider featuring him in client communications.",
    "MRR is at $921 with a 4.2% churn rate. 3 Premium subscribers haven't visited in 5+ weeks — high churn risk. A targeted win-back offer could recover ~$267/mo.",
  ],
  'admin': [
    "3 Gold members haven't visited in 5+ weeks. A 'We miss you' message with a complimentary beard trim offer has historically recovered 40% of at-risk clients.",
    "Today's utilization is at 68% — you have 4 open slots this afternoon. Recommend pushing availability to walk-ins and messaging your waitlist.",
    "Your highest-revenue service this month is Signature Cut + Beard at $110 avg ticket. Barbers who upsell beard services generate 28% more per appointment.",
  ],
  'staff': [
    "Current queue depth is 3 clients. At today's average service time of 42 minutes, estimated wait for a new walk-in is approximately 22 minutes.",
    "Two appointment no-shows this morning freed up 75 minutes of capacity. Reaching out to the waitlist could recover $180 in potential revenue.",
    "Peak arrival window today is 11 AM – 1 PM. Recommend having all 4 barbers available during that window.",
  ],
  'barber': [
    "Marcus Johnson usually gets a Signature Cut + Beard combo. His last 8 visits he's tipped 25%+ every time. He's currently in the VIP plan.",
    "Your average ticket this week is $118 — $12 above the shop average of $106. Your beard upsell rate is the highest on the team at 62%.",
    "You have 3 open slots this Friday afternoon. Based on your regular client patterns, 2 of your top clients haven't booked yet this month.",
  ],
  'client': [
    "Based on your visit history, you book a cut every 26–28 days on average. You're currently at day 24 — this week is a great time to rebook with Devon before his weekend fills up.",
    "Your last 3 appointments were all Signature Cut + Beard with Devon Richards at Downtown. Would you like me to pre-book your next one for the same?",
    "Your Premium membership renews in 8 days. You have unlimited cuts this month and haven't used one yet this cycle — there's still time!",
  ],
}

export const useQueVexStore = defineStore('quevex', () => {
  const messages = ref([])
  const isTyping = ref(false)
  const currentRole = ref('staff')

  function setRole(role) { currentRole.value = role }

  async function sendMessage(text) {
    messages.value.push({ id: Date.now(), role: 'user', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })
    isTyping.value = true
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800))
    const responses = mockResponses[currentRole.value] || mockResponses['staff']
    const response = responses[Math.floor(Math.random() * responses.length)]
    messages.value.push({ id: Date.now() + 1, role: 'ai', text: response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })
    isTyping.value = false
  }

  function clearMessages() { messages.value = [] }

  return { messages, isTyping, currentRole, setRole, sendMessage, clearMessages }
})
