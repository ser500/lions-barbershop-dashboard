<script setup>
import { ref } from 'vue'

const products = ref([
  { id: 1, name: 'Clippers Blade Oil',  qty: 12, threshold: 5,  low: false },
  { id: 2, name: 'Pomade Matte',         qty: 3,  threshold: 10, low: true  },
  { id: 3, name: 'Shave Foam',           qty: 8,  threshold: 15, low: true  },
  { id: 4, name: 'Beard Oil',            qty: 20, threshold: 10, low: false },
  { id: 5, name: 'Barbicide',            qty: 6,  threshold: 8,  low: true  },
  { id: 6, name: 'Disposable Razors',    qty: 45, threshold: 20, low: false },
  { id: 7, name: 'Edge Pro Blade',       qty: 11, threshold: 15, low: true  },
])

const reorderSent = ref(new Set())

function requestReorder(id) {
  reorderSent.value.add(id)
}
</script>
<template>
  <div class="p-6 font-inter">
    <div class="flex items-center justify-between mb-5">
      <div>
        <div style="font-size:1.1rem;font-weight:700;color:#e5e7eb">Inventory</div>
        <div style="font-size:0.78rem;color:#6b7280;margin-top:2px">Stock levels and reorder management</div>
      </div>
      <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2)">
        <i class="ph ph-warning" style="color:#ef4444;font-size:0.85rem"></i>
        <span style="font-size:0.78rem;color:#ef4444;font-weight:600">{{ products.filter(p => p.low).length }} Low Stock</span>
      </div>
    </div>

    <div class="rounded-xl overflow-hidden" style="background:#111;border:1px solid #1a1a1a">
      <table class="w-full" style="border-collapse:collapse">
        <thead>
          <tr style="border-bottom:1px solid #1a1a1a;background:#0f0f0f">
            <th class="text-left px-5 py-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Product</th>
            <th class="text-center px-4 py-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Qty</th>
            <th class="text-center px-4 py-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Threshold</th>
            <th class="text-center px-4 py-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Status</th>
            <th class="text-center px-4 py-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products"
            :key="product.id"
            style="border-bottom:1px solid #0f0f0f"
            :style="product.low ? 'background:rgba(239,68,68,0.04)' : ''"
          >
            <td class="px-5 py-3.5">
              <div class="flex items-center gap-2">
                <i class="ph ph-package" :style="{ color: product.low ? '#ef4444' : '#6b7280', fontSize: '1rem' }"></i>
                <span style="font-size:0.85rem;font-weight:600;color:#e5e7eb">{{ product.name }}</span>
              </div>
            </td>
            <td class="px-4 py-3.5 text-center">
              <span style="font-size:1rem;font-weight:700;" :style="{ color: product.low ? '#ef4444' : '#e5e7eb' }">{{ product.qty }}</span>
            </td>
            <td class="px-4 py-3.5 text-center" style="font-size:0.83rem;color:#6b7280">{{ product.threshold }}</td>
            <td class="px-4 py-3.5 text-center">
              <span
                class="text-xs px-2 py-0.5 rounded-full font-medium"
                :style="product.low
                  ? 'background:rgba(239,68,68,0.1);color:#ef4444;border:1px solid rgba(239,68,68,0.3)'
                  : 'background:rgba(34,197,94,0.1);color:#22c55e;border:1px solid rgba(34,197,94,0.2)'"
              >{{ product.low ? 'LOW' : 'OK' }}</span>
            </td>
            <td class="px-4 py-3.5 text-center">
              <template v-if="product.low">
                <button
                  v-if="!reorderSent.has(product.id)"
                  @click="requestReorder(product.id)"
                  style="font-size:0.72rem;background:rgba(239,68,68,0.1);color:#ef4444;border:1px solid rgba(239,68,68,0.3);padding:5px 12px;border-radius:6px;cursor:pointer"
                >Request Reorder</button>
                <span v-else style="font-size:0.72rem;color:#22c55e">Requested</span>
              </template>
              <span v-else style="font-size:0.75rem;color:#4b5563">—</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
