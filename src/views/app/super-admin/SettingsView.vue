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
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">
    <!-- Toast -->
    <div v-if="toast" style="position:fixed;top:20px;right:20px;background:var(--app-surface);border:1px solid rgba(184,150,12,0.4);color:var(--app-gold);padding:10px 20px;border-radius:8px;font-size:0.83rem;z-index:999">
      {{ toast }}
    </div>

    <div style="font-size:1.1rem;font-weight:700;color:var(--app-text)">Settings</div>

    <!-- Locations section -->
    <div class="app-card app-enter app-d1" style="padding:24px">
      <div style="font-size:1rem;font-weight:700;color:var(--app-text);margin-bottom:16px">Locations</div>
      <div style="display:flex;flex-direction:column;gap:16px">
        <div
          v-for="loc in locationStore.locations.filter(l => l.status !== 'coming-soon')"
          :key="loc.id"
          style="padding:16px;border-radius:10px;background:var(--app-surface-2);border:1px solid var(--app-border-dim)"
        >
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:12px">
            <div>
              <label style="font-size:0.78rem;font-weight:600;color:var(--app-text-dim);margin-bottom:6px;display:block">Name</label>
              <input :value="loc.name" type="text" style="width:100%;background:var(--app-surface-2);border:1px solid var(--app-border);border-radius:8px;padding:10px 14px;color:var(--app-text);font-size:0.875rem;outline:none;font-family:'Inter',sans-serif;box-sizing:border-box" />
            </div>
            <div>
              <label style="font-size:0.78rem;font-weight:600;color:var(--app-text-dim);margin-bottom:6px;display:block">Manager</label>
              <input :value="loc.managerName" type="text" style="width:100%;background:var(--app-surface-2);border:1px solid var(--app-border);border-radius:8px;padding:10px 14px;color:var(--app-text);font-size:0.875rem;outline:none;font-family:'Inter',sans-serif;box-sizing:border-box" />
            </div>
            <div>
              <label style="font-size:0.78rem;font-weight:600;color:var(--app-text-dim);margin-bottom:6px;display:block">Status</label>
              <select :value="loc.status" style="width:100%;background:var(--app-surface-2);border:1px solid var(--app-border);border-radius:8px;padding:10px 14px;color:var(--app-text);font-size:0.875rem;outline:none;font-family:'Inter',sans-serif;box-sizing:border-box">
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
          <button @click="save('Location')" class="app-btn primary">Save</button>
        </div>
      </div>
    </div>

    <!-- Membership plans section -->
    <div class="app-card app-enter app-d2" style="padding:24px">
      <div style="font-size:1rem;font-weight:700;color:var(--app-text);margin-bottom:16px">Membership Plans</div>
      <div style="display:flex;flex-direction:column;gap:16px">
        <div
          v-for="plan in membershipStore.plans"
          :key="plan.id"
          style="padding:16px;border-radius:10px;background:var(--app-surface-2);border:1px solid var(--app-border-dim)"
        >
          <div class="flex items-center justify-between" style="margin-bottom:12px">
            <div style="font-size:0.85rem;font-weight:700;color:var(--app-text)">{{ plan.label }}</div>
            <span style="font-size:0.72rem;padding:3px 10px;border-radius:20px;font-weight:600" :style="{ background: plan.color + '15', color: plan.color, border: '1px solid ' + plan.color + '40' }">{{ plan.id }}</span>
          </div>
          <div class="flex items-center gap-4">
            <div>
              <label style="font-size:0.78rem;font-weight:600;color:var(--app-text-dim);margin-bottom:6px;display:block">Price / month</label>
              <div class="flex items-center" style="background:var(--app-surface-2);border:1px solid var(--app-border);border-radius:8px;overflow:hidden">
                <span style="padding:10px 14px;color:var(--app-text-muted);font-size:0.875rem;border-right:1px solid var(--app-border)">$</span>
                <input :value="plan.price" type="number" style="background:transparent;border:none;color:var(--app-text);font-size:0.875rem;padding:10px 14px;outline:none;width:80px;font-family:'Inter',sans-serif" />
              </div>
            </div>
            <button @click="save('Plan')" class="app-btn primary" style="align-self:flex-end">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
