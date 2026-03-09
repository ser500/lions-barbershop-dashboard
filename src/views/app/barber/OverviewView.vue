<script setup>
import { computed } from 'vue'
import { useBarberStore } from '../../../stores/barber'
import { useClientsStore } from '../../../stores/clients'
import ClientIntelCard from '../../../components/app/ClientIntelCard.vue'

const store = useBarberStore()
const clientsStore = useClientsStore()

const myKpis = [
  { label: 'Appts Today',    value: store.todayAppts.length, icon: 'ph-calendar-check', suffix: '' },
  { label: 'Revenue Today',  value: '$' + store.todayAppts.reduce((s, a) => s + a.revenue, 0), icon: 'ph-currency-dollar', suffix: '' },
  { label: 'Tips (est.)',    value: '$' + Math.round(store.todayAppts.filter(a => a.status === 'completed').reduce((s, a) => s + a.revenue, 0) * 0.22), icon: 'ph-hand-coins', suffix: '' },
  { label: 'Avg Ticket',     value: '$' + store.earnings.avgTicket, icon: 'ph-trend-up', suffix: '' },
]

const nextUpcoming = computed(() => store.todayAppts.find(a => a.status === 'upcoming'))
const nextClientIntel = computed(() => {
  if (!nextUpcoming.value) return null
  const firstName = nextUpcoming.value.client.split(' ')[0].toLowerCase()
  return clientsStore.clients.find(c => c.name.toLowerCase().startsWith(firstName)) || null
})

const weekStats = [
  { label: 'Appts This Week', value: 12, vsLast: '+2', up: true },
  { label: 'Revenue This Week', value: '$1,416', vsLast: '+$148', up: true },
]

function statusBadgeClass(status) {
  if (status === 'in-chair') return 'app-badge gold'
  if (status === 'upcoming') return 'app-badge amber'
  return 'app-badge'
}

function statusLabel(status) {
  if (status === 'in-chair') return 'In Chair'
  if (status === 'upcoming') return 'Upcoming'
  return 'Completed'
}

function planBadge(plan) {
  if (plan === 'vip') return 'background:rgba(232,232,232,0.1);color:#e8e8e8;border:1px solid rgba(232,232,232,0.3)'
  if (plan === 'premium') return 'background:rgba(201,168,76,0.15);color:var(--app-gold);border:1px solid rgba(201,168,76,0.3)'
  return 'background:rgba(168,184,200,0.1);color:#a8b8c8;border:1px solid rgba(168,184,200,0.3)'
}
</script>
<template>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">

    <!-- Greeting -->
    <div class="app-card app-enter" style="padding:20px;display:flex;align-items:center;justify-content:space-between;gap:16px">
      <div>
        <div style="font-size:1.3rem;font-weight:700;color:var(--app-text);margin-bottom:4px">Good morning, Devon</div>
        <div style="font-size:0.8rem;color:var(--app-text-dim)">Sunday, March 8</div>
      </div>
      <span class="app-badge green">
        <i class="ph ph-map-pin" style="margin-right:4px"></i>
        Downtown &middot; Open
      </span>
    </div>

    <!-- KPI grid -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
      <div
        v-for="(kpi, i) in myKpis"
        :key="kpi.label"
        class="app-stat app-enter"
        :class="`app-d${i + 1}`"
      >
        <div class="app-stat-label">{{ kpi.label }}</div>
        <div class="app-stat-value">{{ kpi.value }}</div>
        <i :class="`ph ${kpi.icon} app-stat-icon`"></i>
      </div>
    </div>

    <!-- Today's schedule + right column -->
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px;align-items:start">

      <!-- Today's Schedule -->
      <div class="app-card app-enter app-d5" style="padding:20px">
        <div class="app-section-label" style="margin-bottom:14px">Today's Schedule</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <div
            v-for="appt in store.todayAppts"
            :key="appt.id"
            style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:8px;background:var(--app-surface-2);border:1px solid var(--app-border-dim)"
          >
            <span :class="statusBadgeClass(appt.status)" style="flex-shrink:0;min-width:72px;text-align:center">
              {{ statusLabel(appt.status) }}
            </span>
            <div style="flex:1;min-width:0">
              <div style="font-size:0.875rem;font-weight:600;color:var(--app-text)">{{ appt.client }}</div>
              <div style="font-size:0.8rem;color:var(--app-text-dim);margin-top:1px">{{ appt.service }}</div>
            </div>
            <div style="font-size:0.8rem;color:var(--app-text-muted);flex-shrink:0">{{ appt.time }}</div>
            <div style="font-size:0.875rem;font-weight:700;color:var(--app-gold);flex-shrink:0">${{ appt.revenue }}</div>
          </div>
        </div>
      </div>

      <!-- Right column: client intel + week stats -->
      <div style="display:flex;flex-direction:column;gap:12px">

        <!-- Next Client Intel -->
        <div v-if="nextClientIntel" class="app-card app-enter app-d6" style="padding:20px">
          <div class="app-section-label" style="margin-bottom:10px">Next Client Intel</div>
          <ClientIntelCard :client="nextClientIntel" />
        </div>

        <!-- Week comparison -->
        <div
          v-for="stat in weekStats"
          :key="stat.label"
          class="app-card app-enter app-d7"
          style="padding:16px 20px"
        >
          <div class="app-stat-label" style="margin-bottom:4px">{{ stat.label }}</div>
          <div style="display:flex;align-items:flex-end;justify-content:space-between">
            <div style="font-size:1.2rem;font-weight:700;color:var(--app-text)">{{ stat.value }}</div>
            <div style="font-size:0.78rem;font-weight:600" :style="{ color: stat.up ? 'var(--app-green)' : 'var(--app-red)' }">
              <i :class="`ph ${stat.up ? 'ph-trend-up' : 'ph-trend-down'}`"></i>
              {{ stat.vsLast }}
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
