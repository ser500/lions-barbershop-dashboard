<script setup>
import { ref, computed } from 'vue'
import { useClientsStore } from '../../../stores/clients'

const store = useClientsStore()

const selectedClient = ref(null)
const editingNote = ref(false)
const noteText = ref('')
const searchQuery = ref('')

const myClients = computed(() =>
  store.clients.filter(c => c.preferredBarber.toLowerCase().includes('devon'))
)

const filteredClients = computed(() => {
  if (!searchQuery.value.trim()) return myClients.value
  const q = searchQuery.value.toLowerCase()
  return myClients.value.filter(c =>
    c.name.toLowerCase().includes(q) || c.preferredService.toLowerCase().includes(q)
  )
})

function planBadgeClass(plan) {
  if (plan === 'vip') return 'app-badge vip'
  if (plan === 'premium') return 'app-badge gold'
  return 'app-badge blue'
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
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">

    <!-- Header -->
    <div class="app-card app-enter" style="padding:20px">
      <div style="font-size:1.3rem;font-weight:700;color:var(--app-text);margin-bottom:4px">My Regulars</div>
      <div style="font-size:0.8rem;color:var(--app-text-dim)">{{ myClients.length }} clients who prefer you</div>
    </div>

    <!-- Search -->
    <div style="position:relative">
      <i class="ph ph-magnifying-glass" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--app-text-muted);font-size:1rem;pointer-events:none"></i>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search clients..."
        style="background:var(--app-surface);border:1px solid var(--app-border);border-radius:8px;padding:10px 14px 10px 38px;color:var(--app-text);font-size:0.875rem;width:100%;outline:none;font-family:'Inter',sans-serif;box-sizing:border-box"
      />
    </div>

    <!-- Client list -->
    <div
      v-for="(client, i) in filteredClients"
      :key="client.id"
      class="app-card lift app-enter"
      :class="`app-d${Math.min(i + 1, 7)}`"
      style="padding:16px 20px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:12px"
      @click="openClient(client)"
    >
      <div style="display:flex;align-items:center;gap:12px">
        <div class="person-badge">
          <div
            style="width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;color:#060810;flex-shrink:0;background:linear-gradient(135deg,var(--app-gold),rgba(201,168,76,0.5))"
          >{{ client.initials }}</div>
          <span style="font-size:0.9rem;font-weight:700;color:var(--app-text)">{{ client.name }}</span>
          <span :class="planBadgeClass(client.plan)">{{ client.plan }}</span>
        </div>
        <div style="font-size:0.8rem;color:var(--app-text-dim)">Last visit: {{ client.daysSince }}d ago &middot; {{ client.visits }} visits &middot; {{ client.preferredService }}</div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-size:0.9rem;font-weight:700;color:var(--app-gold)">${{ client.totalSpend.toLocaleString() }}</div>
        <div style="font-size:0.72rem;color:var(--app-text-muted)">total spent</div>
      </div>
    </div>

    <!-- Client detail panel -->
    <div
      v-if="selectedClient"
      class="fixed inset-0 flex items-center justify-center z-50 px-4"
      style="background:rgba(0,0,0,0.7)"
      @click.self="selectedClient = null"
    >
      <div
        class="app-card"
        style="width:100%;max-width:440px;max-height:85vh;overflow-y:auto;padding:0"
      >
        <!-- Panel header -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--app-border)">
          <div style="display:flex;align-items:center;gap:12px">
            <div
              style="width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;color:#060810;background:linear-gradient(135deg,var(--app-gold),rgba(201,168,76,0.5));flex-shrink:0"
            >{{ selectedClient.initials }}</div>
            <div>
              <div style="font-size:1rem;font-weight:700;color:var(--app-text)">{{ selectedClient.name }}</div>
              <div style="font-size:0.78rem;color:var(--app-text-dim)">{{ selectedClient.preferredService }}</div>
            </div>
          </div>
          <button @click="selectedClient = null" style="color:var(--app-text-muted);background:transparent;border:none;font-size:1.3rem;cursor:pointer;line-height:1">&times;</button>
        </div>

        <!-- Stats -->
        <div style="padding:20px 24px;display:flex;flex-direction:column;gap:16px">
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
            <div style="background:var(--app-surface-2);border:1px solid var(--app-border-dim);border-radius:8px;padding:12px;text-align:center">
              <div style="font-size:1rem;font-weight:700;color:var(--app-gold)">{{ selectedClient.visits }}</div>
              <div style="font-size:0.7rem;color:var(--app-text-muted);margin-top:2px">Visits</div>
            </div>
            <div style="background:var(--app-surface-2);border:1px solid var(--app-border-dim);border-radius:8px;padding:12px;text-align:center">
              <div style="font-size:1rem;font-weight:700;color:var(--app-gold)">${{ selectedClient.totalSpend.toLocaleString() }}</div>
              <div style="font-size:0.7rem;color:var(--app-text-muted);margin-top:2px">Total</div>
            </div>
            <div style="background:var(--app-surface-2);border:1px solid var(--app-border-dim);border-radius:8px;padding:12px;text-align:center">
              <div style="font-size:1rem;font-weight:700;color:var(--app-gold)">{{ selectedClient.daysSince }}d</div>
              <div style="font-size:0.7rem;color:var(--app-text-muted);margin-top:2px">Last Visit</div>
            </div>
          </div>

          <!-- Style notes -->
          <div style="background:var(--app-surface-2);border:1px solid var(--app-border-dim);border-radius:10px;padding:16px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
              <span class="app-section-label" style="margin:0">Style Notes</span>
              <button
                @click="editingNote = !editingNote"
                style="font-size:0.78rem;color:var(--app-gold);background:transparent;border:none;cursor:pointer;font-family:'Inter',sans-serif"
              >{{ editingNote ? 'Cancel' : 'Edit' }}</button>
            </div>
            <textarea
              v-if="editingNote"
              v-model="noteText"
              rows="3"
              style="width:100%;background:var(--app-surface);border:1px solid var(--app-border);color:var(--app-text);font-size:0.83rem;padding:10px 12px;border-radius:8px;outline:none;font-family:'Inter',sans-serif;resize:vertical;box-sizing:border-box"
            ></textarea>
            <div
              v-else
              style="font-size:0.83rem;color:var(--app-text-dim);line-height:1.5"
            >{{ selectedClient.notes }}</div>
            <button
              v-if="editingNote"
              @click="saveNote"
              class="app-btn primary"
              style="margin-top:10px"
            >Save</button>
          </div>

          <!-- Upsell suggestion -->
          <div
            v-if="selectedClient.suggestedUpsell"
            style="font-size:0.8rem;color:var(--app-gold);font-style:italic;padding:10px 12px;background:rgba(201,168,76,0.05);border:1px solid rgba(201,168,76,0.15);border-radius:8px"
          >
            <i class="ph ph-trend-up" style="margin-right:4px"></i>{{ selectedClient.suggestedUpsell }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
