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
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">
    <AIInsightsStrip class="app-enter" text="3 Gold members haven't visited in 5+ weeks. Consider a win-back offer." />

    <!-- KPI Cards -->
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px">
      <div
        v-for="(kpi, i) in kpis"
        :key="kpi.label"
        class="app-stat app-enter"
        :class="`app-d${i + 1}`"
      >
        <div class="app-stat-label">{{ kpi.label }}</div>
        <div class="app-stat-value">{{ kpi.value }}</div>
        <div v-if="kpi.change" class="app-stat-sub" style="color:var(--app-green)">{{ kpi.change }}</div>
        <i :class="`ph ${kpi.icon} app-stat-icon`"></i>
      </div>
    </div>

    <!-- 2-col layout -->
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px">
      <!-- Schedule Timeline -->
      <div class="app-card app-enter app-d3" style="padding:20px">
        <ScheduleTimeline :schedule="store.schedule" />
      </div>

      <!-- Right column -->
      <div style="display:flex;flex-direction:column;gap:16px">
        <RevenueForecastWidget class="app-enter app-d4" />

        <!-- Staff status grid -->
        <div class="app-card app-enter app-d5" style="padding:16px">
          <div class="app-section-label" style="margin-bottom:12px">Staff Status</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            <div
              v-for="b in staffGrid"
              :key="b.name"
              style="display:flex;align-items:center;gap:8px;padding:8px;border-radius:8px;background:var(--app-surface-2);border:1px solid var(--app-border-dim)"
            >
              <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--app-gold),#8a7009);display:flex;align-items:center;justify-content:center;font-size:0.68rem;font-weight:700;color:#000;flex-shrink:0">{{ b.initials }}</div>
              <div>
                <div style="font-size:0.75rem;font-weight:600;color:var(--app-text)">{{ b.name }}</div>
                <span
                  class="app-badge"
                  :class="b.status === 'active' ? 'green' : 'amber'"
                  style="font-size:0.62rem;padding:1px 6px"
                >{{ b.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Low stock callout -->
    <div class="app-card app-enter app-d6" style="padding:14px 16px;border-left:3px solid var(--app-amber);display:flex;align-items:center;gap:10px">
      <i class="ph ph-warning" style="color:var(--app-amber);font-size:1rem;flex-shrink:0"></i>
      <div>
        <span style="font-size:0.83rem;font-weight:600;color:var(--app-amber)">Low Stock Alert: </span>
        <span style="font-size:0.83rem;color:var(--app-text-muted)">Pomade Matte (3 left), Shave Foam (8 left), Barbicide (6 left), Edge Pro Blade (11 left)</span>
      </div>
    </div>
  </div>
</template>
