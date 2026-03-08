<template>
  <div class="team-view" v-if="data">
    <div class="charts-row">
      <div class="chart-card wide">
        <h3 class="chart-title">Profile Views per Barber</h3>
        <apexchart type="bar" height="280" :options="viewsOpts" :series="viewsSeries" />
      </div>
      <div class="chart-card">
        <h3 class="chart-title">Booking CTA Clicks</h3>
        <apexchart type="pie" height="280" :options="pieOpts" :series="pieSeries" />
      </div>
    </div>
    <div class="table-card">
      <h3 class="chart-title">Barber Performance Summary</h3>
      <table class="data-table">
        <thead><tr><th>Barber</th><th>Profile Views</th><th>Booking Clicks</th><th>Click Rate</th></tr></thead>
        <tbody>
          <tr v-for="b in data.barbers" :key="b.name">
            <td>{{ b.name }}</td>
            <td>{{ b.views }}</td>
            <td>{{ b.bookingClicks }}</td>
            <td>{{ Math.round(b.bookingClicks / b.views * 100) }}%</td>
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
const data = computed(() => store.team)

const viewsOpts = computed(() => ({
  chart: { toolbar: { show: false }, background: 'transparent', foreColor: '#a0a0a0' },
  colors: ['#c9a84c'],
  xaxis: { categories: data.value?.barbers.map(b => b.name) || [] },
  grid: { borderColor: 'rgba(255,255,255,0.05)' },
  tooltip: { theme: 'dark' },
  plotOptions: { bar: { borderRadius: 4 } },
}))
const viewsSeries = computed(() => ([{ name: 'Views', data: data.value?.barbers.map(b => b.views) || [] }]))

const pieOpts = computed(() => ({
  chart: { background: 'transparent', foreColor: '#a0a0a0' },
  labels: data.value?.barbers.map(b => b.name) || [],
  colors: ['#c9a84c','#e8c96a','#a07830','#7a5c24','#5a4018','#3d2a0e','#261906'],
  legend: { position: 'bottom', labels: { colors: '#a0a0a0' } },
  tooltip: { theme: 'dark' },
}))
const pieSeries = computed(() => data.value?.barbers.map(b => b.bookingClicks) || [])
</script>

<style scoped>
.team-view { display: flex; flex-direction: column; gap: 24px; }
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
.data-table td:last-child { color: var(--color-gold); font-weight: 600; }
@media (max-width: 800px) { .charts-row { grid-template-columns: 1fr; } }
</style>
