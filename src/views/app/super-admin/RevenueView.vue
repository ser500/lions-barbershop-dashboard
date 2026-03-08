<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useRevenueStore } from '../../../stores/revenue'

const revenueStore = useRevenueStore()

const summary = [
  { label: 'Service Revenue',  value: '$75,820', icon: 'ph-scissors',       color: '#b8960c' },
  { label: 'Retail Revenue',   value: '$16,000', icon: 'ph-package',         color: '#6b7280' },
  { label: 'MRR',              value: '$921',    icon: 'ph-crown-simple',    color: '#c9a84c' },
  { label: 'Labor Cost',       value: '$25,860', icon: 'ph-users',           color: '#ef4444' },
  { label: 'Net Revenue',      value: '$66,881', icon: 'ph-trend-up',        color: '#22c55e' },
]

const monthlyRows = [
  { loc: 'Downtown',  months: [14200, 15800, 16200, 18900, 15400, 17800] },
  { loc: 'East Side', months: [9500,  10600, 10900, 12400, 9900,  11800] },
]

const months = revenueStore.monthly.map(m => m.month)

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
    <!-- Summary row -->
    <div class="grid grid-cols-5 gap-4">
      <div v-for="s in summary" :key="s.label" class="rounded-xl p-4" style="background:#111;border:1px solid #1a1a1a">
        <div class="flex items-center gap-2 mb-2">
          <i :class="`ph ${s.icon}`" :style="{ color: s.color, fontSize: '1rem' }"></i>
          <span style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">{{ s.label }}</span>
        </div>
        <div style="font-size:1.3rem;font-weight:700;" :style="{ color: s.color }">{{ s.value }}</div>
      </div>
    </div>

    <!-- Monthly by location -->
    <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
      <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Monthly Breakdown by Location</div>
      <table class="w-full" style="border-collapse:collapse">
        <thead>
          <tr style="border-bottom:1px solid #1a1a1a">
            <th class="text-left pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Location</th>
            <th v-for="m in months" :key="m" class="text-right pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">{{ m }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in monthlyRows" :key="row.loc" style="border-bottom:1px solid #0f0f0f">
            <td class="py-3" style="font-size:0.83rem;font-weight:600;color:#e5e7eb">{{ row.loc }}</td>
            <td v-for="(val, i) in row.months" :key="i" class="py-3 text-right" style="font-size:0.83rem;color:#b8960c">${{ val.toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Top services chart -->
    <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
      <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Revenue by Service</div>
      <VueApexCharts type="bar" height="220" :series="servicesSeries" :options="servicesOptions" />
    </div>
  </div>
</template>
