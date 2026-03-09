<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useRevenueStore } from '../../../stores/revenue'

const revenueStore = useRevenueStore()

const summary = [
  { label: 'Service Revenue', value: '$75,820', icon: 'ph-scissors',    color: 'var(--app-gold)',  sub: 'MTD' },
  { label: 'Retail Revenue',  value: '$16,000', icon: 'ph-shopping-bag', color: 'var(--app-blue)',  sub: 'MTD' },
  { label: 'MRR',             value: '$921',    icon: 'ph-crown-simple', color: 'var(--app-amber)', sub: 'Recurring' },
  { label: 'Labor Cost',      value: '$25,860', icon: 'ph-users',        color: 'var(--app-red)',   sub: '34% of rev' },
  { label: 'Net Revenue',     value: '$66,881', icon: 'ph-trend-up',     color: 'var(--app-green)', sub: 'MTD net' },
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
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">
    <!-- 5-col stat row -->
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px">
      <div
        v-for="(s, i) in summary"
        :key="s.label"
        class="app-stat app-enter"
        :class="`app-d${i + 1}`"
        style="padding:16px"
      >
        <div class="app-stat-label">{{ s.label }}</div>
        <div class="app-stat-value" :style="{ color: s.color }">{{ s.value }}</div>
        <div class="app-stat-sub">{{ s.sub }}</div>
        <i :class="`ph ${s.icon} app-stat-icon`" :style="{ color: s.color }"></i>
      </div>
    </div>

    <!-- Monthly by location -->
    <div class="app-card app-enter app-d3" style="padding:0;overflow:hidden">
      <div style="padding:20px 20px 0">
        <div class="app-section-label" style="margin-bottom:16px">Monthly Breakdown by Location</div>
      </div>
      <table class="app-table w-full">
        <thead>
          <tr>
            <th class="text-left">Location</th>
            <th v-for="m in months" :key="m" class="text-right">{{ m }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in monthlyRows" :key="row.loc">
            <td style="font-size:0.83rem;font-weight:600;color:var(--app-text)">{{ row.loc }}</td>
            <td v-for="(val, i) in row.months" :key="i" class="text-right" style="font-size:0.83rem;color:var(--app-gold)">${{ val.toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Top services chart -->
    <div class="app-card app-enter app-d4" style="padding:20px">
      <div class="app-section-label" style="margin-bottom:16px">Revenue by Service</div>
      <VueApexCharts type="bar" height="220" :series="servicesSeries" :options="servicesOptions" />
    </div>
  </div>
</template>
