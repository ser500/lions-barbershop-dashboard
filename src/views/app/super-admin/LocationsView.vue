<script setup>
import { ref } from 'vue'
import { useLocationStore } from '../../../stores/location'

const locationStore = useLocationStore()

const showAddModal = ref(false)
const newLoc = ref({ name: '', city: '', manager: '' })

function submitAdd() {
  showAddModal.value = false
  newLoc.value = { name: '', city: '', manager: '' }
}

const comparisonData = [
  { name: 'Downtown',  revMtd: 18420, vsLast: '+12%', appts: 142, newClients: 11, subscribers: 6 },
  { name: 'East Side', revMtd: 12380, vsLast: '+4%',  appts: 98,  newClients: 7,  subscribers: 4 },
]

const sortKey = ref('revMtd')
</script>
<template>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">
    <!-- Header row -->
    <div class="flex items-center justify-between">
      <div>
        <div style="font-size:1.1rem;font-weight:700;color:var(--app-text)">Locations</div>
        <div style="font-size:0.78rem;color:var(--app-text-muted);margin-top:2px">Manage all shop locations</div>
      </div>
      <button class="app-btn primary" @click="showAddModal = true">
        <i class="ph ph-plus"></i>
        Add Location
      </button>
    </div>

    <!-- Location cards -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
      <div
        v-for="(loc, i) in locationStore.locations"
        :key="loc.id"
        class="app-card lift app-enter"
        :class="`app-d${i + 1}`"
        style="padding:20px"
        :style="loc.status === 'coming-soon' ? 'opacity:0.6' : ''"
      >
        <div class="flex items-center justify-between" style="margin-bottom:12px">
          <div style="font-size:1rem;font-weight:700;color:var(--app-text)">{{ loc.name }}</div>
          <span v-if="loc.status === 'open'" class="app-badge green">Open</span>
          <span v-else class="app-badge amber">Coming Soon</span>
        </div>
        <div style="font-size:0.78rem;color:var(--app-text-dim);margin-bottom:4px">{{ loc.city }}</div>

        <template v-if="loc.status !== 'coming-soon'">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px;margin-bottom:16px">
            <div style="background:var(--app-surface-2);border:1px solid var(--app-border-dim);border-radius:8px;padding:10px">
              <div style="font-size:0.7rem;color:var(--app-text-muted);margin-bottom:2px">Revenue MTD</div>
              <div style="font-size:0.8rem;font-weight:600;color:var(--app-gold)">${{ loc.revenue.toLocaleString() }}</div>
            </div>
            <div style="background:var(--app-surface-2);border:1px solid var(--app-border-dim);border-radius:8px;padding:10px">
              <div style="font-size:0.7rem;color:var(--app-text-muted);margin-bottom:2px">Appts MTD</div>
              <div style="font-size:0.8rem;font-weight:600;color:var(--app-text)">{{ loc.appts }}</div>
            </div>
            <div style="background:var(--app-surface-2);border:1px solid var(--app-border-dim);border-radius:8px;padding:10px">
              <div style="font-size:0.7rem;color:var(--app-text-muted);margin-bottom:2px">Barbers</div>
              <div style="font-size:0.8rem;font-weight:600;color:var(--app-text)">{{ loc.barberCount }}</div>
            </div>
            <div style="background:var(--app-surface-2);border:1px solid var(--app-border-dim);border-radius:8px;padding:10px">
              <div style="font-size:0.7rem;color:var(--app-text-muted);margin-bottom:2px">Manager</div>
              <div style="font-size:0.78rem;font-weight:600;color:var(--app-text-dim)">{{ loc.managerName }}</div>
            </div>
          </div>
          <button class="app-btn ghost" style="width:100%;justify-content:center">Manage Location</button>
        </template>
        <template v-else>
          <div style="margin-top:24px;text-align:center;font-size:0.78rem;color:var(--app-text-muted)">Opening Soon</div>
        </template>
      </div>
    </div>

    <!-- Comparison table -->
    <div class="app-card app-enter" style="padding:0;overflow:hidden">
      <div style="padding:20px 20px 0">
        <div class="app-section-label" style="margin-bottom:16px">Location Comparison</div>
      </div>
      <table class="app-table w-full">
        <thead>
          <tr>
            <th class="text-left cursor-pointer" @click="sortKey = 'name'">Location</th>
            <th class="text-right cursor-pointer" @click="sortKey = 'revMtd'">Revenue MTD</th>
            <th class="text-right">vs Last</th>
            <th class="text-right cursor-pointer" @click="sortKey = 'appts'">Appts</th>
            <th class="text-right">New Clients</th>
            <th class="text-right">Subscribers</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in comparisonData" :key="row.name">
            <td style="font-size:0.83rem;font-weight:600;color:var(--app-text)">{{ row.name }}</td>
            <td class="text-right" style="font-size:0.83rem;color:var(--app-gold);font-weight:600">${{ row.revMtd.toLocaleString() }}</td>
            <td class="text-right" style="font-size:0.83rem;color:var(--app-green)">{{ row.vsLast }}</td>
            <td class="text-right" style="font-size:0.83rem;color:var(--app-text-muted)">{{ row.appts }}</td>
            <td class="text-right" style="font-size:0.83rem;color:var(--app-text-muted)">{{ row.newClients }}</td>
            <td class="text-right" style="font-size:0.83rem;color:var(--app-text-muted)">{{ row.subscribers }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Location Modal -->
    <div v-if="showAddModal" class="fixed inset-0 flex items-center justify-center z-50" style="background:rgba(0,0,0,0.7)">
      <div style="background:var(--app-surface-2);border:1px solid var(--app-border);border-radius:12px;padding:28px;width:100%;max-width:420px">
        <div class="flex items-center justify-between" style="margin-bottom:20px">
          <div style="font-size:1rem;font-weight:700;color:var(--app-text)">Add New Location</div>
          <button @click="showAddModal = false" style="color:var(--app-text-muted);background:transparent;border:none;font-size:1.2rem;cursor:pointer">×</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:16px">
          <div>
            <label style="font-size:0.78rem;font-weight:600;color:var(--app-text-dim);margin-bottom:6px;display:block">Location Name</label>
            <input v-model="newLoc.name" type="text" placeholder="e.g. North Campus" style="width:100%;background:var(--app-surface-2);border:1px solid var(--app-border);border-radius:8px;padding:10px 14px;color:var(--app-text);font-size:0.875rem;outline:none;font-family:'Inter',sans-serif;box-sizing:border-box" />
          </div>
          <div>
            <label style="font-size:0.78rem;font-weight:600;color:var(--app-text-dim);margin-bottom:6px;display:block">City</label>
            <input v-model="newLoc.city" type="text" placeholder="e.g. Austin" style="width:100%;background:var(--app-surface-2);border:1px solid var(--app-border);border-radius:8px;padding:10px 14px;color:var(--app-text);font-size:0.875rem;outline:none;font-family:'Inter',sans-serif;box-sizing:border-box" />
          </div>
          <div>
            <label style="font-size:0.78rem;font-weight:600;color:var(--app-text-dim);margin-bottom:6px;display:block">Manager</label>
            <input v-model="newLoc.manager" type="text" placeholder="Manager name" style="width:100%;background:var(--app-surface-2);border:1px solid var(--app-border);border-radius:8px;padding:10px 14px;color:var(--app-text);font-size:0.875rem;outline:none;font-family:'Inter',sans-serif;box-sizing:border-box" />
          </div>
        </div>
        <div class="flex gap-3" style="margin-top:24px">
          <button @click="showAddModal = false" class="app-btn ghost" style="flex:1;justify-content:center">Cancel</button>
          <button @click="submitAdd" class="app-btn primary" style="flex:1;justify-content:center">Add Location</button>
        </div>
      </div>
    </div>
  </div>
</template>
