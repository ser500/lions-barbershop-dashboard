<script setup>
import { computed } from 'vue'
import { useStaffStore } from '../../../stores/staff'

const store = useStaffStore()

const transactions = computed(() =>
  store.schedule.map(appt => ({
    ...appt,
    amount: appt.service === 'Signature Cut + Beard' ? 110
      : appt.service === 'Royal Shave' ? 75
      : appt.service === 'Haircut + Design' ? 85
      : appt.service === 'Fade + Lineup' ? 80
      : 95,
  }))
)

const runningTotal = computed(() =>
  transactions.value
    .filter(t => t.status === 'completed' || t.status === 'in-chair')
    .reduce((sum, t) => sum + t.amount, 0)
)

const goal = 4200
const goalPct = computed(() => Math.min(100, Math.round((runningTotal.value / goal) * 100)))
const goalColor = computed(() => {
  if (goalPct.value >= 90) return '#22c55e'
  if (goalPct.value >= 60) return '#b8960c'
  return '#ef4444'
})

const paymentBreakdown = [
  { method: 'Card', pct: 58, color: '#b8960c' },
  { method: 'Cash', pct: 35, color: '#6b7280' },
  { method: 'Membership', pct: 7, color: '#c9a84c' },
]

function statusStyle(status) {
  if (status === 'completed') return 'background:#1f2937;color:#4b5563'
  if (status === 'in-chair') return 'background:rgba(184,150,12,0.15);color:#b8960c'
  return 'background:#111;color:#6b7280'
}
</script>
<template>
  <div class="p-6 font-inter">
    <!-- Running total & goal -->
    <div class="grid grid-cols-2 gap-5 mb-6">
      <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
        <div style="font-size:0.72rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;margin-bottom:4px">Today's Revenue (Running)</div>
        <div style="font-size:2rem;font-weight:700;color:#b8960c">${{ runningTotal.toLocaleString() }}</div>
        <div style="font-size:0.78rem;color:#6b7280;margin-top:2px">of ${{ goal.toLocaleString() }} goal</div>
      </div>
      <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
        <div class="flex items-center justify-between mb-3">
          <div style="font-size:0.72rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Goal Progress</div>
          <div style="font-size:0.9rem;font-weight:700;" :style="{ color: goalColor }">{{ goalPct }}%</div>
        </div>
        <div style="background:#1a1a1a;border-radius:4px;height:8px;overflow:hidden;margin-bottom:16px">
          <div style="height:100%;border-radius:4px;transition:width 0.6s ease" :style="{ width: goalPct + '%', background: goalColor }"></div>
        </div>
        <!-- Payment breakdown -->
        <div class="space-y-1">
          <div v-for="p in paymentBreakdown" :key="p.method" class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full" :style="{ background: p.color }"></div>
              <span style="font-size:0.75rem;color:#9ca3af">{{ p.method }}</span>
            </div>
            <span style="font-size:0.75rem;color:#e5e7eb">{{ p.pct }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Transactions -->
    <div class="rounded-xl overflow-hidden" style="background:#111;border:1px solid #1a1a1a">
      <div class="px-5 py-4" style="border-bottom:1px solid #1a1a1a">
        <div style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Today's Transactions</div>
      </div>
      <table class="w-full" style="border-collapse:collapse">
        <thead>
          <tr style="border-bottom:1px solid #1a1a1a;background:#0f0f0f">
            <th class="text-left px-5 py-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Time</th>
            <th class="text-left px-4 py-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Client</th>
            <th class="text-left px-4 py-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Service</th>
            <th class="text-left px-4 py-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Barber</th>
            <th class="text-right px-5 py-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Amount</th>
            <th class="text-center px-4 py-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in transactions" :key="t.id" style="border-bottom:1px solid #0f0f0f">
            <td class="px-5 py-3" style="font-size:0.8rem;color:#9ca3af">{{ t.time }}</td>
            <td class="px-4 py-3" style="font-size:0.83rem;font-weight:600;color:#e5e7eb">{{ t.client }}</td>
            <td class="px-4 py-3" style="font-size:0.8rem;color:#9ca3af">{{ t.service }}</td>
            <td class="px-4 py-3" style="font-size:0.8rem;color:#9ca3af">{{ t.barber }}</td>
            <td class="px-5 py-3 text-right" style="font-size:0.9rem;font-weight:700;color:#b8960c">${{ t.amount }}</td>
            <td class="px-4 py-3 text-center">
              <span class="text-xs px-2 py-0.5 rounded-full font-medium" :style="statusStyle(t.status)">{{ t.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
