<script setup>
import { ref } from 'vue'
import { useBarberStore } from '../../../stores/barber'

const store = useBarberStore()

const selectedAppt = ref(null)

function statusBadgeClass(status) {
  if (status === 'in-chair') return 'app-badge green'
  if (status === 'upcoming') return 'app-badge amber'
  return 'app-badge blue'
}

function statusLabel(status) {
  if (status === 'in-chair') return 'In Chair'
  if (status === 'upcoming') return 'Upcoming'
  return status.charAt(0).toUpperCase() + status.slice(1)
}

function markComplete(appt) {
  appt.status = 'completed'
  selectedAppt.value = null
}

function markNoShow(appt) {
  appt.status = 'cancelled'
  selectedAppt.value = null
}

function planBadge(plan) {
  if (plan === 'vip') return 'background:rgba(232,232,232,0.1);color:#e8e8e8;border:1px solid rgba(232,232,232,0.3)'
  if (plan === 'premium') return 'background:rgba(201,168,76,0.15);color:var(--app-gold);border:1px solid rgba(201,168,76,0.3)'
  return 'background:rgba(168,184,200,0.1);color:#a8b8c8;border:1px solid rgba(168,184,200,0.3)'
}

function serviceBorderColor(service) {
  if (!service) return 'var(--app-border)'
  const s = service.toLowerCase()
  if (s.includes('beard')) return 'var(--app-amber)'
  if (s.includes('full') || s.includes('shave')) return 'var(--app-gold)'
  return 'var(--app-blue)'
}

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const today = new Date()
const startOfWeek = new Date(today)
startOfWeek.setDate(today.getDate() - today.getDay() + 1)

const weekDates = weekDays.map((d, i) => {
  const date = new Date(startOfWeek)
  date.setDate(startOfWeek.getDate() + i)
  return { day: d, date: date.getDate() }
})

const activeDay = ref(0)
</script>
<template>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">

    <!-- Day selector -->
    <div class="app-card app-enter" style="padding:16px 20px">
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:2px">
        <button
          v-for="(wd, i) in weekDates"
          :key="i"
          style="flex-shrink:0;text-align:center;padding:6px 16px;border-radius:20px;cursor:pointer;border:none;font-family:'Inter',sans-serif;transition:all 0.15s"
          :style="activeDay === i
            ? 'background:var(--app-gold);color:#060810;font-weight:600;font-size:0.8rem'
            : 'background:transparent;color:var(--app-text-dim);font-size:0.8rem;border:1px solid var(--app-border)'"
          @click="activeDay = i"
        >
          <div style="font-size:0.68rem;font-weight:600;text-transform:uppercase;letter-spacing:0.06em">{{ wd.day }}</div>
          <div style="font-size:1rem;font-weight:700;margin-top:1px">{{ wd.date }}</div>
        </button>
      </div>
    </div>

    <!-- Appointments label -->
    <div class="app-section-label" style="padding:0 2px">Today's Appointments</div>

    <!-- Appointment cards -->
    <div
      v-for="(appt, i) in store.todayAppts"
      :key="appt.id"
      class="app-card lift app-enter"
      :class="`app-d${Math.min(i + 1, 7)}`"
      style="padding:16px 20px;cursor:pointer;border-left-width:3px;border-left-style:solid"
      :style="`border-left-color:${serviceBorderColor(appt.service)}`"
      @click="selectedAppt = appt"
    >
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px">
        <div style="display:flex;align-items:center;gap:12px">
          <div
            style="width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.78rem;font-weight:700;color:#060810;flex-shrink:0"
            style2="background:linear-gradient(135deg,var(--app-gold),rgba(201,168,76,0.5))"
            :style="{ background: 'linear-gradient(135deg,var(--app-gold),rgba(201,168,76,0.5))' }"
          >
            {{ appt.client.split(' ').map(n => n[0]).join('') }}
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px">
              <span style="font-size:0.95rem;font-weight:600;color:var(--app-text)">{{ appt.client }}</span>
              <span class="text-xs px-1.5 py-0.5 rounded-full" :style="planBadge(appt.plan)">{{ appt.plan }}</span>
            </div>
            <div style="font-size:0.8rem;color:var(--app-text-dim)">{{ appt.service }} &middot; {{ appt.time }}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:12px;flex-shrink:0">
          <span style="font-size:1rem;font-weight:700;color:var(--app-gold)">${{ appt.revenue }}</span>
          <span :class="statusBadgeClass(appt.status)">{{ statusLabel(appt.status) }}</span>
        </div>
      </div>
    </div>

    <!-- Appointment detail modal -->
    <div
      v-if="selectedAppt"
      class="fixed inset-0 flex items-center justify-center z-50"
      style="background:rgba(0,0,0,0.7)"
      @click.self="selectedAppt = null"
    >
      <div
        class="app-card"
        style="padding:24px;width:320px;background:var(--app-surface-2);border:1px solid var(--app-border);border-radius:12px"
      >
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
          <div style="font-size:1rem;font-weight:700;color:var(--app-text)">Appointment</div>
          <button @click="selectedAppt = null" style="color:var(--app-text-muted);background:transparent;border:none;font-size:1.2rem;cursor:pointer;line-height:1">&times;</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">
          <div><span style="font-size:0.72rem;color:var(--app-text-muted)">Client: </span><span style="font-size:0.85rem;font-weight:600;color:var(--app-text)">{{ selectedAppt.client }}</span></div>
          <div><span style="font-size:0.72rem;color:var(--app-text-muted)">Service: </span><span style="font-size:0.85rem;color:var(--app-text)">{{ selectedAppt.service }}</span></div>
          <div><span style="font-size:0.72rem;color:var(--app-text-muted)">Time: </span><span style="font-size:0.85rem;color:var(--app-text)">{{ selectedAppt.time }}</span></div>
          <div><span style="font-size:0.72rem;color:var(--app-text-muted)">Plan: </span><span style="font-size:0.85rem;color:var(--app-gold);font-weight:600;text-transform:capitalize">{{ selectedAppt.plan }}</span></div>
          <div><span style="font-size:0.72rem;color:var(--app-text-muted)">Revenue: </span><span style="font-size:0.85rem;font-weight:700;color:var(--app-gold)">${{ selectedAppt.revenue }}</span></div>
        </div>
        <div v-if="selectedAppt.status === 'upcoming' || selectedAppt.status === 'in-chair'" style="display:flex;gap:12px">
          <button
            @click="markComplete(selectedAppt)"
            class="app-btn primary"
            style="flex:1;justify-content:center"
          >Mark Complete</button>
          <button
            @click="markNoShow(selectedAppt)"
            style="flex:1;padding:8px 12px;border-radius:8px;font-size:0.85rem;font-weight:600;background:rgba(239,68,68,0.1);color:var(--app-red);border:1px solid rgba(239,68,68,0.3);cursor:pointer;font-family:'Inter',sans-serif"
          >No-Show</button>
        </div>
      </div>
    </div>

  </div>
</template>
