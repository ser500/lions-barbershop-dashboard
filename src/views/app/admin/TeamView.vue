<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useStaffStore } from '../../../stores/staff'

const store = useStaffStore()

const chartSeries = [
  { name: 'Devon R.',  data: [8, 9, 10, 8] },
  { name: 'Marcus V.', data: [6, 7, 6, 7] },
  { name: 'James P.',  data: [5, 4, 6, 5] },
  { name: 'Andre S.',  data: [3, 4, 3, 4] },
]

const chartOptions = ref({
  chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
  colors: ['#b8960c', '#6b7280', '#c9a84c', '#374151'],
  plotOptions: { bar: { columnWidth: '60%', borderRadius: 2 } },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    labels: { style: { colors: '#6b7280', fontSize: '11px' } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { labels: { style: { colors: '#6b7280', fontSize: '11px' } } },
  grid: { borderColor: '#1a1a1a', strokeDashArray: 3 },
  legend: { labels: { colors: '#9ca3af' } },
  tooltip: { theme: 'dark' },
})

function utilizationFillColor(pct) {
  if (pct >= 70) return 'var(--app-green)'
  if (pct >= 50) return 'var(--app-amber)'
  return 'var(--app-red)'
}

function statusBadge(status) {
  if (status === 'active') return 'green'
  if (status === 'break') return 'amber'
  return 'red'
}
</script>
<template>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">
    <!-- Barber cards grid -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
      <div
        v-for="(b, i) in store.staffPerformance"
        :key="b.id"
        class="app-card lift app-enter"
        :class="`app-d${i + 1}`"
        style="padding:20px"
      >
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,var(--app-gold),#8a7009);display:flex;align-items:center;justify-content:center;font-size:0.9rem;font-weight:700;color:#000">{{ b.initials }}</div>
          <span class="app-badge" :class="statusBadge(b.status)">{{ b.status }}</span>
        </div>
        <div style="font-size:1rem;font-weight:700;color:var(--app-text);margin-bottom:4px">{{ b.name }}</div>
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.8rem;color:var(--app-text-dim);margin-bottom:12px">
          <span>{{ b.appts }} appts</span>
          <span style="color:var(--app-gold);font-weight:600">{{ b.revenue }}</span>
        </div>
        <!-- Utilization bar -->
        <div style="font-size:0.68rem;color:var(--app-text-muted);margin-bottom:4px">Utilization {{ b.utilization }}%</div>
        <div class="app-progress" style="height:6px">
          <div class="app-progress-fill" :style="{ width: b.utilization + '%', background: utilizationFillColor(b.utilization) }"></div>
        </div>
      </div>
    </div>

    <!-- 4-week chart -->
    <div class="app-card app-enter app-d5" style="padding:20px">
      <div class="app-section-label" style="margin-bottom:16px">4-Week Appointments by Barber</div>
      <VueApexCharts type="bar" height="240" :series="chartSeries" :options="chartOptions" />
    </div>
  </div>
</template>
