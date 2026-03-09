<script setup>
import { ref, computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useRevenueStore } from '../../../stores/revenue'

const revenueStore = useRevenueStore()

const kpis = [
  { label: 'Today',      value: '$3,840',   icon: 'ph-sun',          sub: 'vs $3,120 yesterday' },
  { label: 'This Week',  value: '$28,490',  icon: 'ph-calendar-blank', sub: '+12% vs last week' },
  { label: 'This Month', value: '$68,420',  icon: 'ph-chart-bar',    sub: '18 days remaining' },
  { label: 'This Year',  value: '$164,220', icon: 'ph-trend-up',     sub: 'On track for $280k' },
]

// Build 30-day data from weekly data repeated
const thirtyDayData = []
for (let i = 0; i < 30; i++) {
  const base = revenueStore.weekly[i % 7]
  thirtyDayData.push(Math.round(base * (0.85 + Math.random() * 0.3)))
}

const dailyChartSeries = [{ name: 'Revenue', data: thirtyDayData }]
const dailyChartOptions = ref({
  chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
  colors: ['#b8960c'],
  plotOptions: { bar: { columnWidth: '60%', borderRadius: 2 } },
  dataLabels: { enabled: false },
  xaxis: {
    categories: Array.from({ length: 30 }, (_, i) => i + 1),
    labels: { style: { colors: '#6b7280', fontSize: '10px' } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { labels: { style: { colors: '#6b7280', fontSize: '11px' }, formatter: v => '$' + (v / 1000).toFixed(1) + 'k' } },
  grid: { borderColor: '#1a1a1a', strokeDashArray: 3 },
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

const barberDonutSeries = revenueStore.byBarber.map(b => b.revenue)
const barberDonutOptions = ref({
  chart: { type: 'donut', background: 'transparent' },
  colors: ['#b8960c', '#c9a84c', '#6b7280', '#374151'],
  labels: revenueStore.byBarber.map(b => b.name),
  dataLabels: { enabled: false },
  legend: { labels: { colors: '#9ca3af' } },
  plotOptions: { pie: { donut: { size: '65%' } } },
  tooltip: { theme: 'dark' },
})
</script>
<template>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">
    <!-- KPI row -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
      <div
        v-for="(kpi, i) in kpis"
        :key="kpi.label"
        class="app-stat app-enter"
        :class="`app-d${i + 1}`"
      >
        <div class="app-stat-label">{{ kpi.label }}</div>
        <div class="app-stat-value">{{ kpi.value }}</div>
        <div class="app-stat-sub">{{ kpi.sub }}</div>
        <i :class="`ph ${kpi.icon} app-stat-icon`"></i>
      </div>
    </div>

    <!-- 30-day chart -->
    <div class="app-card app-enter app-d3" style="padding:20px">
      <div class="app-section-label" style="margin-bottom:16px">30-Day Daily Revenue</div>
      <VueApexCharts type="bar" height="220" :series="dailyChartSeries" :options="dailyChartOptions" />
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <!-- Services breakdown -->
      <div class="app-card app-enter app-d4" style="padding:20px">
        <div class="app-section-label" style="margin-bottom:16px">Revenue by Service</div>
        <VueApexCharts type="bar" height="220" :series="servicesSeries" :options="servicesOptions" />
      </div>

      <!-- Barber donut -->
      <div class="app-card app-enter app-d5" style="padding:20px">
        <div class="app-section-label" style="margin-bottom:16px">Revenue by Barber</div>
        <VueApexCharts type="donut" height="220" :series="barberDonutSeries" :options="barberDonutOptions" />
      </div>
    </div>
  </div>
</template>
