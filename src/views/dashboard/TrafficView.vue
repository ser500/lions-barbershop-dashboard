<template>
  <div class="traffic-view" v-if="data">
    <div class="charts-row">
      <div class="chart-card wide">
        <h3 class="chart-title">Sessions by Source</h3>
        <apexchart type="bar" height="260" :options="barOpts" :series="barSeries" />
      </div>
      <div class="chart-card">
        <h3 class="chart-title">Device Breakdown</h3>
        <apexchart type="radialBar" height="260" :options="radialOpts" :series="radialSeries" />
      </div>
    </div>
    <div class="table-card">
      <h3 class="chart-title">Top Referrers</h3>
      <table class="data-table">
        <thead><tr><th>Source</th><th>Sessions</th><th>Share</th></tr></thead>
        <tbody>
          <tr v-for="r in data.topReferrers" :key="r.url">
            <td>{{ r.url }}</td>
            <td>{{ r.sessions }}</td>
            <td>
              <div class="bar-cell">
                <div class="bar-fill" :style="{ width: (r.sessions / 238 * 100) + '%' }"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDashboardStore } from '../../stores/dashboard.js'

const store = useDashboardStore()
const data = computed(() => store.traffic)

const barOpts = {
  chart: { toolbar: { show: false }, background: 'transparent', foreColor: '#a0a0a0' },
  colors: ['#c9a84c'],
  xaxis: { categories: ['Direct', 'Organic', 'Instagram', 'Referral', 'Other'] },
  grid: { borderColor: 'rgba(255,255,255,0.05)' },
  tooltip: { theme: 'dark' },
  plotOptions: { bar: { borderRadius: 4 } },
}
const barSeries = computed(() => ([{ name: 'Sessions', data: data.value?.bySources.map(s => s.sessions) || [] }]))

const radialOpts = {
  chart: { background: 'transparent', foreColor: '#a0a0a0' },
  colors: ['#c9a84c', '#e8c96a', '#a07830'],
  labels: ['Mobile', 'Desktop', 'Tablet'],
  plotOptions: { radialBar: { dataLabels: { name: { color: '#a0a0a0' }, value: { color: '#fff' } } } },
}
const radialSeries = computed(() => data.value?.devices.map(d => d.pct) || [])
</script>

<style scoped>
.traffic-view { display: flex; flex-direction: column; gap: 24px; }
.charts-row { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
.chart-card, .table-card {
  background: #161616;
  border: 1px solid rgba(201,168,76,0.12);
  border-radius: 12px;
  padding: 24px;
}
.chart-title { font-family: var(--font-display); font-size: 0.8rem; letter-spacing: 2px; color: var(--color-gold); margin-bottom: 20px; text-transform: uppercase; }
.data-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
.data-table th { text-align: left; color: var(--color-gray); font-weight: 500; padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.data-table td { padding: 10px 12px; color: var(--color-gray-light); border-bottom: 1px solid rgba(255,255,255,0.04); }
.bar-cell { height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; width: 120px; }
.bar-fill { height: 100%; background: var(--color-gold); border-radius: 3px; }
@media (max-width: 800px) { .charts-row { grid-template-columns: 1fr; } }
</style>
