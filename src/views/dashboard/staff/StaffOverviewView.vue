<script setup>
import { useStaffStore } from '../../../stores/staff'
import StatsCards from '../../../components/staff/StatsCards.vue'
import ScheduleTimeline from '../../../components/staff/ScheduleTimeline.vue'
import WaitingArea from '../../../components/staff/WaitingArea.vue'
import ServicesDonut from '../../../components/staff/ServicesDonut.vue'
import StaffPerformanceTable from '../../../components/staff/StaffPerformanceTable.vue'

const store = useStaffStore()
</script>

<template>
  <div class="font-inter">
    <StatsCards :stats="store.stats" />
    <div class="grid grid-cols-3 gap-6 px-6 mb-6">
      <ScheduleTimeline class="col-span-2" :schedule="store.schedule" />
      <div class="space-y-6">
        <WaitingArea :clients="store.waitingArea" />
        <ServicesDonut :services="store.servicesBreakdown" />
      </div>
    </div>
    <StaffPerformanceTable :staff="store.staffPerformance" />
  </div>
</template>
