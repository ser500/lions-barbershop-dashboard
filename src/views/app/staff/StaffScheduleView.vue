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
  <div class="p-6 font-inter">
    <div class="flex items-center justify-between mb-5">
      <div>
        <div style="font-size:1.1rem;font-weight:700;color:#e5e7eb">Today's Schedule</div>
        <div style="font-size:0.78rem;color:#6b7280;margin-top:2px">All barbers · {{ store.schedule.length }} appointments</div>
      </div>
      <div class="flex items-center gap-3">
        <select
          v-model="selectedBarber"
          style="background:#111;border:1px solid #2a2a2a;color:#e5e7eb;font-size:0.83rem;padding:8px 12px;border-radius:8px;outline:none;font-family:'Inter',sans-serif;cursor:pointer"
        >
          <option v-for="b in barbers" :key="b" :value="b">{{ b }}</option>
        </select>
        <button
          @click="showModal = true"
          class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-black"
          style="background:linear-gradient(135deg,#b8960c,#8a7009);border:none;cursor:pointer"
        >
          <i class="ph ph-plus text-sm"></i>
          New Appointment
        </button>
      </div>
    </div>

    <ScheduleTimeline :schedule="store.schedule" />

    <NewApptModal v-model="showModal" />
  </div>
</template>
