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

function statusStyle(status) {
  if (status === 'active') return 'background:rgba(34,197,94,0.1);color:#22c55e;border:1px solid rgba(34,197,94,0.2)'
  return 'background:rgba(251,191,36,0.1);color:#fbbf24;border:1px solid rgba(251,191,36,0.2)'
}
</script>
<template>
  <div class="p-6 font-inter space-y-6">
    <!-- Barber cards -->
    <div>
      <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Barber Performance</div>
      <div class="grid grid-cols-4 gap-4">
        <div v-for="b in store.staffPerformance" :key="b.id" class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-black" style="background:linear-gradient(135deg,#b8960c,#8a7009)">{{ b.initials }}</div>
            <span class="text-xs px-2 py-0.5 rounded-full font-medium" :style="statusStyle(b.status)">{{ b.status }}</span>
          </div>
          <div style="font-size:0.9rem;font-weight:700;color:#e5e7eb;margin-bottom:4px">{{ b.name }}</div>
          <div class="flex items-center justify-between mb-3" style="font-size:0.78rem;color:#9ca3af">
            <span>{{ b.appts }} appts</span>
            <span style="color:#b8960c;font-weight:600">{{ b.revenue }}</span>
          </div>
          <!-- Utilization bar -->
          <div style="font-size:0.68rem;color:#6b7280;margin-bottom:3px">Utilization {{ b.utilization }}%</div>
          <div style="background:#1a1a1a;border-radius:3px;height:4px;overflow:hidden">
            <div style="height:100%;border-radius:3px;background:#b8960c;transition:width 0.4s" :style="{ width: b.utilization + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4-week chart -->
    <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
      <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">4-Week Appointments by Barber</div>
      <VueApexCharts type="bar" height="240" :series="chartSeries" :options="chartOptions" />
    </div>
  </div>
</template>
