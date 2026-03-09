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
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">
    <!-- Stats row -->
    <div class="app-enter app-d1">
      <StatsCards :stats="store.stats" />
    </div>

    <!-- Main grid -->
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px">
      <!-- Schedule timeline -->
      <div class="app-card app-enter app-d2" style="padding:20px">
        <div class="app-section-label" style="margin-bottom:16px">Today's Schedule</div>
        <ScheduleTimeline :schedule="store.schedule" />
      </div>

      <!-- Right column -->
      <div style="display:flex;flex-direction:column;gap:16px">
        <div class="app-card app-enter app-d3" style="padding:20px">
          <div class="app-section-label" style="margin-bottom:16px">Waiting Area</div>
          <WaitingArea :clients="store.waitingArea" />
        </div>

        <div class="app-card app-enter app-d4" style="padding:20px">
          <div class="app-section-label" style="margin-bottom:16px">Services Breakdown</div>
          <ServicesDonut :services="store.servicesBreakdown" />
        </div>

        <div v-if="nextClientIntel" class="app-card app-enter app-d5" style="padding:20px">
          <div class="app-section-label" style="margin-bottom:12px">Next Client Intel</div>
          <ClientIntelCard :client="nextClientIntel" />
        </div>
      </div>
    </div>

    <!-- Staff performance -->
    <div class="app-card app-enter app-d6" style="padding:0;overflow:hidden">
      <div style="padding:20px 20px 0">
        <div class="app-section-label" style="margin-bottom:16px">Staff Performance</div>
      </div>
      <StaffPerformanceTable :staff="store.staffPerformance" />
    </div>
  </div>
</template>
