<script setup>
import { ref, computed } from 'vue'
import { useClientsStore } from '../../../stores/clients'
import { useStaffStore } from '../../../stores/staff'

const clientsStore = useClientsStore()
const staffStore = useStaffStore()

const searchQuery = ref('')

const filtered = computed(() => {
  if (!searchQuery.value) return clientsStore.clients
  const q = searchQuery.value.toLowerCase()
  return clientsStore.clients.filter(c => c.name.toLowerCase().includes(q) || c.preferredService.toLowerCase().includes(q))
})

const recentCheckins = computed(() => staffStore.schedule.slice(0, 5))

function planBadgeStyle(plan) {
  if (plan === 'vip') return 'background:rgba(232,232,232,0.1);color:#e8e8e8;border:1px solid rgba(232,232,232,0.3)'
  if (plan === 'premium') return 'background:rgba(201,168,76,0.15);color:#c9a84c;border:1px solid rgba(201,168,76,0.3)'
  return 'background:rgba(168,184,200,0.1);color:#a8b8c8;border:1px solid rgba(168,184,200,0.3)'
}

function quickCheckin(client) {
  staffStore.waitingArea.push({
    id: Date.now(),
    name: client.name.split(' ')[0] + ' ' + client.name.split(' ')[1]?.[0] + '.',
    service: client.preferredService,
    wait: '5 min',
    type: 'member',
  })
}
</script>
<template>
  <div class="p-6 font-inter">
    <!-- Search -->
    <div class="relative mb-6">
      <i class="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-base"></i>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search clients..."
        style="width:100%;background:#111;border:1px solid #2a2a2a;color:#e5e7eb;font-size:0.9rem;padding:12px 16px 12px 44px;border-radius:10px;outline:none;font-family:'Inter',sans-serif;transition:border-color 0.2s"
        @focus="e => e.target.style.borderColor='#b8960c'"
        @blur="e => e.target.style.borderColor='#2a2a2a'"
      />
    </div>

    <!-- Recent check-ins -->
    <div class="mb-6">
      <div class="mb-3" style="font-size:0.85rem;font-weight:700;color:#e5e7eb">Recent Check-ins</div>
      <div class="flex gap-3 overflow-x-auto pb-2">
        <div
          v-for="appt in recentCheckins"
          :key="appt.id"
          class="flex-shrink-0 p-3 rounded-xl"
          style="background:#111;border:1px solid #1a1a1a;min-width:160px"
        >
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black mb-2" style="background:linear-gradient(135deg,#b8960c,#8a7009)">
            {{ appt.client.split(' ').map(n => n[0]).join('') }}
          </div>
          <div style="font-size:0.8rem;font-weight:600;color:#e5e7eb">{{ appt.client }}</div>
          <div style="font-size:0.7rem;color:#6b7280;margin-top:2px">{{ appt.time }}</div>
          <div style="font-size:0.7rem;color:#9ca3af;margin-top:1px">{{ appt.service }}</div>
        </div>
      </div>
    </div>

    <!-- Client list -->
    <div>
      <div class="mb-3" style="font-size:0.85rem;font-weight:700;color:#e5e7eb">All Clients ({{ filtered.length }})</div>
      <div class="space-y-2">
        <div
          v-for="client in filtered"
          :key="client.id"
          class="flex items-center justify-between p-4 rounded-xl"
          style="background:#111;border:1px solid #1a1a1a"
        >
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0" style="background:linear-gradient(135deg,#b8960c,#8a7009)">{{ client.initials }}</div>
            <div>
              <div class="flex items-center gap-2">
                <span style="font-size:0.85rem;font-weight:600;color:#e5e7eb">{{ client.name }}</span>
                <span class="text-xs px-2 py-0.5 rounded-full font-medium" :style="planBadgeStyle(client.plan)">{{ client.plan }}</span>
              </div>
              <div style="font-size:0.75rem;color:#6b7280;margin-top:1px">{{ client.preferredService }} · {{ client.preferredBarber }}</div>
              <div v-if="client.notes" style="font-size:0.72rem;color:#4b5563;margin-top:2px;max-width:400px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ client.notes }}</div>
            </div>
          </div>
          <button
            @click="quickCheckin(client)"
            style="font-size:0.75rem;font-weight:600;background:rgba(184,150,12,0.15);color:#b8960c;border:1px solid rgba(184,150,12,0.3);padding:6px 14px;border-radius:8px;cursor:pointer;white-space:nowrap"
          >Quick Check-in</button>
        </div>
      </div>
    </div>
  </div>
</template>
