<script setup>
import { ref } from 'vue'

const products = [
  { id: 2, name: 'Pomade Matte',    qty: 3,  threshold: 10 },
  { id: 3, name: 'Shave Foam',      qty: 8,  threshold: 15 },
  { id: 5, name: 'Barbicide',       qty: 6,  threshold: 8  },
  { id: 7, name: 'Edge Pro Blade',  qty: 11, threshold: 15 },
]

const requestedIds = ref(new Set())

function requestRestock(id) {
  requestedIds.value.add(id)
}
</script>
<template>
  <div class="p-6 font-inter">
    <div class="mb-5">
      <div style="font-size:1.1rem;font-weight:700;color:#e5e7eb">Low Stock Alerts</div>
      <div style="font-size:0.78rem;color:#6b7280;margin-top:2px">Items below reorder threshold — contact admin to restock</div>
    </div>

    <div class="space-y-3">
      <div
        v-for="p in products"
        :key="p.id"
        class="flex items-center justify-between p-4 rounded-xl"
        style="background:rgba(239,68,68,0.05);border:1px solid rgba(239,68,68,0.15)"
      >
        <div class="flex items-center gap-3">
          <i class="ph ph-warning" style="color:#ef4444;font-size:1rem"></i>
          <div>
            <div style="font-size:0.85rem;font-weight:600;color:#e5e7eb">{{ p.name }}</div>
            <div style="font-size:0.75rem;color:#9ca3af;margin-top:1px">{{ p.qty }} remaining · threshold: {{ p.threshold }}</div>
          </div>
        </div>
        <button
          v-if="!requestedIds.has(p.id)"
          @click="requestRestock(p.id)"
          style="font-size:0.75rem;font-weight:600;background:rgba(239,68,68,0.1);color:#ef4444;border:1px solid rgba(239,68,68,0.3);padding:6px 14px;border-radius:8px;cursor:pointer"
        >Request Restock</button>
        <span v-else style="font-size:0.75rem;color:#22c55e;font-weight:600">Request sent to Admin</span>
      </div>
    </div>
  </div>
</template>
