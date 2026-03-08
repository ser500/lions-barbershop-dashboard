<script setup>
import { computed } from 'vue'
import { useRevenueStore } from '../../stores/revenue'

const store = useRevenueStore()

const today = new Date()
const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
const dayOfMonth = today.getDate()

const projected = computed(() => Math.round((store.daily.mtd / dayOfMonth) * daysInMonth))
const lastMonth = computed(() => Math.round(store.daily.lastMtd * (daysInMonth / 28)))
const pct = computed(() => Math.min(100, Math.round((store.daily.mtd / projected.value) * 100)))
const vsLast = computed(() => Math.round(((projected.value - store.daily.lastMtd) / store.daily.lastMtd) * 100))
const color = computed(() => {
  if (vsLast.value > 5) return '#22c55e'
  if (vsLast.value > -5) return '#b8960c'
  return '#ef4444'
})
</script>
<template>
  <div class="font-inter" style="background:#111;border:1px solid #1a1a1a;border-radius:10px;padding:16px">
    <div class="flex items-center justify-between mb-3">
      <div>
        <div style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Revenue Forecast</div>
        <div style="font-size:1.4rem;font-weight:700;color:#ffffff;margin-top:2px">${{ projected.toLocaleString() }}</div>
      </div>
      <div class="text-right">
        <div style="font-size:0.75rem;color:#6b7280">vs Last Month</div>
        <div style="font-size:0.9rem;font-weight:600;" :style="{ color: color }">{{ vsLast > 0 ? '+' : '' }}{{ vsLast }}%</div>
      </div>
    </div>
    <div style="background:#1a1a1a;border-radius:4px;height:6px;overflow:hidden;margin-bottom:8px">
      <div style="height:100%;border-radius:4px;transition:width 0.6s ease" :style="{ width: pct + '%', background: color }"></div>
    </div>
    <div class="flex items-center justify-between" style="font-size:0.72rem;color:#6b7280">
      <span>MTD: ${{ store.daily.mtd.toLocaleString() }}</span>
      <span>{{ pct }}% of projected</span>
    </div>
  </div>
</template>
