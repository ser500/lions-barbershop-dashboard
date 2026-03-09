<script setup>
import { ref } from 'vue'
import { useStaffStore } from '../../../stores/staff'
import ScheduleTimeline from '../../../components/staff/ScheduleTimeline.vue'
import NewApptModal from '../../../components/staff/NewApptModal.vue'

const store = useStaffStore()
const showModal = ref(false)
const selectedBarber = ref('All Barbers')
const barbers = ['All Barbers', 'Devon R.', 'Marcus V.', 'James P.', 'Andre S.']
</script>
<template>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">
    <!-- Header row -->
    <div class="flex items-center justify-between">
      <div>
        <div class="app-section-label">Today's Schedule</div>
        <div style="font-size:0.78rem;color:var(--app-text-muted);margin-top:2px">All barbers · {{ store.schedule.length }} appointments</div>
      </div>
      <button class="app-btn primary" @click="showModal = true">
        <i class="ph ph-plus"></i>
        New Appointment
      </button>
    </div>

    <!-- Barber filter pills -->
    <div class="flex items-center gap-2 flex-wrap">
      <button
        v-for="b in barbers"
        :key="b"
        class="app-btn ghost"
        :style="selectedBarber === b ? 'background:var(--app-gold);color:#060810;border-color:var(--app-gold)' : ''"
        @click="selectedBarber = b"
      >{{ b }}</button>
    </div>

    <!-- Schedule timeline -->
    <div class="app-card app-enter app-d2" style="padding:20px">
      <ScheduleTimeline :schedule="store.schedule" />
    </div>

    <NewApptModal v-model="showModal" />
  </div>
</template>
