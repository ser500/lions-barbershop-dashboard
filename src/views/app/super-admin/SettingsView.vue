<script setup>
import { ref } from 'vue'
import { useLocationStore } from '../../../stores/location'
import { useMembershipStore } from '../../../stores/membership'

const locationStore = useLocationStore()
const membershipStore = useMembershipStore()

const toast = ref('')
function save(section) {
  toast.value = `${section} saved`
  setTimeout(() => { toast.value = '' }, 2000)
}
</script>
<template>
  <div class="p-6 font-inter space-y-6">
    <!-- Toast -->
    <div v-if="toast" style="position:fixed;top:20px;right:20px;background:#111;border:1px solid rgba(184,150,12,0.4);color:#b8960c;padding:10px 20px;border-radius:8px;font-size:0.83rem;z-index:999">
      {{ toast }}
    </div>

    <div style="font-size:1.1rem;font-weight:700;color:#e5e7eb">Settings</div>

    <!-- Location cards -->
    <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
      <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Locations</div>
      <div class="space-y-4">
        <div v-for="loc in locationStore.locations.filter(l => l.status !== 'coming-soon')" :key="loc.id" class="p-4 rounded-xl" style="background:#0f0f0f;border:1px solid #1e1e1e">
          <div class="grid grid-cols-3 gap-4 mb-3">
            <div>
              <label style="font-size:0.72rem;color:#6b7280;display:block;margin-bottom:3px">Name</label>
              <input :value="loc.name" type="text" style="width:100%;background:#111;border:1px solid #2a2a2a;color:#e5e7eb;font-size:0.83rem;padding:8px 10px;border-radius:6px;outline:none;font-family:'Inter',sans-serif" />
            </div>
            <div>
              <label style="font-size:0.72rem;color:#6b7280;display:block;margin-bottom:3px">Manager</label>
              <input :value="loc.managerName" type="text" style="width:100%;background:#111;border:1px solid #2a2a2a;color:#e5e7eb;font-size:0.83rem;padding:8px 10px;border-radius:6px;outline:none;font-family:'Inter',sans-serif" />
            </div>
            <div>
              <label style="font-size:0.72rem;color:#6b7280;display:block;margin-bottom:3px">Status</label>
              <select :value="loc.status" style="width:100%;background:#111;border:1px solid #2a2a2a;color:#e5e7eb;font-size:0.83rem;padding:8px 10px;border-radius:6px;outline:none;font-family:'Inter',sans-serif">
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
          <button @click="save('Location')" class="text-xs px-3 py-1.5 rounded-lg font-semibold text-black" style="background:linear-gradient(135deg,#b8960c,#8a7009);border:none;cursor:pointer">Save</button>
        </div>
      </div>
    </div>

    <!-- Membership plan editor -->
    <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
      <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Membership Plans</div>
      <div class="space-y-4">
        <div v-for="plan in membershipStore.plans" :key="plan.id" class="p-4 rounded-xl" style="background:#0f0f0f;border:1px solid #1e1e1e">
          <div class="flex items-center justify-between mb-3">
            <div style="font-size:0.85rem;font-weight:700;color:#e5e7eb">{{ plan.label }}</div>
            <span class="text-xs px-2 py-0.5 rounded-full font-medium" :style="{ background: plan.color + '15', color: plan.color, border: '1px solid ' + plan.color + '40' }">{{ plan.id }}</span>
          </div>
          <div class="flex items-center gap-4">
            <div>
              <label style="font-size:0.72rem;color:#6b7280;display:block;margin-bottom:3px">Price / month</label>
              <div class="flex items-center" style="background:#111;border:1px solid #2a2a2a;border-radius:6px;overflow:hidden">
                <span style="padding:8px 10px;color:#6b7280;font-size:0.83rem;border-right:1px solid #2a2a2a">$</span>
                <input :value="plan.price" type="number" style="background:transparent;border:none;color:#e5e7eb;font-size:0.83rem;padding:8px 10px;outline:none;width:80px;font-family:'Inter',sans-serif" />
              </div>
            </div>
            <button @click="save('Plan')" class="text-xs px-3 py-1.5 rounded-lg font-semibold text-black self-end" style="background:linear-gradient(135deg,#b8960c,#8a7009);border:none;cursor:pointer">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
