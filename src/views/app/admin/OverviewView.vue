<script setup>
import { useStaffStore } from '../../../stores/staff'
import AIInsightsStrip from '../../../components/app/AIInsightsStrip.vue'
import RevenueForecastWidget from '../../../components/app/RevenueForecastWidget.vue'
import ScheduleTimeline from '../../../components/staff/ScheduleTimeline.vue'

const store = useStaffStore()

const kpis = [
  { label: "Today's Revenue", value: '$3,840', icon: 'ph-currency-dollar', change: '+23%', up: true },
  { label: 'Appts Today',     value: '28',     icon: 'ph-calendar-check',  change: '+4',   up: true },
  { label: 'Active Queue',    value: '3',      icon: 'ph-users',           change: '',     up: true },
  { label: 'MRR',             value: '$521',   icon: 'ph-crown-simple',    change: '+6%',  up: true },
  { label: 'Utilization',     value: '72%',    icon: 'ph-chart-pie',       change: '+4%',  up: true },
]

const staffGrid = [
  { name: 'Devon R.', initials: 'DR', appts: 8, status: 'active' },
  { name: 'Marcus V.', initials: 'MV', appts: 6, status: 'active' },
  { name: 'James P.', initials: 'JP', appts: 5, status: 'active' },
  { name: 'Andre S.', initials: 'AS', appts: 0, status: 'break' },
]
</script>
<template>
  <div class="p-6 font-inter">
    <AIInsightsStrip text="3 Gold members haven't visited in 5+ weeks. Consider a win-back offer." />

    <!-- KPI Cards -->
    <div class="grid grid-cols-5 gap-4 mb-6">
      <div v-for="kpi in kpis" :key="kpi.label" class="rounded-xl p-4" style="background:#111;border:1px solid #1a1a1a">
        <div class="flex items-center justify-between mb-2">
          <span style="font-size:0.68rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">{{ kpi.label }}</span>
          <i :class="`ph ${kpi.icon}`" style="color:#b8960c;font-size:0.9rem"></i>
        </div>
        <div style="font-size:1.3rem;font-weight:700;color:#ffffff;margin-bottom:3px">{{ kpi.value }}</div>
        <div v-if="kpi.change" style="font-size:0.72rem;color:#22c55e">{{ kpi.change }}</div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-6 mb-6">
      <div class="col-span-2">
        <ScheduleTimeline :schedule="store.schedule" />
      </div>
      <div class="space-y-4">
        <RevenueForecastWidget />

        <!-- Staff status grid -->
        <div class="rounded-xl p-4" style="background:#111;border:1px solid #1a1a1a">
          <div class="mb-3" style="font-size:0.85rem;font-weight:700;color:#e5e7eb">Staff Status</div>
          <div class="grid grid-cols-2 gap-2">
            <div v-for="b in staffGrid" :key="b.name" class="flex items-center gap-2 p-2 rounded-lg" style="background:#0f0f0f;border:1px solid #1e1e1e">
              <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0" style="background:linear-gradient(135deg,#b8960c,#8a7009)">{{ b.initials }}</div>
              <div>
                <div style="font-size:0.75rem;font-weight:600;color:#e5e7eb">{{ b.name }}</div>
                <div style="font-size:0.68rem;" :style="{ color: b.status === 'active' ? '#22c55e' : '#fbbf24' }">{{ b.status }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Low stock callout -->
    <div class="rounded-xl p-4 flex items-center gap-3" style="background:rgba(239,68,68,0.05);border:1px solid rgba(239,68,68,0.15)">
      <i class="ph ph-warning" style="color:#ef4444;font-size:1rem;flex-shrink:0"></i>
      <div>
        <span style="font-size:0.83rem;font-weight:600;color:#ef4444">Low Stock Alert: </span>
        <span style="font-size:0.83rem;color:#9ca3af">Pomade Matte (3 left), Shave Foam (8 left), Barbicide (6 left), Edge Pro Blade (11 left)</span>
      </div>
    </div>
  </div>
</template>
