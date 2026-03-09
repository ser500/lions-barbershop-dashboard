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
  if (goalPct.value >= 90) return 'var(--app-green)'
  if (goalPct.value >= 60) return 'var(--app-gold)'
  return 'var(--app-red)'
})

const paymentBreakdown = [
  { method: 'Card',       pct: 58, color: 'var(--app-gold)'  },
  { method: 'Cash',       pct: 35, color: 'var(--app-text-muted)' },
  { method: 'Membership', pct: 7,  color: 'var(--app-amber)' },
]

function statusBadgeClass(status) {
  if (status === 'completed') return 'app-badge blue'
  if (status === 'in-chair') return 'app-badge gold'
  return 'app-badge'
}
</script>
<template>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">
    <!-- Running total + goal stat cards -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div class="app-stat app-enter app-d1" style="padding:20px">
        <div class="app-stat-label">Today's Revenue (Running)</div>
        <div class="app-stat-value" style="color:var(--app-gold)">${{ runningTotal.toLocaleString() }}</div>
        <div class="app-stat-sub">of ${{ goal.toLocaleString() }} daily goal</div>
        <i class="ph ph-currency-dollar app-stat-icon"></i>
      </div>
      <div class="app-stat app-enter app-d2" style="padding:20px">
        <div class="app-stat-label">Daily Goal</div>
        <div class="app-stat-value" :style="{ color: goalColor }">{{ goalPct }}%</div>
        <div class="app-stat-sub">Progress to ${{ goal.toLocaleString() }}</div>
        <i class="ph ph-target app-stat-icon"></i>
      </div>
    </div>

    <!-- Goal progress bar -->
    <div class="app-card app-enter app-d2" style="padding:20px">
      <div class="flex items-center justify-between" style="margin-bottom:10px">
        <div class="app-section-label">Goal Progress</div>
        <div style="font-size:0.9rem;font-weight:700" :style="{ color: goalColor }">{{ goalPct }}%</div>
      </div>
      <div class="app-progress" style="height:10px;margin-bottom:16px">
        <div class="app-progress-fill" :style="{ width: goalPct + '%', background: goalColor }"></div>
      </div>
    </div>

    <!-- Payment breakdown -->
    <div class="app-card app-enter app-d3" style="padding:20px">
      <div class="app-section-label" style="margin-bottom:16px">Payment Breakdown</div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <div v-for="p in paymentBreakdown" :key="p.method" class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div style="width:8px;height:8px;border-radius:50%" :style="{ background: p.color }"></div>
            <span style="font-size:0.85rem;color:var(--app-text-dim)">{{ p.method }}</span>
          </div>
          <span style="font-size:0.85rem;font-weight:600;color:var(--app-text)">{{ p.pct }}%</span>
        </div>
      </div>
    </div>

    <!-- Transactions table -->
    <div class="app-card app-enter app-d4" style="padding:0;overflow:hidden">
      <div style="padding:20px 20px 0">
        <div class="app-section-label" style="margin-bottom:16px">Today's Transactions</div>
      </div>
      <table class="app-table w-full">
        <thead>
          <tr>
            <th class="text-left">Time</th>
            <th class="text-left">Client</th>
            <th class="text-left">Service</th>
            <th class="text-left">Barber</th>
            <th class="text-right">Amount</th>
            <th class="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in transactions" :key="t.id">
            <td style="font-size:0.8rem;color:var(--app-text-muted)">{{ t.time }}</td>
            <td style="font-size:0.83rem;font-weight:600;color:var(--app-text)">{{ t.client }}</td>
            <td style="font-size:0.8rem;color:var(--app-text-dim)">{{ t.service }}</td>
            <td style="font-size:0.8rem;color:var(--app-text-muted)">{{ t.barber }}</td>
            <td class="text-right" style="font-size:0.9rem;font-weight:700;color:var(--app-gold)">${{ t.amount }}</td>
            <td class="text-center">
              <span :class="statusBadgeClass(t.status)">{{ t.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
