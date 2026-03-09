<script setup>
import { ref } from 'vue'

const products = [
  { id: 2, name: 'Pomade Matte',   qty: 3,  threshold: 10 },
  { id: 3, name: 'Shave Foam',     qty: 8,  threshold: 15 },
  { id: 5, name: 'Barbicide',      qty: 6,  threshold: 8  },
  { id: 7, name: 'Edge Pro Blade', qty: 11, threshold: 15 },
]

const requestedIds = ref(new Set())

function requestRestock(id) {
  requestedIds.value.add(id)
}
</script>
<template>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <div class="app-section-label">Low Stock Alerts</div>
        <div style="font-size:0.78rem;color:var(--app-text-muted);margin-top:2px">Items below reorder threshold — contact admin to restock</div>
      </div>
      <button class="app-btn ghost">
        <i class="ph ph-package"></i>
        Request Restock
      </button>
    </div>

    <!-- Inventory items -->
    <div
      v-for="(p, i) in products"
      :key="p.id"
      class="app-card app-enter"
      :class="`app-d${i + 1}`"
      style="padding:16px 20px;border-left:3px solid var(--app-amber);display:flex;align-items:center;justify-content:space-between;gap:12px"
    >
      <div class="flex items-center gap-3">
        <i class="ph ph-warning" style="color:var(--app-amber);font-size:1rem;flex-shrink:0"></i>
        <div>
          <div style="font-size:0.95rem;font-weight:600;color:var(--app-text)">{{ p.name }}</div>
          <div style="font-size:0.75rem;color:var(--app-text-muted);margin-top:2px">threshold: {{ p.threshold }}</div>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <span :class="p.qty <= p.threshold * 0.5 ? 'app-badge amber' : 'app-badge green'">{{ p.qty }} remaining</span>
        <button
          v-if="!requestedIds.has(p.id)"
          class="app-btn ghost"
          style="font-size:0.75rem;padding:5px 12px"
          @click="requestRestock(p.id)"
        >Restock</button>
        <span v-else style="font-size:0.75rem;color:var(--app-green);font-weight:600">Request sent</span>
      </div>
    </div>
  </div>
</template>
