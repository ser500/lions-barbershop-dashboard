<template>
  <div class="funnel-view" v-if="data">
    <div class="charts-row">
      <div class="chart-card wide">
        <h3 class="chart-title">Booking Funnel</h3>
        <div class="funnel-steps">
          <div class="funnel-step-row" v-for="(step, i) in data.steps" :key="step.label">
            <div class="step-meta">
              <span class="step-num">{{ i + 1 }}</span>
              <span class="step-label">{{ step.label }}</span>
              <span class="step-count">{{ step.count }}</span>
            </div>
            <div class="step-bar-wrap">
              <div class="step-bar" :style="{ width: (step.count / data.steps[0].count * 100) + '%' }">
                <span class="step-pct">{{ Math.round(step.count / data.steps[0].count * 100) }}%</span>
              </div>
            </div>
            <div class="step-drop" v-if="i > 0">
              ↓ {{ Math.round((1 - step.count / data.steps[i-1].count) * 100) }}% drop-off
            </div>
          </div>
        </div>
      </div>
      <div class="chart-card">
        <h3 class="chart-title">Plan Clicks Before Booking</h3>
        <apexchart type="pie" height="240" :options="pieOpts" :series="pieSeries" />
        <div class="stat-highlight">
          <span class="stat-label">Avg. Time to CTA</span>
          <span class="stat-val">{{ data.avgTimeToCta }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDashboardStore } from '../../stores/dashboard.js'

const store = useDashboardStore()
const data = computed(() => store.funnel)

const pieOpts = {
  chart: { background: 'transparent', foreColor: '#a0a0a0' },
  labels: ['BLACK', 'GOLD', 'ESSENTIAL'],
  colors: ['#c9a84c', '#e8c96a', '#a07830'],
  legend: { position: 'bottom', labels: { colors: '#a0a0a0' } },
  tooltip: { theme: 'dark' },
}
const pieSeries = computed(() => data.value?.planClicksBefore.map(p => p.clicks) || [])
</script>

<style scoped>
.funnel-view { display: flex; flex-direction: column; gap: 24px; }
.charts-row { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
.chart-card {
  background: #161616;
  border: 1px solid rgba(201,168,76,0.12);
  border-radius: 12px;
  padding: 24px;
}
.chart-title { font-family: var(--font-display); font-size: 0.8rem; letter-spacing: 2px; color: var(--color-gold); margin-bottom: 20px; text-transform: uppercase; }
.funnel-steps { display: flex; flex-direction: column; gap: 20px; }
.step-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.step-num {
  width: 28px; height: 28px; border-radius: 50%;
  background: rgba(201,168,76,0.15); border: 1px solid var(--color-gold);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; color: var(--color-gold); font-weight: 700; flex-shrink: 0;
}
.step-label { flex: 1; font-size: 0.9rem; color: var(--color-white); }
.step-count { font-family: var(--font-display); font-size: 1rem; color: var(--color-gold); font-weight: 700; }
.step-bar-wrap { height: 10px; background: rgba(255,255,255,0.06); border-radius: 5px; overflow: hidden; position: relative; }
.step-bar { height: 100%; background: linear-gradient(90deg, var(--color-gold), var(--color-gold-light)); border-radius: 5px; display: flex; align-items: center; justify-content: flex-end; padding-right: 8px; }
.step-pct { font-size: 0.65rem; color: var(--color-black); font-weight: 700; }
.step-drop { font-size: 0.75rem; color: #f87171; margin-top: 4px; }
.stat-highlight { margin-top: 20px; padding: 16px; background: rgba(201,168,76,0.08); border-radius: 8px; text-align: center; }
.stat-label { display: block; font-size: 0.75rem; color: var(--color-gray-light); margin-bottom: 6px; letter-spacing: 1px; text-transform: uppercase; }
.stat-val { font-family: var(--font-display); font-size: 1.5rem; color: var(--color-gold); font-weight: 700; }
@media (max-width: 800px) { .charts-row { grid-template-columns: 1fr; } }
</style>
