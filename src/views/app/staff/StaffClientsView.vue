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

function planBadgeClass(plan) {
  if (plan === 'vip') return 'app-badge vip'
  if (plan === 'premium') return 'app-badge gold'
  return 'app-badge blue'
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
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">
    <!-- Search -->
    <div style="position:relative">
      <i class="ph ph-magnifying-glass" style="position:absolute;left:16px;top:50%;transform:translateY(-50%);color:var(--app-text-muted);font-size:1rem"></i>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search clients..."
        style="width:100%;background:var(--app-surface);border:1px solid var(--app-border);color:var(--app-text);font-size:0.9rem;padding:12px 16px 12px 44px;border-radius:10px;outline:none;font-family:'Inter',sans-serif;transition:border-color 0.2s;box-sizing:border-box"
        @focus="e => e.target.style.borderColor='var(--app-gold)'"
        @blur="e => e.target.style.borderColor='var(--app-border)'"
      />
    </div>

    <!-- Recent check-ins -->
    <div>
      <div class="app-section-label" style="margin-bottom:12px">Recent Check-ins</div>
      <div style="display:flex;gap:12px;overflow-x:auto;padding-bottom:8px">
        <div
          v-for="appt in recentCheckins"
          :key="appt.id"
          class="app-card lift"
          style="padding:16px 20px;flex-shrink:0;min-width:160px"
        >
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black mb-2" style="background:linear-gradient(135deg,var(--app-gold),#8a7009)">
            {{ appt.client.split(' ').map(n => n[0]).join('') }}
          </div>
          <div style="font-size:0.8rem;font-weight:600;color:var(--app-text)">{{ appt.client }}</div>
          <div style="font-size:0.7rem;color:var(--app-text-muted);margin-top:2px">{{ appt.time }}</div>
          <div style="font-size:0.7rem;color:var(--app-text-dim);margin-top:1px">{{ appt.service }}</div>
        </div>
      </div>
    </div>

    <!-- Client list table -->
    <div class="app-card app-enter" style="padding:0;overflow:hidden">
      <div style="padding:20px 20px 0">
        <div class="app-section-label" style="margin-bottom:16px">All Clients ({{ filtered.length }})</div>
      </div>
      <table class="app-table w-full">
        <thead>
          <tr>
            <th class="text-left">Client</th>
            <th class="text-left">Plan</th>
            <th class="text-left">Preferred Service</th>
            <th class="text-left">Barber</th>
            <th class="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in filtered" :key="client.id">
            <td>
              <div class="person-badge">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0" style="background:linear-gradient(135deg,var(--app-gold),#8a7009)">{{ client.initials }}</div>
                <div>
                  <div style="font-size:0.85rem;font-weight:600;color:var(--app-text)">{{ client.name }}</div>
                  <div v-if="client.notes" style="font-size:0.72rem;color:var(--app-text-muted);max-width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ client.notes }}</div>
                </div>
              </div>
            </td>
            <td><span :class="planBadgeClass(client.plan)">{{ client.plan }}</span></td>
            <td style="font-size:0.8rem;color:var(--app-text-dim)">{{ client.preferredService }}</td>
            <td style="font-size:0.8rem;color:var(--app-text-muted)">{{ client.preferredBarber }}</td>
            <td class="text-right">
              <button class="app-btn ghost" style="padding:5px 12px;font-size:0.75rem" @click="quickCheckin(client)">Quick Check-in</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
