<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useRevenueStore } from '../../../stores/revenue'
import AIInsightsStrip from '../../../components/app/AIInsightsStrip.vue'
import LocationRivalryBoard from '../../../components/app/LocationRivalryBoard.vue'
import RevenueForecastWidget from '../../../components/app/RevenueForecastWidget.vue'

const revenueStore = useRevenueStore()

const kpis = [
  { label: 'Revenue MTD',        value: '$68,420', icon: 'ph-currency-dollar', change: '+10.7%', up: true },
  { label: 'MRR',                value: '$921',    icon: 'ph-crown-simple',    change: '+6.4%',  up: true },
  { label: 'Total Appts',        value: '240',     icon: 'ph-calendar-check',  change: '+8',     up: true },
  { label: 'Active Subscribers', value: '10',      icon: 'ph-users',           change: '+2',     up: true },
  { label: 'New Clients',        value: '18',      icon: 'ph-user-plus',       change: '+5',     up: true },
  { label: 'Labor Cost %',       value: '34%',     icon: 'ph-chart-pie',       change: '-1.2%',  up: true },
]

const chartSeries = [
  {
    name: 'Downtown',
    data: revenueStore.monthly.map(m => m.service),
  },
  {
    name: 'East Side',
    data: revenueStore.monthly.map(m => Math.round(m.service * 0.67)),
  },
]

const chartOptions = ref({
  chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
  colors: ['#b8960c', '#6b7280'],
  plotOptions: { bar: { columnWidth: '55%', borderRadius: 3 } },
  dataLabels: { enabled: false },
  xaxis: {
    categories: revenueStore.monthly.map(m => m.month),
    labels: { style: { colors: '#6b7280', fontSize: '11px' } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { labels: { style: { colors: '#6b7280', fontSize: '11px' }, formatter: v => '$' + (v / 1000).toFixed(0) + 'k' } },
  grid: { borderColor: '#1a1a1a', strokeDashArray: 3 },
  legend: { labels: { colors: '#9ca3af' } },
  tooltip: { theme: 'dark' },
})
</script>
<template>
  <div class="p-6 font-inter">
    <AIInsightsStrip text="East Side is 23% below pace — Tuesday evenings are consistently underbooked." />

    <!-- KPI Cards -->
    <div class="grid grid-cols-6 gap-4 mb-6">
      <div v-for="kpi in kpis" :key="kpi.label" class="rounded-xl p-4" style="background:#111;border:1px solid #1a1a1a">
        <div class="flex items-center justify-between mb-2">
          <span style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">{{ kpi.label }}</span>
          <i :class="`ph ${kpi.icon}`" style="color:#b8960c;font-size:1rem"></i>
        </div>
        <div style="font-size:1.4rem;font-weight:700;color:#ffffff;margin-bottom:4px">{{ kpi.value }}</div>
        <div style="font-size:0.72rem;" :style="{ color: kpi.up ? '#22c55e' : '#ef4444' }">{{ kpi.change }}</div>
      </div>
    </div>

    <!-- Revenue chart -->
    <div class="mb-6 rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
      <div class="mb-4">
        <div style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Revenue by Location</div>
        <div style="font-size:0.75rem;color:#6b7280;margin-top:2px">Last 6 months — service revenue</div>
      </div>
      <VueApexCharts type="bar" height="220" :series="chartSeries" :options="chartOptions" />
    </div>

    <!-- Bottom row -->
    <div class="grid grid-cols-3 gap-6 mb-6">
      <div>
        <LocationRivalryBoard />
        <div class="mt-4">
          <RevenueForecastWidget />
        </div>
      </div>

      <!-- Top barbers table -->
      <div class="col-span-2 rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
        <div class="mb-4">
          <div style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Top Barbers</div>
          <div style="font-size:0.75rem;color:#6b7280;margin-top:2px">Month-to-date performance</div>
        </div>
        <table class="w-full" style="border-collapse:collapse">
          <thead>
            <tr style="border-bottom:1px solid #1a1a1a">
              <th class="text-left pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Barber</th>
              <th class="text-left pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Location</th>
              <th class="text-right pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Revenue</th>
              <th class="text-right pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Appts</th>
              <th class="text-right pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Avg Ticket</th>
              <th class="text-right pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Utilization</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(b, i) in revenueStore.byBarber" :key="b.name" style="border-bottom:1px solid #111">
              <td class="py-3">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0" style="background:linear-gradient(135deg,#b8960c,#8a7009)">
                    {{ b.name.split(' ').map(n => n[0]).join('') }}
                  </div>
                  <span style="font-size:0.83rem;font-weight:600;color:#e5e7eb">{{ b.name }}</span>
                </div>
              </td>
              <td class="py-3" style="font-size:0.8rem;color:#9ca3af">{{ i < 2 ? 'Downtown' : 'East Side' }}</td>
              <td class="py-3 text-right" style="font-size:0.83rem;font-weight:600;color:#b8960c">${{ b.revenue.toLocaleString() }}</td>
              <td class="py-3 text-right" style="font-size:0.83rem;color:#9ca3af">{{ b.appts }}</td>
              <td class="py-3 text-right" style="font-size:0.83rem;color:#9ca3af">${{ b.avgTicket }}</td>
              <td class="py-3 text-right">
                <div class="flex items-center justify-end gap-2">
                  <div style="width:60px;height:5px;background:#1a1a1a;border-radius:3px;overflow:hidden">
                    <div style="height:100%;border-radius:3px;background:#b8960c;transition:width 0.4s" :style="{ width: (85 - i * 8) + '%' }"></div>
                  </div>
                  <span style="font-size:0.78rem;color:#9ca3af">{{ 85 - i * 8 }}%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
