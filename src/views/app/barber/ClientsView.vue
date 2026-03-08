<script setup>
import { ref, computed } from 'vue'
import { useClientsStore } from '../../../stores/clients'

const store = useClientsStore()

const selectedClient = ref(null)
const editingNote = ref(false)
const noteText = ref('')

const myClients = computed(() =>
  store.clients.filter(c => c.preferredBarber.toLowerCase().includes('devon'))
)

function planBadgeStyle(plan) {
  if (plan === 'vip') return 'background:rgba(232,232,232,0.1);color:#e8e8e8;border:1px solid rgba(232,232,232,0.3)'
  if (plan === 'premium') return 'background:rgba(201,168,76,0.15);color:#c9a84c;border:1px solid rgba(201,168,76,0.3)'
  return 'background:rgba(168,184,200,0.1);color:#a8b8c8;border:1px solid rgba(168,184,200,0.3)'
}

function openClient(c) {
  selectedClient.value = c
  noteText.value = c.notes
  editingNote.value = false
}

function saveNote() {
  if (selectedClient.value) selectedClient.value.notes = noteText.value
  editingNote.value = false
}
</script>
<template>
  <div class="p-6 font-inter">
    <div class="mb-5">
      <div style="font-size:1.1rem;font-weight:700;color:#e5e7eb">My Regulars</div>
      <div style="font-size:0.78rem;color:#6b7280;margin-top:2px">{{ myClients.length }} clients who prefer you</div>
    </div>

    <div class="space-y-3">
      <div
        v-for="client in myClients"
        :key="client.id"
        class="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all"
        style="background:#111;border:1px solid #1a1a1a"
        @click="openClient(client)"
        @mouseenter="e => { e.currentTarget.style.borderColor='rgba(184,150,12,0.3)'; e.currentTarget.style.background='rgba(184,150,12,0.03)' }"
        @mouseleave="e => { e.currentTarget.style.borderColor='#1a1a1a'; e.currentTarget.style.background='#111' }"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-black flex-shrink-0" style="background:linear-gradient(135deg,#b8960c,#8a7009)">{{ client.initials }}</div>
          <div>
            <div class="flex items-center gap-2">
              <span style="font-size:0.9rem;font-weight:700;color:#e5e7eb">{{ client.name }}</span>
              <span class="text-xs px-2 py-0.5 rounded-full font-medium" :style="planBadgeStyle(client.plan)">{{ client.plan }}</span>
            </div>
            <div style="font-size:0.75rem;color:#6b7280;margin-top:1px">Last visit: {{ client.daysSince }}d ago · {{ client.visits }} total visits · {{ client.preferredService }}</div>
          </div>
        </div>
        <div class="text-right">
          <div style="font-size:0.9rem;font-weight:700;color:#b8960c">${{ client.totalSpend.toLocaleString() }}</div>
          <div style="font-size:0.7rem;color:#6b7280">total spent</div>
        </div>
      </div>
    </div>

    <!-- Client detail panel -->
    <div v-if="selectedClient" class="fixed inset-0 flex items-center justify-center z-50 px-4" style="background:rgba(0,0,0,0.7)" @click.self="selectedClient = null">
      <div class="rounded-xl w-full max-w-md overflow-hidden" style="background:#111;border:1px solid #2a2a2a;max-height:85vh;overflow-y:auto">
        <div class="flex items-center justify-between px-6 py-5" style="border-bottom:1px solid #1a1a1a">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-black" style="background:linear-gradient(135deg,#b8960c,#8a7009)">{{ selectedClient.initials }}</div>
            <div>
              <div style="font-size:1rem;font-weight:700;color:#e5e7eb">{{ selectedClient.name }}</div>
              <div style="font-size:0.75rem;color:#6b7280">{{ selectedClient.preferredService }}</div>
            </div>
          </div>
          <button @click="selectedClient = null" style="color:#6b7280;background:transparent;border:none;font-size:1.2rem;cursor:pointer">×</button>
        </div>
        <div class="px-6 py-5 space-y-4">
          <div class="grid grid-cols-3 gap-3">
            <div class="p-3 rounded-lg text-center" style="background:#0f0f0f;border:1px solid #1e1e1e">
              <div style="font-size:1rem;font-weight:700;color:#b8960c">{{ selectedClient.visits }}</div>
              <div style="font-size:0.68rem;color:#6b7280">Visits</div>
            </div>
            <div class="p-3 rounded-lg text-center" style="background:#0f0f0f;border:1px solid #1e1e1e">
              <div style="font-size:1rem;font-weight:700;color:#b8960c">${{ selectedClient.totalSpend.toLocaleString() }}</div>
              <div style="font-size:0.68rem;color:#6b7280">Total</div>
            </div>
            <div class="p-3 rounded-lg text-center" style="background:#0f0f0f;border:1px solid #1e1e1e">
              <div style="font-size:1rem;font-weight:700;color:#b8960c">{{ selectedClient.daysSince }}d</div>
              <div style="font-size:0.68rem;color:#6b7280">Last Visit</div>
            </div>
          </div>

          <!-- Style notes -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span style="font-size:0.75rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Style Notes</span>
              <button @click="editingNote = !editingNote" style="font-size:0.72rem;color:#b8960c;background:transparent;border:none;cursor:pointer">{{ editingNote ? 'Cancel' : 'Edit' }}</button>
            </div>
            <textarea
              v-if="editingNote"
              v-model="noteText"
              rows="3"
              style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#e5e7eb;font-size:0.83rem;padding:10px 12px;border-radius:8px;outline:none;font-family:'Inter',sans-serif;resize:vertical"
            ></textarea>
            <div v-else style="background:#0f0f0f;border:1px solid #1e1e1e;border-radius:8px;padding:12px;font-size:0.83rem;color:#9ca3af;line-height:1.5">{{ selectedClient.notes }}</div>
            <button v-if="editingNote" @click="saveNote" class="mt-2 px-4 py-1.5 rounded-lg text-xs font-semibold text-black" style="background:linear-gradient(135deg,#b8960c,#8a7009);border:none;cursor:pointer">Save</button>
          </div>

          <!-- Upsell -->
          <div v-if="selectedClient.suggestedUpsell" style="font-size:0.8rem;color:#b8960c;font-style:italic;padding:10px 12px;background:rgba(184,150,12,0.05);border:1px solid rgba(184,150,12,0.15);border-radius:8px">
            <i class="ph ph-trend-up mr-1"></i>{{ selectedClient.suggestedUpsell }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
