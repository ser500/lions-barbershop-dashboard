import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useLocationStore = defineStore('location', () => {
  const locations = ref([
    { id: 'loc-1', name: 'Downtown',     city: 'Austin', status: 'open',        managerName: 'Devon R.',  barberCount: 4, revenue: 18420, appts: 142 },
    { id: 'loc-2', name: 'East Side',    city: 'Austin', status: 'open',        managerName: 'Marcus V.', barberCount: 3, revenue: 12380, appts: 98 },
    { id: 'loc-3', name: 'North Campus', city: 'Austin', status: 'coming-soon', managerName: null,        barberCount: 0, revenue: 0,     appts: 0 },
  ])
  const activeLocationId = ref('loc-1')
  const activeLocation = computed(() => locations.value.find(l => l.id === activeLocationId.value))
  function setActive(id) { activeLocationId.value = id }
  return { locations, activeLocationId, activeLocation, setActive }
})
