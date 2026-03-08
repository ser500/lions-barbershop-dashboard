<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useBarberStore } from '../../../stores/barber'

const store = useBarberStore()

const kpis = [
  { label: 'MTD Earnings',  value: '$' + store.earnings.mtd.toLocaleString(), icon: 'ph-currency-dollar' },
  { label: 'Avg Ticket',    value: '$' + store.earnings.avgTicket,             icon: 'ph-receipt' },
  { label: 'Tip Rate',      value: store.earnings.tipRate + '%',               icon: 'ph-hand-coins' },
  { label: 'Total Appts',   value: store.earnings.totalAppts,                  icon: 'ph-calendar-check' },
]

const areaSeries = [{ name: 'Earnings', data: store.earningsTrend }]
const areaOptions = ref({
  chart: { type: 'area', background: 'transparent', toolbar: { show: false }, sparkline: { enabled: false } },
  colors: ['#b8960c'],
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0, stops: [0, 100] } },
  stroke: { curve: 'smooth', width: 2 },
  dataLabels: { enabled: false },
  xaxis: {
    categories: Array.from({ length: 30 }, (_, i) => i + 1),
    labels: { style: { colors: '#6b7280', fontSize: '10px' } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { labels: { style: { colors: '#6b7280', fontSize: '11px' }, formatter: v => '$' + v } },
  grid: { borderColor: '#1a1a1a', strokeDashArray: 3 },
  tooltip: { theme: 'dark' },
})

const serviceDonutSeries = [42, 28, 22, 8]
const serviceDonutOptions = ref({
  chart: { type: 'donut', background: 'transparent' },
  colors: ['#b8960c', '#6b7280', '#c9a84c', '#374151'],
  labels: ['Signature Cut', 'Fade', 'Beard', 'Shave'],
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
          <span style="font-size:0.68rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">{{ kpi.label }}</span>
        </div>
        <div style="font-size:1.3rem;font-weight:700;color:#ffffff">{{ kpi.value }}</div>
      </div>
    </div>

    <!-- 30-day area chart -->
    <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
      <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">30-Day Earnings Trend</div>
      <VueApexCharts type="area" height="220" :series="areaSeries" :options="areaOptions" />
    </div>

    <div class="grid grid-cols-2 gap-6">
      <!-- Services donut -->
      <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
        <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">My Services Mix</div>
        <VueApexCharts type="donut" height="220" :series="serviceDonutSeries" :options="serviceDonutOptions" />
      </div>

      <!-- vs shop average -->
      <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
        <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">vs Shop Average</div>
        <div class="space-y-4">
          <div>
            <div style="font-size:0.75rem;color:#6b7280;margin-bottom:6px">My Avg Ticket</div>
            <div style="font-size:2rem;font-weight:700;color:#b8960c">${{ store.earnings.avgTicket }}</div>
          </div>
          <div>
            <div style="font-size:0.75rem;color:#6b7280;margin-bottom:6px">Shop Average</div>
            <div style="font-size:2rem;font-weight:700;color:#6b7280">$106</div>
          </div>
          <div class="flex items-center gap-2 p-3 rounded-lg" style="background:rgba(34,197,94,0.05);border:1px solid rgba(34,197,94,0.15)">
            <i class="ph ph-trend-up" style="color:#22c55e;font-size:1rem"></i>
            <div>
              <div style="font-size:1rem;font-weight:700;color:#22c55e">+${{ store.earnings.avgTicket - 106 }}</div>
              <div style="font-size:0.72rem;color:#6b7280">above shop average</div>
            </div>
          </div>
          <div style="font-size:0.78rem;color:#9ca3af">Beard upsell rate: <span style="color:#b8960c;font-weight:700">62%</span> (team best)</div>
        </div>
      </div>
    </div>
  </div>
</template>
