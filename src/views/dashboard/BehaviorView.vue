<template>
  <div class="behavior-view" v-if="data">
    <div class="charts-row">
      <div class="chart-card wide">
        <h3 class="chart-title">Section Engagement (Avg Time in Seconds)</h3>
        <apexchart type="bar" height="280" :options="engagementOpts" :series="engagementSeries" />
      </div>
      <div class="chart-card">
        <h3 class="chart-title">Scroll Depth</h3>
        <div class="scroll-funnel">
          <div class="funnel-step" v-for="s in data.scrollDepth" :key="s.depth">
            <div class="funnel-bar-wrap">
              <div class="funnel-bar" :style="{ width: s.pct + '%' }"></div>
            </div>
            <div class="funnel-labels">
              <span>{{ s.depth }}</span>
              <span class="funnel-pct">{{ s.pct }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="heatmap-card">
      <h3 class="chart-title">Section Heatmap</h3>
      <div class="heatmap-grid">
        <div
          class="heatmap-cell"
          v-for="s in data.sectionEngagement"
          :key="s.section"
          :style="{ opacity: 0.3 + (s.avgTime / 74) * 0.7 }"
        >
          <span class="cell-section">{{ s.section }}</span>
          <span class="cell-time">{{ s.avgTime }}s avg</span>
          <span class="cell-views">{{ s.views }} views</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDashboardStore } from '../../stores/dashboard.js'

const store = useDashboardStore()
const data = computed(() => store.behavior)

const engagementOpts = {
  chart: { toolbar: { show: false }, background: 'transparent', foreColor: '#a0a0a0' },
  colors: ['#c9a84c'],
  xaxis: { categories: ['Hero','Services','About','Membership','Plans','Reviews','Team','Booking','FAQ'] },
  grid: { borderColor: 'rgba(255,255,255,0.05)' },
  tooltip: { theme: 'dark' },
  plotOptions: { bar: { borderRadius: 4, horizontal: false } },
}
const engagementSeries = computed(() => ([{ name: 'Avg Time (s)', data: data.value?.sectionEngagement.map(s => s.avgTime) || [] }]))
</script>

<style scoped>
.behavior-view { display: flex; flex-direction: column; gap: 24px; }
.charts-row { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
.chart-card, .heatmap-card {
  background: #161616;
  border: 1px solid rgba(201,168,76,0.12);
  border-radius: 12px;
  padding: 24px;
}
.chart-title { font-family: var(--font-display); font-size: 0.8rem; letter-spacing: 2px; color: var(--color-gold); margin-bottom: 20px; text-transform: uppercase; }
.scroll-funnel { display: flex; flex-direction: column; gap: 16px; padding-top: 8px; }
.funnel-bar-wrap { height: 8px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden; margin-bottom: 6px; }
.funnel-bar { height: 100%; background: linear-gradient(90deg, var(--color-gold), var(--color-gold-light)); border-radius: 4px; transition: width 0.5s; }
.funnel-labels { display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--color-gray-light); }
.funnel-pct { color: var(--color-gold); font-weight: 600; }
.heatmap-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
.heatmap-cell {
  background: rgba(201,168,76,0.15);
  border: 1px solid rgba(201,168,76,0.2);
  border-radius: 8px;
  padding: 14px;
  text-align: center;
  transition: opacity 0.3s;
}
.cell-section { display: block; font-family: var(--font-display); font-size: 0.8rem; letter-spacing: 1px; color: var(--color-gold); margin-bottom: 6px; }
.cell-time { display: block; font-size: 0.85rem; color: var(--color-white); font-weight: 600; margin-bottom: 2px; }
.cell-views { display: block; font-size: 0.72rem; color: var(--color-gray-light); }
@media (max-width: 800px) { .charts-row { grid-template-columns: 1fr; } }
</style>
