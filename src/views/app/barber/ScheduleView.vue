<script setup>
import { ref } from 'vue'
import { useBarberStore } from '../../../stores/barber'

const store = useBarberStore()

const selectedAppt = ref(null)

function statusStyle(status) {
  if (status === 'completed') return 'background:#1f2937;color:#4b5563'
  if (status === 'in-chair') return 'background:rgba(184,150,12,0.15);color:#b8960c'
  return 'background:#1a1a1a;color:#9ca3af'
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
  if (plan === 'premium') return 'background:rgba(201,168,76,0.15);color:#c9a84c;border:1px solid rgba(201,168,76,0.3)'
  return 'background:rgba(168,184,200,0.1);color:#a8b8c8;border:1px solid rgba(168,184,200,0.3)'
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
</script>
<template>
  <div class="p-6 font-inter">
    <!-- Week header -->
    <div class="flex gap-2 mb-6 overflow-x-auto">
      <div
        v-for="(wd, i) in weekDates"
        :key="i"
        class="flex-shrink-0 text-center px-4 py-2 rounded-lg"
        :style="i === 0 ? 'background:rgba(184,150,12,0.15);border:1px solid rgba(184,150,12,0.3)' : 'background:#111;border:1px solid #1a1a1a'"
      >
        <div style="font-size:0.72rem;font-weight:600;text-transform:uppercase;" :style="{ color: i === 0 ? '#b8960c' : '#6b7280' }">{{ wd.day }}</div>
        <div style="font-size:1rem;font-weight:700;" :style="{ color: i === 0 ? '#b8960c' : '#e5e7eb' }">{{ wd.date }}</div>
      </div>
    </div>

    <!-- Appointments list (today) -->
    <div>
      <div class="mb-3" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Today's Appointments</div>
      <div class="space-y-3">
        <div
          v-for="appt in store.todayAppts"
          :key="appt.id"
          class="cursor-pointer p-4 rounded-xl transition-all"
          :style="appt.status === 'in-chair' ? 'background:rgba(184,150,12,0.08);border:1px solid rgba(184,150,12,0.25);border-left:3px solid #b8960c' : 'background:#111;border:1px solid #1a1a1a'"
          @click="selectedAppt = appt"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0" style="background:linear-gradient(135deg,#b8960c,#8a7009)">
                {{ appt.client.split(' ').map(n => n[0]).join('') }}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span style="font-size:0.9rem;font-weight:700;color:#e5e7eb">{{ appt.client }}</span>
                  <span class="text-xs px-1.5 py-0.5 rounded-full" :style="planBadge(appt.plan)">{{ appt.plan }}</span>
                </div>
                <div style="font-size:0.75rem;color:#6b7280;margin-top:1px">{{ appt.service }} · {{ appt.time }}</div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span style="font-size:1rem;font-weight:700;color:#b8960c">${{ appt.revenue }}</span>
              <span class="text-xs px-2 py-0.5 rounded-full" :style="statusStyle(appt.status)">{{ appt.status === 'in-chair' ? 'In Chair' : appt.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Appointment detail modal -->
    <div v-if="selectedAppt" class="fixed inset-0 flex items-center justify-center z-50" style="background:rgba(0,0,0,0.7)" @click.self="selectedAppt = null">
      <div class="rounded-xl p-6 w-80" style="background:#111;border:1px solid #2a2a2a">
        <div class="flex items-center justify-between mb-4">
          <div style="font-size:1rem;font-weight:700;color:#e5e7eb">Appointment</div>
          <button @click="selectedAppt = null" style="color:#6b7280;background:transparent;border:none;font-size:1.2rem;cursor:pointer">×</button>
        </div>
        <div class="space-y-2 mb-5">
          <div><span style="font-size:0.72rem;color:#6b7280">Client: </span><span style="font-size:0.85rem;font-weight:600;color:#e5e7eb">{{ selectedAppt.client }}</span></div>
          <div><span style="font-size:0.72rem;color:#6b7280">Service: </span><span style="font-size:0.85rem;color:#e5e7eb">{{ selectedAppt.service }}</span></div>
          <div><span style="font-size:0.72rem;color:#6b7280">Time: </span><span style="font-size:0.85rem;color:#e5e7eb">{{ selectedAppt.time }}</span></div>
          <div><span style="font-size:0.72rem;color:#6b7280">Plan: </span><span style="font-size:0.85rem;color:#b8960c;font-weight:600;text-transform:capitalize">{{ selectedAppt.plan }}</span></div>
          <div><span style="font-size:0.72rem;color:#6b7280">Revenue: </span><span style="font-size:0.85rem;font-weight:700;color:#b8960c">${{ selectedAppt.revenue }}</span></div>
        </div>
        <div v-if="selectedAppt.status === 'upcoming' || selectedAppt.status === 'in-chair'" class="flex gap-3">
          <button @click="markComplete(selectedAppt)" class="flex-1 py-2 rounded-lg text-sm font-semibold text-black" style="background:linear-gradient(135deg,#b8960c,#8a7009);border:none;cursor:pointer">Mark Complete</button>
          <button @click="markNoShow(selectedAppt)" class="flex-1 py-2 rounded-lg text-sm font-semibold" style="background:rgba(239,68,68,0.1);color:#ef4444;border:1px solid rgba(239,68,68,0.3);cursor:pointer">No-Show</button>
        </div>
      </div>
    </div>
  </div>
</template>
