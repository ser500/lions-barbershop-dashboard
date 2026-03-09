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
  if (vsLast.value > 5) return 'var(--app-green)'
  if (vsLast.value > -5) return 'var(--app-amber)'
  return 'var(--app-red)'
})
</script>
<template>
  <div class="app-card app-enter font-inter" style="padding:20px">
    <div class="flex items-center justify-between mb-3">
      <div>
        <div class="app-section-label">Revenue Forecast</div>
        <div style="font-size:1.1rem;font-weight:700;color:var(--app-text);margin-top:2px">${{ projected.toLocaleString() }}</div>
      </div>
      <div class="text-right">
        <div style="font-size:0.75rem;color:var(--app-text-muted)">vs Last Month</div>
        <div style="font-size:0.9rem;font-weight:600;" :style="{ color: color }">{{ vsLast > 0 ? '+' : '' }}{{ vsLast }}%</div>
      </div>
    </div>
    <div class="app-progress mb-2" style="height:8px">
      <div class="app-progress-fill" :style="{ width: pct + '%', background: color }"></div>
    </div>
    <div class="flex items-center justify-between" style="font-size:0.72rem;color:var(--app-text-dim)">
      <span>MTD: ${{ store.daily.mtd.toLocaleString() }}</span>
      <span>{{ pct }}% of projected</span>
    </div>
  </div>
</template>
