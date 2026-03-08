<script setup>
import { computed } from 'vue'
import { useStaffStore } from '../../../stores/staff'
import { useClientsStore } from '../../../stores/clients'
import StatsCards from '../../../components/staff/StatsCards.vue'
import ScheduleTimeline from '../../../components/staff/ScheduleTimeline.vue'
import WaitingArea from '../../../components/staff/WaitingArea.vue'
import ServicesDonut from '../../../components/staff/ServicesDonut.vue'
import StaffPerformanceTable from '../../../components/staff/StaffPerformanceTable.vue'
import ClientIntelCard from '../../../components/app/ClientIntelCard.vue'

const store = useStaffStore()
const clientsStore = useClientsStore()

const nextUpcoming = computed(() => store.schedule.find(a => a.status === 'upcoming'))
const nextClientIntel = computed(() => {
  if (!nextUpcoming.value) return null
  const firstName = nextUpcoming.value.client.split(' ')[0].toLowerCase()
  return clientsStore.clients.find(c => c.name.toLowerCase().startsWith(firstName)) || null
})
</script>
<template>
  <div class="font-inter">
    <StatsCards :stats="store.stats" />
    <div class="grid grid-cols-3 gap-6 px-6 mb-6">
      <ScheduleTimeline class="col-span-2" :schedule="store.schedule" />
      <div class="space-y-6">
        <WaitingArea :clients="store.waitingArea" />
        <ServicesDonut :services="store.servicesBreakdown" />
        <div v-if="nextClientIntel">
          <div style="font-size:0.75rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;margin-bottom:8px">Next Client Intel</div>
          <ClientIntelCard :client="nextClientIntel" />
        </div>
      </div>
    </div>
    <StaffPerformanceTable :staff="store.staffPerformance" />
  </div>
</template>
