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
  colors: ['var(--app-gold)', '#6b7280'],
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
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">
    <AIInsightsStrip text="East Side is 23% below pace — Tuesday evenings are consistently underbooked." />

    <!-- KPI Cards -->
    <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:12px">
      <div
        v-for="(kpi, i) in kpis"
        :key="kpi.label"
        class="app-stat app-enter"
        :class="`app-d${i + 1}`"
        style="padding:16px"
      >
        <div class="app-stat-label">{{ kpi.label }}</div>
        <div class="app-stat-value">{{ kpi.value }}</div>
        <div class="app-stat-sub" :style="{ color: kpi.up ? 'var(--app-green)' : 'var(--app-red)' }">{{ kpi.change }}</div>
        <i :class="`ph ${kpi.icon} app-stat-icon`"></i>
      </div>
    </div>

    <!-- Bottom row: rivalry + forecast + top barbers -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
      <div style="display:flex;flex-direction:column;gap:16px">
        <div class="app-card app-enter app-d2" style="padding:20px">
          <LocationRivalryBoard />
        </div>
        <div class="app-card app-enter app-d3" style="padding:20px">
          <RevenueForecastWidget />
        </div>
      </div>

      <!-- Top barbers table -->
      <div class="app-card app-enter app-d4 col-span-2" style="padding:0;overflow:hidden;grid-column:span 2">
        <div style="padding:20px 20px 0">
          <div class="app-section-label">Top Barbers</div>
          <div style="font-size:0.75rem;color:var(--app-text-muted);margin-top:2px;margin-bottom:16px">Month-to-date performance</div>
        </div>
        <table class="app-table w-full">
          <thead>
            <tr>
              <th class="text-left">Barber</th>
              <th class="text-left">Location</th>
              <th class="text-right">Revenue</th>
              <th class="text-right">Appts</th>
              <th class="text-right">Avg Ticket</th>
              <th class="text-right">Utilization</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(b, i) in revenueStore.byBarber" :key="b.name">
              <td>
                <div class="person-badge">
                  <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0" style="background:linear-gradient(135deg,var(--app-gold),#8a7009)">
                    {{ b.name.split(' ').map(n => n[0]).join('') }}
                  </div>
                  <span style="font-size:0.83rem;font-weight:600;color:var(--app-text)">{{ b.name }}</span>
                </div>
              </td>
              <td style="font-size:0.8rem;color:var(--app-text-muted)">{{ i < 2 ? 'Downtown' : 'East Side' }}</td>
              <td class="text-right" style="font-size:0.83rem;font-weight:600;color:var(--app-gold)">${{ b.revenue.toLocaleString() }}</td>
              <td class="text-right" style="font-size:0.83rem;color:var(--app-text-muted)">{{ b.appts }}</td>
              <td class="text-right" style="font-size:0.83rem;color:var(--app-text-muted)">${{ b.avgTicket }}</td>
              <td class="text-right">
                <div class="flex items-center justify-end gap-2">
                  <div style="width:60px;height:5px;background:var(--app-surface-2);border-radius:3px;overflow:hidden">
                    <div style="height:100%;border-radius:3px;background:var(--app-gold);transition:width 0.4s" :style="{ width: (85 - i * 8) + '%' }"></div>
                  </div>
                  <span style="font-size:0.78rem;color:var(--app-text-muted)">{{ 85 - i * 8 }}%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Revenue by location chart -->
    <div class="app-card app-enter" style="padding:20px">
      <div class="app-section-label" style="margin-bottom:4px">Revenue by Location</div>
      <div style="font-size:0.75rem;color:var(--app-text-muted);margin-bottom:16px">Last 6 months — service revenue</div>
      <VueApexCharts type="bar" height="220" :series="chartSeries" :options="chartOptions" />
    </div>
  </div>
</template>
