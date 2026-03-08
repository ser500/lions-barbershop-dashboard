<script setup>
import { ref, computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useRevenueStore } from '../../../stores/revenue'

const revenueStore = useRevenueStore()

const kpis = [
  { label: 'Today',      value: '$3,840',   icon: 'ph-sun' },
  { label: 'This Week',  value: '$28,490',  icon: 'ph-calendar-blank' },
  { label: 'This Month', value: '$68,420',  icon: 'ph-chart-bar' },
  { label: 'This Year',  value: '$164,220', icon: 'ph-trend-up' },
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
  <div class="p-6 font-inter space-y-6">
    <!-- KPI row -->
    <div class="grid grid-cols-4 gap-4">
      <div v-for="kpi in kpis" :key="kpi.label" class="rounded-xl p-4" style="background:#111;border:1px solid #1a1a1a">
        <div class="flex items-center gap-2 mb-2">
          <i :class="`ph ${kpi.icon}`" style="color:#b8960c;font-size:0.9rem"></i>
          <span style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">{{ kpi.label }}</span>
        </div>
        <div style="font-size:1.4rem;font-weight:700;color:#ffffff">{{ kpi.value }}</div>
      </div>
    </div>

    <!-- 30-day chart -->
    <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
      <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">30-Day Daily Revenue</div>
      <VueApexCharts type="bar" height="220" :series="dailyChartSeries" :options="dailyChartOptions" />
    </div>

    <div class="grid grid-cols-2 gap-6">
      <!-- Services breakdown -->
      <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
        <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Revenue by Service</div>
        <VueApexCharts type="bar" height="220" :series="servicesSeries" :options="servicesOptions" />
      </div>

      <!-- Barber donut -->
      <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
        <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Revenue by Barber</div>
        <VueApexCharts type="donut" height="220" :series="barberDonutSeries" :options="barberDonutOptions" />
      </div>
    </div>
  </div>
</template>
