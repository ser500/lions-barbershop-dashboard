<template>
  <div class="metric-card">
    <div class="metric-icon">{{ icon }}</div>
    <div class="metric-body">
      <p class="metric-label">{{ label }}</p>
      <p class="metric-value">{{ value }}</p>
      <p class="metric-change" :class="changeClass" v-if="change">{{ change }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  icon: String,
  label: String,
  value: [String, Number],
  change: String,
})
const changeClass = computed(() => {
  if (!props.change) return ''
  return props.change.startsWith('+') ? 'positive' : 'negative'
})
</script>

<style scoped>
.metric-card {
  background: #161616;
  border: 1px solid rgba(201,168,76,0.15);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  transition: border-color 0.3s;
}
.metric-card:hover { border-color: rgba(201,168,76,0.4); }
.metric-icon { font-size: 1.8rem; }
.metric-label { font-size: 0.75rem; color: var(--color-gray-light); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; }
.metric-value { font-family: var(--font-display); font-size: 2rem; font-weight: 700; color: var(--color-white); }
.metric-change { font-size: 0.75rem; margin-top: 4px; }
.positive { color: #4ade80; }
.negative { color: #f87171; }
</style>
