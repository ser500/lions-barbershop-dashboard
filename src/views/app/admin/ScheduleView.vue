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
  { id: 1, client: 'Marcus J.', service: 'Signature Cut', barber: 'Devon R.', day: 1, startHour: 9, duration: 1, color: 'var(--app-gold)' },
  { id: 2, client: 'James T.', service: 'Royal Shave', barber: 'Devon R.', day: 1, startHour: 10, duration: 0.5, color: 'var(--app-blue)' },
  { id: 3, client: 'Antoine B.', service: 'Haircut + Design', barber: 'Marcus V.', day: 1, startHour: 11, duration: 1, color: 'var(--app-amber)' },
  { id: 4, client: 'Chris W.', service: 'Fade + Lineup', barber: 'Devon R.', day: 2, startHour: 10, duration: 0.75, color: 'var(--app-green)' },
  { id: 5, client: 'David K.', service: 'Signature Cut', barber: 'James P.', day: 2, startHour: 13, duration: 0.75, color: 'var(--app-gold)' },
  { id: 6, client: 'Michael R.', service: 'Full Service', barber: 'Devon R.', day: 3, startHour: 9, duration: 1, color: 'var(--app-gold)' },
])

const selectedAppt = ref(null)
const generatedSlots = ref(false)

function generateSchedule() {
  appointments.value.push(
    { id: 99, client: 'Walk-in Slot', service: 'Available', barber: 'Any', day: 4, startHour: 14, duration: 0.75, color: 'var(--app-text-muted)' },
    { id: 100, client: 'Walk-in Slot', service: 'Available', barber: 'Any', day: 5, startHour: 11, duration: 0.75, color: 'var(--app-text-muted)' },
  )
  generatedSlots.value = true
}

function apptStyle(appt) {
  const top = (appt.startHour - 8) * 48
  const height = appt.duration * 48
  return `position:absolute;left:4px;right:4px;top:${top}px;height:${height}px;background:${appt.color}1f;border:1px solid ${appt.color}99;border-left:3px solid ${appt.color};border-radius:4px;padding:4px 6px;cursor:pointer;z-index:1`
}
</script>
<template>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">
    <!-- Header -->
    <div style="display:flex;align-items:center;justify-content:space-between">
      <div>
        <div style="font-size:1.1rem;font-weight:700;color:var(--app-text)">Schedule</div>
        <div style="font-size:0.78rem;color:var(--app-text-muted);margin-top:2px">Week of {{ weekDates[0].full.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}</div>
      </div>
      <button
        class="app-btn primary"
        @click="generateSchedule"
        :disabled="generatedSlots"
        :style="{ opacity: generatedSlots ? 0.6 : 1 }"
      >
        <i class="ph ph-magic-wand"></i>
        Generate Schedule
      </button>
    </div>

    <!-- Week grid -->
    <div class="app-card app-enter" style="padding:0;overflow:hidden">
      <!-- Day headers -->
      <div style="display:grid;grid-template-columns:64px repeat(7, 1fr);border-bottom:1px solid var(--app-border)">
        <div style="padding:10px 8px;background:var(--app-surface-2)"></div>
        <div
          v-for="(wd, i) in weekDates"
          :key="i"
          style="text-align:center;padding:10px 0;border-left:1px solid var(--app-border);font-size:0.78rem;font-weight:600"
          :style="{ color: wd.date === today.getDate() ? 'var(--app-gold)' : 'var(--app-text-muted)', background: wd.date === today.getDate() ? 'rgba(201,168,76,0.06)' : 'transparent' }"
        >
          {{ wd.day }} <span style="font-size:0.72rem;font-weight:400">{{ wd.date }}</span>
        </div>
      </div>

      <!-- Time slots -->
      <div style="display:grid;grid-template-columns:64px repeat(7, 1fr);max-height:480px;overflow:auto">
        <!-- Time column -->
        <div>
          <div v-for="slot in timeSlots" :key="slot" style="height:48px;padding:4px 8px;border-bottom:1px solid var(--app-border-dim);font-size:0.68rem;color:var(--app-text-muted);text-align:right">{{ slot }}</div>
        </div>
        <!-- Day columns -->
        <div
          v-for="(wd, dayIdx) in weekDates"
          :key="dayIdx"
          style="position:relative;border-left:1px solid var(--app-border)"
        >
          <div v-for="slot in timeSlots" :key="slot" style="height:48px;border-bottom:1px solid var(--app-border-dim)"></div>
          <!-- Appointment blocks -->
          <div
            v-for="appt in appointments.filter(a => a.day === dayIdx + 1)"
            :key="appt.id"
            :style="apptStyle(appt)"
            @click="selectedAppt = appt"
          >
            <div style="font-size:0.7rem;font-weight:600;color:var(--app-text);line-height:1.2">{{ appt.client }}</div>
            <div style="font-size:0.62rem;color:var(--app-text-muted)">{{ appt.service }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail modal -->
    <div v-if="selectedAppt" class="fixed inset-0 flex items-center justify-center z-50" style="background:rgba(0,0,0,0.7)" @click.self="selectedAppt = null">
      <div style="background:var(--app-surface-2);border:1px solid var(--app-border);border-radius:12px;padding:24px;width:320px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
          <div style="font-size:1rem;font-weight:700;color:var(--app-text)">Appointment Detail</div>
          <button @click="selectedAppt = null" style="color:var(--app-text-muted);background:transparent;border:none;font-size:1.2rem;cursor:pointer">×</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">
          <div><span style="font-size:0.72rem;color:var(--app-text-muted)">Client: </span><span style="font-size:0.83rem;color:var(--app-text)">{{ selectedAppt.client }}</span></div>
          <div><span style="font-size:0.72rem;color:var(--app-text-muted)">Service: </span><span style="font-size:0.83rem;color:var(--app-text)">{{ selectedAppt.service }}</span></div>
          <div><span style="font-size:0.72rem;color:var(--app-text-muted)">Barber: </span><span style="font-size:0.83rem;color:var(--app-text)">{{ selectedAppt.barber }}</span></div>
          <div><span style="font-size:0.72rem;color:var(--app-text-muted)">Start: </span><span style="font-size:0.83rem;color:var(--app-text)">{{ selectedAppt.startHour }}:00</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
