<script setup>
import { ref } from 'vue'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const today = new Date()
const startOfWeek = new Date(today)
startOfWeek.setDate(today.getDate() - today.getDay() + 1)

const weekDates = days.map((d, i) => {
  const date = new Date(startOfWeek)
  date.setDate(startOfWeek.getDate() + i)
  return { day: d, date: date.getDate(), full: date }
})

const timeSlots = []
for (let h = 8; h <= 19; h++) {
  timeSlots.push(`${h > 12 ? h - 12 : h}:00 ${h >= 12 ? 'PM' : 'AM'}`)
}

const appointments = ref([
  { id: 1, client: 'Marcus J.', service: 'Signature Cut', barber: 'Devon R.', day: 1, startHour: 9, duration: 1, color: '#b8960c' },
  { id: 2, client: 'James T.', service: 'Royal Shave', barber: 'Devon R.', day: 1, startHour: 10, duration: 0.5, color: '#7c3aed' },
  { id: 3, client: 'Antoine B.', service: 'Haircut + Design', barber: 'Marcus V.', day: 1, startHour: 11, duration: 1, color: '#374151' },
  { id: 4, client: 'Chris W.', service: 'Fade + Lineup', barber: 'Devon R.', day: 2, startHour: 10, duration: 0.75, color: '#6b7280' },
  { id: 5, client: 'David K.', service: 'Signature Cut', barber: 'James P.', day: 2, startHour: 13, duration: 0.75, color: '#b8960c' },
  { id: 6, client: 'Michael R.', service: 'Full Service', barber: 'Devon R.', day: 3, startHour: 9, duration: 1, color: '#b8960c' },
])

const selectedAppt = ref(null)
const generatedSlots = ref(false)

function generateSchedule() {
  appointments.value.push(
    { id: 99, client: 'Walk-in Slot', service: 'Available', barber: 'Any', day: 4, startHour: 14, duration: 0.75, color: '#374151' },
    { id: 100, client: 'Walk-in Slot', service: 'Available', barber: 'Any', day: 5, startHour: 11, duration: 0.75, color: '#374151' },
  )
  generatedSlots.value = true
}

function apptStyle(appt) {
  const top = (appt.startHour - 8) * 48
  const height = appt.duration * 48
  return `position:absolute;left:4px;right:4px;top:${top}px;height:${height}px;background:${appt.color}20;border:1px solid ${appt.color}60;border-left:3px solid ${appt.color};border-radius:4px;padding:4px 6px;cursor:pointer;z-index:1`
}
</script>
<template>
  <div class="p-6 font-inter">
    <div class="flex items-center justify-between mb-5">
      <div>
        <div style="font-size:1.1rem;font-weight:700;color:#e5e7eb">Schedule</div>
        <div style="font-size:0.78rem;color:#6b7280;margin-top:2px">Week of {{ weekDates[0].full.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}</div>
      </div>
      <button
        @click="generateSchedule"
        :disabled="generatedSlots"
        class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-black"
        style="background:linear-gradient(135deg,#b8960c,#8a7009);border:none;cursor:pointer;opacity:1"
        :style="{ opacity: generatedSlots ? 0.6 : 1 }"
      >
        <i class="ph ph-magic-wand text-sm"></i>
        Generate Schedule
      </button>
    </div>

    <!-- Week grid -->
    <div class="rounded-xl overflow-hidden" style="background:#111;border:1px solid #1a1a1a">
      <!-- Day headers -->
      <div class="grid" style="grid-template-columns:64px repeat(7, 1fr);border-bottom:1px solid #1a1a1a">
        <div style="padding:10px 8px;background:#0f0f0f"></div>
        <div
          v-for="(wd, i) in weekDates"
          :key="i"
          class="text-center py-2.5"
          style="border-left:1px solid #1a1a1a;font-size:0.78rem;font-weight:600"
          :style="{ color: wd.date === today.getDate() ? '#b8960c' : '#9ca3af', background: wd.date === today.getDate() ? 'rgba(184,150,12,0.05)' : 'transparent' }"
        >
          {{ wd.day }} <span style="font-size:0.72rem;font-weight:400">{{ wd.date }}</span>
        </div>
      </div>

      <!-- Time slots -->
      <div class="grid overflow-auto" style="grid-template-columns:64px repeat(7, 1fr);max-height:480px">
        <!-- Time column -->
        <div>
          <div v-for="slot in timeSlots" :key="slot" style="height:48px;padding:4px 8px;border-bottom:1px solid #0f0f0f;font-size:0.68rem;color:#4b5563;text-align:right">{{ slot }}</div>
        </div>
        <!-- Day columns -->
        <div
          v-for="(wd, dayIdx) in weekDates"
          :key="dayIdx"
          class="relative"
          style="border-left:1px solid #1a1a1a"
        >
          <div v-for="slot in timeSlots" :key="slot" style="height:48px;border-bottom:1px solid #0f0f0f"></div>
          <!-- Appointment blocks -->
          <div
            v-for="appt in appointments.filter(a => a.day === dayIdx + 1)"
            :key="appt.id"
            :style="apptStyle(appt)"
            @click="selectedAppt = appt"
          >
            <div style="font-size:0.7rem;font-weight:600;color:#e5e7eb;line-height:1.2">{{ appt.client }}</div>
            <div style="font-size:0.62rem;color:#9ca3af">{{ appt.service }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail panel -->
    <div v-if="selectedAppt" class="fixed inset-0 flex items-center justify-center z-50" style="background:rgba(0,0,0,0.7)" @click.self="selectedAppt = null">
      <div class="rounded-xl p-6 w-80" style="background:#111;border:1px solid #2a2a2a">
        <div class="flex items-center justify-between mb-4">
          <div style="font-size:1rem;font-weight:700;color:#e5e7eb">Appointment Detail</div>
          <button @click="selectedAppt = null" style="color:#6b7280;background:transparent;border:none;font-size:1.2rem;cursor:pointer">×</button>
        </div>
        <div class="space-y-3">
          <div><span style="font-size:0.72rem;color:#6b7280">Client: </span><span style="font-size:0.83rem;color:#e5e7eb">{{ selectedAppt.client }}</span></div>
          <div><span style="font-size:0.72rem;color:#6b7280">Service: </span><span style="font-size:0.83rem;color:#e5e7eb">{{ selectedAppt.service }}</span></div>
          <div><span style="font-size:0.72rem;color:#6b7280">Barber: </span><span style="font-size:0.83rem;color:#e5e7eb">{{ selectedAppt.barber }}</span></div>
          <div><span style="font-size:0.72rem;color:#6b7280">Start: </span><span style="font-size:0.83rem;color:#e5e7eb">{{ selectedAppt.startHour }}:00</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
