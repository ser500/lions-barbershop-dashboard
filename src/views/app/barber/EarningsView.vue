<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useBarberStore } from '../../../stores/barber'

const store = useBarberStore()

const kpis = [
  { label: 'MTD Earnings',  value: '$' + store.earnings.mtd.toLocaleString(), icon: 'ph-currency-dollar', sub: 'Month to date' },
  { label: 'Avg Ticket',    value: '$' + store.earnings.avgTicket,             icon: 'ph-receipt',         sub: 'Per appointment' },
  { label: 'Tip Rate',      value: store.earnings.tipRate + '%',               icon: 'ph-hand-coins',      sub: 'Of service total' },
  { label: 'Total Appts',   value: store.earnings.totalAppts,                  icon: 'ph-calendar-check',  sub: 'This month' },
]

const myAvgTicket = store.earnings.avgTicket
const shopAvgTicket = 106
const myPct = Math.round((myAvgTicket / (Math.max(myAvgTicket, shopAvgTicket) * 1.1)) * 100)
const shopPct = Math.round((shopAvgTicket / (Math.max(myAvgTicket, shopAvgTicket) * 1.1)) * 100)

const areaSeries = [{ name: 'Earnings', data: store.earningsTrend }]
const areaOptions = ref({
  chart: { type: 'area', background: 'transparent', toolbar: { show: false } },
  colors: ['#c9a84c'],
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
  colors: ['#c9a84c', '#6b7280', '#c9a84c', '#374151'],
  labels: ['Signature Cut', 'Fade', 'Beard', 'Shave'],
  dataLabels: { enabled: false },
  legend: { labels: { colors: '#9ca3af' } },
  plotOptions: { pie: { donut: { size: '65%' } } },
  tooltip: { theme: 'dark' },
})
</script>
<template>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">

    <!-- KPI stats row -->
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

    <!-- 30-day area chart -->
    <div class="app-card app-enter app-d2" style="padding:20px">
      <div class="app-section-label" style="margin-bottom:12px">30-Day Earnings Trend</div>
      <VueApexCharts type="area" height="220" :series="areaSeries" :options="areaOptions" />
    </div>

    <!-- Bottom row: services mix + vs shop average -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">

      <!-- Services donut -->
      <div class="app-card app-enter app-d3" style="padding:20px">
        <div class="app-section-label" style="margin-bottom:12px">My Services Mix</div>
        <VueApexCharts type="donut" height="220" :series="serviceDonutSeries" :options="serviceDonutOptions" />
      </div>

      <!-- vs Shop Average -->
      <div class="app-card app-enter app-d5" style="padding:20px">
        <div class="app-section-label" style="margin-bottom:16px">vs Shop Average</div>
        <div style="display:flex;flex-direction:column;gap:16px">

          <!-- My avg ticket bar -->
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
              <span style="font-size:0.78rem;color:var(--app-text-dim)">My Avg Ticket</span>
              <span style="font-size:0.95rem;font-weight:700;color:var(--app-gold)">${{ myAvgTicket }}</span>
            </div>
            <div class="app-progress" style="height:8px">
              <div class="app-progress-fill" :style="`width:${myPct}%;background:var(--app-gold)`"></div>
            </div>
          </div>

          <!-- Shop avg bar -->
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
              <span style="font-size:0.78rem;color:var(--app-text-dim)">Shop Average</span>
              <span style="font-size:0.95rem;font-weight:700;color:var(--app-blue)">${{ shopAvgTicket }}</span>
            </div>
            <div class="app-progress" style="height:8px">
              <div class="app-progress-fill" :style="`width:${shopPct}%;background:var(--app-blue)`"></div>
            </div>
          </div>

          <!-- Delta callout -->
          <div style="display:flex;align-items:center;gap:10px;padding:12px;border-radius:8px;background:rgba(34,197,94,0.05);border:1px solid rgba(34,197,94,0.15)">
            <i class="ph ph-trend-up" style="color:var(--app-green);font-size:1.1rem;flex-shrink:0"></i>
            <div>
              <div style="font-size:1rem;font-weight:700;color:var(--app-green)">+${{ myAvgTicket - shopAvgTicket }}</div>
              <div style="font-size:0.72rem;color:var(--app-text-muted)">above shop average</div>
            </div>
          </div>

          <div style="font-size:0.8rem;color:var(--app-text-muted)">
            Beard upsell rate: <span style="color:var(--app-gold);font-weight:700">62%</span> (team best)
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
