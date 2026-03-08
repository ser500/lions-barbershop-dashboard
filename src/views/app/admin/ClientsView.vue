<script setup>
import { ref, computed } from 'vue'
import { useClientsStore } from '../../../stores/clients'
import ClientIntelCard from '../../../components/app/ClientIntelCard.vue'

const store = useClientsStore()

const searchQuery = ref('')
const activeTab = ref('all')
const selectedClient = ref(null)
const newNote = ref('')

const filtered = computed(() => {
  let list = store.clients
  if (activeTab.value === 'vip-premium') list = list.filter(c => c.plan === 'vip' || c.plan === 'premium')
  if (activeTab.value === 'inactive') list = list.filter(c => c.daysSince >= 60)
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(c => c.name.toLowerCase().includes(q) || c.preferredBarber.toLowerCase().includes(q))
  }
  return list
})

function planBadgeStyle(plan) {
  if (plan === 'vip') return 'background:rgba(232,232,232,0.1);color:#e8e8e8;border:1px solid rgba(232,232,232,0.3)'
  if (plan === 'premium') return 'background:rgba(201,168,76,0.15);color:#c9a84c;border:1px solid rgba(201,168,76,0.3)'
  return 'background:rgba(168,184,200,0.1);color:#a8b8c8;border:1px solid rgba(168,184,200,0.3)'
}

function planLabel(plan) {
  return plan.charAt(0).toUpperCase() + plan.slice(1)
}

