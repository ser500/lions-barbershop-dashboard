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
  <div class="p-6 font-inter">
    <div class="flex items-center justify-between mb-6">
      <div>
        <div style="font-size:1.1rem;font-weight:700;color:#e5e7eb">Locations</div>
        <div style="font-size:0.78rem;color:#6b7280;margin-top:2px">Manage all shop locations</div>
      </div>
      <button
        @click="showAddModal = true"
        class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-black"
        style="background:linear-gradient(135deg,#b8960c,#8a7009)"
      >
        <i class="ph ph-plus text-sm"></i>
        Add Location
      </button>
    </div>

    <!-- Location cards -->
    <div class="grid grid-cols-3 gap-5 mb-8">
      <div v-for="loc in locationStore.locations" :key="loc.id" class="rounded-xl p-5" :style="loc.status === 'coming-soon' ? 'background:#0d0d0d;border:1px solid #1a1a1a;opacity:0.6' : 'background:#111;border:1px solid #1a1a1a'">
        <div class="flex items-center justify-between mb-3">
          <div style="font-size:1rem;font-weight:700;color:#e5e7eb">{{ loc.name }}</div>
          <span
            class="text-xs px-2 py-0.5 rounded-full font-medium"
            :style="loc.status === 'open'
              ? 'background:rgba(34,197,94,0.1);color:#22c55e;border:1px solid rgba(34,197,94,0.2)'
              : 'background:#1a1a1a;color:#6b7280;border:1px solid #2a2a2a'"
          >{{ loc.status === 'coming-soon' ? 'Coming Soon' : 'Open' }}</span>
        </div>
        <div style="font-size:0.8rem;color:#9ca3af;margin-bottom:3px">{{ loc.city }}</div>

        <template v-if="loc.status !== 'coming-soon'">
          <div class="grid grid-cols-2 gap-3 mt-4 mb-4">
            <div style="background:#0f0f0f;border:1px solid #1e1e1e;border-radius:8px;padding:10px">
              <div style="font-size:0.7rem;color:#6b7280;margin-bottom:2px">Manager</div>
              <div style="font-size:0.82rem;font-weight:600;color:#e5e7eb">{{ loc.managerName }}</div>
            </div>
            <div style="background:#0f0f0f;border:1px solid #1e1e1e;border-radius:8px;padding:10px">
              <div style="font-size:0.7rem;color:#6b7280;margin-bottom:2px">Barbers</div>
              <div style="font-size:0.82rem;font-weight:600;color:#e5e7eb">{{ loc.barberCount }}</div>
            </div>
            <div style="background:#0f0f0f;border:1px solid #1e1e1e;border-radius:8px;padding:10px">
              <div style="font-size:0.7rem;color:#6b7280;margin-bottom:2px">Revenue MTD</div>
              <div style="font-size:0.82rem;font-weight:600;color:#b8960c">${{ loc.revenue.toLocaleString() }}</div>
            </div>
            <div style="background:#0f0f0f;border:1px solid #1e1e1e;border-radius:8px;padding:10px">
              <div style="font-size:0.7rem;color:#6b7280;margin-bottom:2px">Appts MTD</div>
              <div style="font-size:0.82rem;font-weight:600;color:#e5e7eb">{{ loc.appts }}</div>
            </div>
          </div>
          <button class="w-full py-2 rounded-lg text-xs font-semibold transition-all" style="background:transparent;border:1px solid rgba(184,150,12,0.3);color:#b8960c">
            Manage Location
          </button>
        </template>
        <template v-else>
          <div class="mt-6 text-center" style="font-size:0.78rem;color:#3f3f46">Opening Soon</div>
        </template>
      </div>
    </div>

    <!-- Comparison table -->
    <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
      <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Location Comparison</div>
      <table class="w-full" style="border-collapse:collapse">
        <thead>
          <tr style="border-bottom:1px solid #1a1a1a">
            <th class="text-left pb-3 cursor-pointer" @click="sortKey = 'name'" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Location</th>
            <th class="text-right pb-3 cursor-pointer" @click="sortKey = 'revMtd'" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Revenue MTD</th>
            <th class="text-right pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">vs Last</th>
            <th class="text-right pb-3 cursor-pointer" @click="sortKey = 'appts'" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Appts</th>
            <th class="text-right pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">New Clients</th>
            <th class="text-right pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Subscribers</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in comparisonData" :key="row.name" style="border-bottom:1px solid #0f0f0f">
            <td class="py-3" style="font-size:0.83rem;font-weight:600;color:#e5e7eb">{{ row.name }}</td>
            <td class="py-3 text-right" style="font-size:0.83rem;color:#b8960c;font-weight:600">${{ row.revMtd.toLocaleString() }}</td>
            <td class="py-3 text-right" style="font-size:0.83rem;color:#22c55e">{{ row.vsLast }}</td>
            <td class="py-3 text-right" style="font-size:0.83rem;color:#9ca3af">{{ row.appts }}</td>
            <td class="py-3 text-right" style="font-size:0.83rem;color:#9ca3af">{{ row.newClients }}</td>
            <td class="py-3 text-right" style="font-size:0.83rem;color:#9ca3af">{{ row.subscribers }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Location Modal -->
    <div v-if="showAddModal" class="fixed inset-0 flex items-center justify-center z-50" style="background:rgba(0,0,0,0.7)">
      <div class="rounded-xl p-6 w-full max-w-md" style="background:#111;border:1px solid #2a2a2a">
        <div class="flex items-center justify-between mb-5">
          <div style="font-size:1rem;font-weight:700;color:#e5e7eb">Add New Location</div>
          <button @click="showAddModal = false" style="color:#6b7280;background:transparent;border:none;font-size:1.2rem;cursor:pointer">×</button>
        </div>
        <div class="space-y-4">
          <div>
            <label style="font-size:0.75rem;color:#6b7280;display:block;margin-bottom:4px">Location Name</label>
            <input v-model="newLoc.name" type="text" placeholder="e.g. North Campus" style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#e5e7eb;font-size:0.85rem;padding:10px 12px;border-radius:8px;outline:none;font-family:'Inter',sans-serif" />
          </div>
          <div>
            <label style="font-size:0.75rem;color:#6b7280;display:block;margin-bottom:4px">City</label>
            <input v-model="newLoc.city" type="text" placeholder="e.g. Austin" style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#e5e7eb;font-size:0.85rem;padding:10px 12px;border-radius:8px;outline:none;font-family:'Inter',sans-serif" />
          </div>
          <div>
            <label style="font-size:0.75rem;color:#6b7280;display:block;margin-bottom:4px">Manager</label>
            <input v-model="newLoc.manager" type="text" placeholder="Manager name" style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#e5e7eb;font-size:0.85rem;padding:10px 12px;border-radius:8px;outline:none;font-family:'Inter',sans-serif" />
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="showAddModal = false" class="flex-1 py-2 rounded-lg text-sm" style="background:transparent;border:1px solid #2a2a2a;color:#9ca3af;cursor:pointer">Cancel</button>
          <button @click="submitAdd" class="flex-1 py-2 rounded-lg text-sm font-semibold text-black" style="background:linear-gradient(135deg,#b8960c,#8a7009);border:none;cursor:pointer">Add Location</button>
        </div>
      </div>
    </div>
  </div>
</template>
