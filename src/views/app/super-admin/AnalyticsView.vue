<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useRevenueStore } from '../../../stores/revenue'

const revenueStore = useRevenueStore()

const trendSeries = [
  {
    name: 'Downtown',
    data: [14200, 15100, 15800, 16200, 18900, 15400, 17800, 16400, 17200, 18100, 17600, 18420],
  },
  {
    name: 'East Side',
    data: [9800, 10200, 10600, 10900, 12400, 9900, 11800, 11200, 11400, 12000, 11600, 12380],
  },
]

const trendOptions = ref({
  chart: { type: 'line', background: 'transparent', toolbar: { show: false } },
  colors: ['#b8960c', '#6b7280'],
  stroke: { curve: 'smooth', width: 2 },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    labels: { style: { colors: '#6b7280', fontSize: '11px' } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { labels: { style: { colors: '#6b7280', fontSize: '11px' }, formatter: v => '$' + (v / 1000).toFixed(0) + 'k' } },
  grid: { borderColor: '#1a1a1a', strokeDashArray: 3 },
  legend: { labels: { colors: '#9ca3af' } },
  tooltip: { theme: 'dark' },
})

const acquisitionSeries = [
  { name: 'New Clients', data: [14, 18, 12, 22, 16, 18] },
  { name: 'Returning',   data: [86, 82, 88, 78, 84, 82] },
]

const acquisitionOptions = ref({
  chart: { type: 'bar', stacked: true, background: 'transparent', toolbar: { show: false } },
  colors: ['#b8960c', '#374151'],
  plotOptions: { bar: { columnWidth: '50%', borderRadius: 3 } },
  dataLabels: { enabled: false },
  xaxis: {
    categories: revenueStore.monthly.map(m => m.month),
    labels: { style: { colors: '#6b7280', fontSize: '11px' } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { labels: { style: { colors: '#6b7280', fontSize: '11px' } } },
  grid: { borderColor: '#1a1a1a', strokeDashArray: 3 },
  legend: { labels: { colors: '#9ca3af' } },
  tooltip: { theme: 'dark' },
})

const servicesSeries = [{ name: 'Revenue', data: revenueStore.byService.map(s => s.revenue) }]

const servicesOptions = ref({
  chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
  colors: ['#b8960c'],
  plotOptions: { bar: { horizontal: true, borderRadius: 3 } },
  dataLabels: { enabled: false },
  xaxis: {
    categories: revenueStore.byService.map(s => s.name),
    labels: { style: { colors: '#6b7280', fontSize: '11px' }, formatter: v => '$' + (v / 1000).toFixed(0) + 'k' },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { labels: { style: { colors: '#9ca3af', fontSize: '11px' } } },
  grid: { borderColor: '#1a1a1a', strokeDashArray: 3 },
  tooltip: { theme: 'dark' },
})

const summaryStats = [
  { label: 'Total Revenue YTD', value: '$182,400', icon: 'ph-currency-dollar' },
  { label: 'Total Appointments', value: '1,840',   icon: 'ph-calendar-check' },
  { label: 'Client Retention',   value: '84%',     icon: 'ph-arrow-counter-clockwise' },
]
</script>
<template>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">
    <!-- Summary stats -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
      <div
        v-for="(s, i) in summaryStats"
        :key="s.label"
        class="app-stat app-enter"
        :class="`app-d${i + 1}`"
        style="padding:16px"
      >
        <div class="app-stat-label">{{ s.label }}</div>
        <div class="app-stat-value">{{ s.value }}</div>
        <i :class="`ph ${s.icon} app-stat-icon`"></i>
      </div>
    </div>

    <!-- Revenue trend -->
    <div class="app-card app-enter app-d2" style="padding:20px">
      <div class="app-section-label" style="margin-bottom:4px">Revenue Trend — 12 Months</div>
      <div style="font-size:0.75rem;color:var(--app-text-muted);margin-bottom:16px">By location</div>
      <VueApexCharts type="line" height="240" :series="trendSeries" :options="trendOptions" />
    </div>

    <!-- Acquisition vs retention -->
    <div class="app-card app-enter app-d3" style="padding:20px">
      <div class="app-section-label" style="margin-bottom:4px">Client Acquisition vs Retention</div>
      <div style="font-size:0.75rem;color:var(--app-text-muted);margin-bottom:16px">New vs returning clients (%) — 6 months</div>
      <VueApexCharts type="bar" height="220" :series="acquisitionSeries" :options="acquisitionOptions" />
    </div>

    <!-- Top services -->
    <div class="app-card app-enter app-d4" style="padding:20px">
      <div class="app-section-label" style="margin-bottom:4px">Top 5 Services by Revenue</div>
      <div style="font-size:0.75rem;color:var(--app-text-muted);margin-bottom:16px">Month-to-date</div>
      <VueApexCharts type="bar" height="220" :series="servicesSeries" :options="servicesOptions" />
    </div>
  </div>
</template>
