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
</script>
<template>
  <div class="p-6 font-inter space-y-6">
    <!-- Revenue trend -->
    <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
      <div class="mb-4">
        <div style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Revenue Trend — 12 Months</div>
        <div style="font-size:0.75rem;color:#6b7280;margin-top:2px">By location</div>
      </div>
      <VueApexCharts type="line" height="240" :series="trendSeries" :options="trendOptions" />
    </div>

    <!-- Acquisition vs retention -->
    <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
      <div class="mb-4">
        <div style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Client Acquisition vs Retention</div>
        <div style="font-size:0.75rem;color:#6b7280;margin-top:2px">New vs returning clients (%) — 6 months</div>
      </div>
      <VueApexCharts type="bar" height="220" :series="acquisitionSeries" :options="acquisitionOptions" />
    </div>

    <!-- Top services -->
    <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
      <div class="mb-4">
        <div style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Top 5 Services by Revenue</div>
        <div style="font-size:0.75rem;color:#6b7280;margin-top:2px">Month-to-date</div>
      </div>
      <VueApexCharts type="bar" height="220" :series="servicesSeries" :options="servicesOptions" />
    </div>
  </div>
</template>
