<script setup>
import { ref } from 'vue'
import StaffSidebar from '../../components/staff/StaffSidebar.vue'
import StaffHeader from '../../components/staff/StaffHeader.vue'
import NewApptModal from '../../components/staff/NewApptModal.vue'

const showModal = ref(false)
</script>

<template>
  <div class="w-full h-screen flex overflow-hidden font-inter" style="background:#050505">
    <StaffSidebar />
    <main class="flex-1 flex flex-col h-full overflow-hidden" style="background:#0a0a0a">
      <StaffHeader @open-new-appt="showModal = true" />
      <div class="flex-1 overflow-y-auto">
        <RouterView />
      </div>
    </main>
    <NewApptModal v-model="showModal" />
  </div>
</template>
