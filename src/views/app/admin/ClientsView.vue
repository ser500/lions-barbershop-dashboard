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

function planBadgeClass(plan) {
  if (plan === 'vip') return 'vip'
  if (plan === 'premium') return 'gold'
  return 'blue'
}

function planLabel(plan) {
  return plan.charAt(0).toUpperCase() + plan.slice(1)
}

function lastVisitColor(daysSince) {
  if (daysSince < 30) return 'var(--app-green)'
  if (daysSince <= 60) return 'var(--app-amber)'
  return 'var(--app-red)'
}

function openClient(client) {
  selectedClient.value = client
  newNote.value = ''
}
</script>
<template>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">
    <!-- Search + filter row -->
    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
      <div style="position:relative;flex:1;min-width:200px">
        <i class="ph ph-magnifying-glass" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--app-text-muted);font-size:0.9rem"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search clients by name or barber..."
          style="width:100%;background:var(--app-surface);border:1px solid var(--app-border);color:var(--app-text);font-size:0.9rem;padding:10px 14px 10px 40px;border-radius:8px;outline:none;font-family:'Inter',sans-serif;transition:border-color 0.2s;box-sizing:border-box"
          @focus="e => e.target.style.borderColor='var(--app-gold)'"
          @blur="e => e.target.style.borderColor='var(--app-border)'"
        />
      </div>
      <div style="display:flex;gap:6px">
        <button
          v-for="tab in [{ id: 'all', label: 'All Clients' }, { id: 'vip-premium', label: 'Premium / VIP' }, { id: 'inactive', label: 'Inactive 60+' }]"
          :key="tab.id"
          class="app-btn"
          :class="activeTab === tab.id ? 'primary' : 'ghost'"
          @click="activeTab = tab.id"
          style="font-size:0.78rem;padding:7px 14px"
        >{{ tab.label }}</button>
      </div>
    </div>

    <!-- Inactive 60+ callout -->
    <div v-if="activeTab === 'inactive'" class="app-card app-enter" style="padding:14px 16px;border-left:3px solid var(--app-amber);display:flex;align-items:center;gap:10px">
      <i class="ph ph-clock-countdown" style="color:var(--app-amber);font-size:1rem;flex-shrink:0"></i>
      <span style="font-size:0.83rem;color:var(--app-text-dim)">Showing clients inactive for 60+ days. Consider sending a win-back offer.</span>
    </div>

    <!-- Clients table -->
    <div class="app-card app-enter" style="padding:0;overflow:hidden">
      <table class="app-table" style="width:100%">
        <thead>
          <tr>
            <th style="text-align:left;padding:12px 20px">Client</th>
            <th style="text-align:center;padding:12px 16px">Plan</th>
            <th style="text-align:right;padding:12px 16px">Last Visit</th>
            <th style="text-align:right;padding:12px 16px">Visits</th>
            <th style="text-align:right;padding:12px 16px">Total Spend</th>
            <th style="text-align:left;padding:12px 16px">Barber</th>
            <th v-if="activeTab === 'inactive'" style="text-align:center;padding:12px 16px">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="client in filtered"
            :key="client.id"
            style="cursor:pointer"
            @click="openClient(client)"
            @mouseenter="e => e.currentTarget.style.background='rgba(201,168,76,0.04)'"
            @mouseleave="e => e.currentTarget.style.background='transparent'"
          >
            <td style="padding:12px 20px">
              <div class="person-badge">
                <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--app-gold),#8a7009);display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:700;color:#000;flex-shrink:0">{{ client.initials }}</div>
                <span style="font-size:0.85rem;font-weight:600;color:var(--app-text)">{{ client.name }}</span>
              </div>
            </td>
            <td style="padding:12px 16px;text-align:center">
              <span class="app-badge" :class="planBadgeClass(client.plan)">{{ planLabel(client.plan) }}</span>
            </td>
            <td style="padding:12px 16px;text-align:right;font-size:0.8rem;font-weight:600" :style="{ color: lastVisitColor(client.daysSince) }">{{ client.daysSince }}d ago</td>
            <td style="padding:12px 16px;text-align:right;font-size:0.8rem;color:var(--app-text-muted)">{{ client.visits }}</td>
            <td style="padding:12px 16px;text-align:right;font-size:0.8rem;font-weight:700;color:var(--app-gold)">${{ client.totalSpend.toLocaleString() }}</td>
            <td style="padding:12px 16px;font-size:0.8rem;color:var(--app-text-muted)">{{ client.preferredBarber }}</td>
            <td v-if="activeTab === 'inactive'" style="padding:12px 16px;text-align:center">
              <button @click.stop class="app-btn ghost" style="font-size:0.72rem;padding:4px 10px">Send Win-back</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Client detail modal -->
    <div v-if="selectedClient" class="fixed inset-0 flex items-center justify-center z-50 px-4" style="background:rgba(0,0,0,0.7)" @click.self="selectedClient = null">
      <div style="background:var(--app-surface-2);border:1px solid var(--app-border);border-radius:12px;padding:0;width:100%;max-width:480px;max-height:85vh;overflow-y:auto">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--app-border)">
          <div style="display:flex;align-items:center;gap:12px">
            <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--app-gold),#8a7009);display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;color:#000">{{ selectedClient.initials }}</div>
            <div>
              <div style="font-size:1rem;font-weight:700;color:var(--app-text)">{{ selectedClient.name }}</div>
              <div style="font-size:0.75rem;color:var(--app-text-muted)">{{ selectedClient.preferredBarber }} · {{ selectedClient.preferredService }}</div>
            </div>
          </div>
          <button @click="selectedClient = null" style="color:var(--app-text-muted);background:transparent;border:none;font-size:1.2rem;cursor:pointer">×</button>
        </div>
        <div style="padding:20px 24px;display:flex;flex-direction:column;gap:16px">
          <!-- Stats row -->
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
            <div style="padding:12px;border-radius:8px;text-align:center;background:var(--app-surface);border:1px solid var(--app-border-dim)">
              <div style="font-size:1rem;font-weight:700;color:var(--app-gold)">{{ selectedClient.visits }}</div>
              <div style="font-size:0.68rem;color:var(--app-text-muted)">Total Visits</div>
            </div>
            <div style="padding:12px;border-radius:8px;text-align:center;background:var(--app-surface);border:1px solid var(--app-border-dim)">
              <div style="font-size:1rem;font-weight:700;color:var(--app-gold)">${{ selectedClient.totalSpend.toLocaleString() }}</div>
              <div style="font-size:0.68rem;color:var(--app-text-muted)">Total Spent</div>
            </div>
            <div style="padding:12px;border-radius:8px;text-align:center;background:var(--app-surface);border:1px solid var(--app-border-dim)">
              <div style="font-size:1rem;font-weight:700;color:var(--app-gold)">{{ selectedClient.daysSince }}d</div>
              <div style="font-size:0.68rem;color:var(--app-text-muted)">Since Last Visit</div>
            </div>
          </div>

          <!-- Client Intel Card -->
          <ClientIntelCard :client="selectedClient" />

          <!-- Add note -->
          <div>
            <label style="font-size:0.72rem;color:var(--app-text-muted);display:block;margin-bottom:4px">Add Note</label>
            <textarea
              v-model="newNote"
              rows="3"
              placeholder="Add a note about this client..."
              style="width:100%;background:var(--app-surface);border:1px solid var(--app-border);color:var(--app-text);font-size:0.83rem;padding:10px 12px;border-radius:8px;outline:none;font-family:'Inter',sans-serif;resize:vertical;box-sizing:border-box"
            ></textarea>
            <button class="app-btn primary" style="margin-top:8px;font-size:0.8rem;padding:7px 16px">Save Note</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