function openClient(client) {
  selectedClient.value = client
  newNote.value = ''
}
</script>
<template>
  <div class="p-6 font-inter">
    <!-- Search -->
    <div class="relative mb-5">
      <i class="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-base"></i>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search clients by name or barber..."
        style="width:100%;background:#111;border:1px solid #2a2a2a;color:#e5e7eb;font-size:0.9rem;padding:12px 16px 12px 44px;border-radius:10px;outline:none;font-family:'Inter',sans-serif;transition:border-color 0.2s"
        @focus="e => e.target.style.borderColor='#b8960c'"
        @blur="e => e.target.style.borderColor='#2a2a2a'"
      />
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 mb-5 p-1 rounded-lg" style="background:#111;border:1px solid #1a1a1a;display:inline-flex">
      <button v-for="tab in [{ id: 'all', label: 'All Clients' }, { id: 'vip-premium', label: 'Premium / VIP' }, { id: 'inactive', label: 'Inactive 60+ days' }]" :key="tab.id"
        @click="activeTab = tab.id"
        class="px-4 py-1.5 rounded-md text-sm font-medium transition-all"
        :style="activeTab === tab.id ? 'background:rgba(184,150,12,0.15);color:#b8960c;border:1px solid rgba(184,150,12,0.3)' : 'color:#6b7280;border:1px solid transparent'"
      >{{ tab.label }}</button>
    </div>

    <!-- Client table -->
    <div class="rounded-xl overflow-hidden" style="background:#111;border:1px solid #1a1a1a">
      <table class="w-full" style="border-collapse:collapse">
        <thead>
          <tr style="border-bottom:1px solid #1a1a1a;background:#0f0f0f">
            <th class="text-left px-5 py-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Client</th>
            <th class="text-center px-4 py-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Plan</th>
            <th class="text-right px-4 py-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Last Visit</th>
            <th class="text-right px-4 py-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Visits</th>
            <th class="text-right px-4 py-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Total Spend</th>
            <th class="text-left px-4 py-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Barber</th>
            <th v-if="activeTab === 'inactive'" class="text-center px-4 py-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="client in filtered"
            :key="client.id"
            class="cursor-pointer transition-all"
            style="border-bottom:1px solid #0f0f0f"
            @click="openClient(client)"
            @mouseenter="e => e.currentTarget.style.background='rgba(184,150,12,0.04)'"
            @mouseleave="e => e.currentTarget.style.background='transparent'"
          >
            <td class="px-5 py-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0" style="background:linear-gradient(135deg,#b8960c,#8a7009)">{{ client.initials }}</div>
                <span style="font-size:0.85rem;font-weight:600;color:#e5e7eb">{{ client.name }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-center">
              <span class="text-xs px-2 py-0.5 rounded-full font-medium" :style="planBadgeStyle(client.plan)">{{ planLabel(client.plan) }}</span>
            </td>
            <td class="px-4 py-3 text-right" style="font-size:0.8rem;" :style="{ color: client.daysSince > 30 ? '#ef4444' : '#9ca3af' }">{{ client.daysSince }}d ago</td>
            <td class="px-4 py-3 text-right" style="font-size:0.8rem;color:#9ca3af">{{ client.visits }}</td>
            <td class="px-4 py-3 text-right" style="font-size:0.8rem;color:#b8960c;font-weight:600">${{ client.totalSpend.toLocaleString() }}</td>
            <td class="px-4 py-3" style="font-size:0.8rem;color:#9ca3af">{{ client.preferredBarber }}</td>
            <td v-if="activeTab === 'inactive'" class="px-4 py-3 text-center">
              <button @click.stop style="font-size:0.72rem;background:rgba(184,150,12,0.15);color:#b8960c;border:1px solid rgba(184,150,12,0.3);padding:4px 10px;border-radius:6px;cursor:pointer">Send Win-back</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Client detail modal -->
    <div v-if="selectedClient" class="fixed inset-0 flex items-center justify-center z-50 px-4" style="background:rgba(0,0,0,0.7)" @click.self="selectedClient = null">
      <div class="rounded-xl w-full max-w-lg overflow-hidden" style="background:#111;border:1px solid #2a2a2a;max-height:85vh;overflow-y:auto">
        <div class="flex items-center justify-between px-6 py-5" style="border-bottom:1px solid #1a1a1a">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-black" style="background:linear-gradient(135deg,#b8960c,#8a7009)">{{ selectedClient.initials }}</div>
            <div>
              <div style="font-size:1rem;font-weight:700;color:#e5e7eb">{{ selectedClient.name }}</div>
              <div style="font-size:0.75rem;color:#6b7280">{{ selectedClient.preferredBarber }} · {{ selectedClient.preferredService }}</div>
            </div>
          </div>
          <button @click="selectedClient = null" style="color:#6b7280;background:transparent;border:none;font-size:1.2rem;cursor:pointer">×</button>
        </div>
        <div class="px-6 py-5 space-y-4">
          <!-- Stats row -->
          <div class="grid grid-cols-3 gap-3">
            <div class="p-3 rounded-lg text-center" style="background:#0f0f0f;border:1px solid #1e1e1e">
              <div style="font-size:1rem;font-weight:700;color:#b8960c">{{ selectedClient.visits }}</div>
              <div style="font-size:0.68rem;color:#6b7280">Total Visits</div>
            </div>
            <div class="p-3 rounded-lg text-center" style="background:#0f0f0f;border:1px solid #1e1e1e">
              <div style="font-size:1rem;font-weight:700;color:#b8960c">${{ selectedClient.totalSpend.toLocaleString() }}</div>
              <div style="font-size:0.68rem;color:#6b7280">Total Spent</div>
            </div>
            <div class="p-3 rounded-lg text-center" style="background:#0f0f0f;border:1px solid #1e1e1e">
              <div style="font-size:1rem;font-weight:700;color:#b8960c">{{ selectedClient.daysSince }}d</div>
              <div style="font-size:0.68rem;color:#6b7280">Since Last Visit</div>
            </div>
          </div>

          <!-- Client Intel Card -->
          <ClientIntelCard :client="selectedClient" />

          <!-- Add note -->
          <div>
            <label style="font-size:0.72rem;color:#6b7280;display:block;margin-bottom:4px">Add Note</label>
            <textarea
              v-model="newNote"
              rows="3"
              placeholder="Add a note about this client..."
              style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#e5e7eb;font-size:0.83rem;padding:10px 12px;border-radius:8px;outline:none;font-family:'Inter',sans-serif;resize:vertical"
            ></textarea>
            <button class="mt-2 px-4 py-1.5 rounded-lg text-xs font-semibold text-black" style="background:linear-gradient(135deg,#b8960c,#8a7009);border:none;cursor:pointer">Save Note</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
