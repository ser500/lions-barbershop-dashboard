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

function statusStyle(status) {
  if (status === 'completed') return 'background:#1f2937;color:#4b5563;border:1px solid #374151'
  if (status === 'in-chair') return 'background:rgba(184,150,12,0.15);color:#b8960c;border:1px solid rgba(184,150,12,0.3)'
  return 'background:#111;color:#9ca3af;border:1px solid #2a2a2a'
}

function planBadge(plan) {
  if (plan === 'vip') return 'background:rgba(232,232,232,0.1);color:#e8e8e8;border:1px solid rgba(232,232,232,0.3)'
  if (plan === 'premium') return 'background:rgba(201,168,76,0.15);color:#c9a84c;border:1px solid rgba(201,168,76,0.3)'
  return 'background:rgba(168,184,200,0.1);color:#a8b8c8;border:1px solid rgba(168,184,200,0.3)'
}
</script>
<template>
  <div class="p-6 font-inter">
    <!-- Greeting -->
    <div class="flex items-center justify-between mb-5">
      <div>
        <div style="font-size:1.2rem;font-weight:700;color:#e5e7eb">Good morning, Devon</div>
        <div style="font-size:0.78rem;color:#6b7280;margin-top:2px">Sunday, March 8</div>
      </div>
      <span style="font-size:0.75rem;background:rgba(34,197,94,0.1);color:#22c55e;border:1px solid rgba(34,197,94,0.2);padding:4px 12px;border-radius:20px;font-weight:600">Downtown · Open</span>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <div v-for="kpi in myKpis" :key="kpi.label" class="rounded-xl p-4" style="background:#111;border:1px solid #1a1a1a">
        <div class="flex items-center gap-2 mb-2">
          <i :class="`ph ${kpi.icon}`" style="color:#b8960c;font-size:0.9rem"></i>
          <span style="font-size:0.68rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">{{ kpi.label }}</span>
        </div>
        <div style="font-size:1.3rem;font-weight:700;color:#ffffff">{{ kpi.value }}</div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-6 mb-6">
      <!-- Today's appointments -->
      <div class="col-span-2 rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
        <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Today's Schedule</div>
        <div class="space-y-2">
          <div v-for="appt in store.todayAppts" :key="appt.id" class="flex items-center justify-between p-3 rounded-lg" :style="appt.status === 'in-chair' ? 'background:rgba(184,150,12,0.05);border-left:3px solid #b8960c;border:1px solid rgba(184,150,12,0.2)' : 'background:#0f0f0f;border:1px solid #1e1e1e'">
            <div class="flex items-center gap-3">
              <div style="font-size:0.78rem;color:#6b7280;width:70px;flex-shrink:0">{{ appt.time }}</div>
              <div>
                <div class="flex items-center gap-2">
                  <span style="font-size:0.85rem;font-weight:600;color:#e5e7eb">{{ appt.client }}</span>
                  <span class="text-xs px-1.5 py-0.5 rounded-full font-medium" :style="planBadge(appt.plan)">{{ appt.plan }}</span>
                </div>
                <div style="font-size:0.75rem;color:#6b7280;margin-top:1px">{{ appt.service }} · {{ appt.duration }}m</div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span style="font-size:0.85rem;font-weight:700;color:#b8960c">${{ appt.revenue }}</span>
              <span class="text-xs px-2 py-0.5 rounded-full font-medium" :style="statusStyle(appt.status)">{{ appt.status === 'in-chair' ? 'In Chair' : appt.status }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Next client intel + week stats -->
      <div class="space-y-4">
        <div v-if="nextClientIntel">
          <div style="font-size:0.75rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;margin-bottom:8px">Next Client Intel</div>
          <ClientIntelCard :client="nextClientIntel" />
        </div>

        <div class="grid grid-cols-1 gap-3">
          <div v-for="stat in weekStats" :key="stat.label" class="p-4 rounded-xl" style="background:#111;border:1px solid #1a1a1a">
            <div style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;margin-bottom:3px">{{ stat.label }}</div>
            <div class="flex items-end justify-between">
              <div style="font-size:1.1rem;font-weight:700;color:#ffffff">{{ stat.value }}</div>
              <div style="font-size:0.72rem;" :style="{ color: stat.up ? '#22c55e' : '#ef4444' }">{{ stat.vsLast }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
