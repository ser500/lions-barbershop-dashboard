<script setup>
import { ref, computed } from 'vue'

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

const lowStockCount = computed(() => products.value.filter(p => p.low).length)

function requestReorder(id) {
  reorderSent.value.add(id)
}
</script>
<template>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">
    <!-- Low stock summary alert -->
    <div class="app-card app-enter" style="padding:14px 16px;border-left:3px solid var(--app-amber);display:flex;align-items:center;gap:10px">
      <i class="ph ph-warning" style="color:var(--app-amber);font-size:1rem;flex-shrink:0"></i>
      <div>
        <span style="font-size:0.83rem;font-weight:600;color:var(--app-amber)">{{ lowStockCount }} items below reorder threshold. </span>
        <span style="font-size:0.83rem;color:var(--app-text-dim)">Review and request reorders below.</span>
      </div>
    </div>

    <!-- Product table -->
    <div class="app-card app-enter app-d2" style="padding:0;overflow:hidden">
      <table class="app-table" style="width:100%">
        <thead>
          <tr>
            <th style="text-align:left;padding:12px 20px">Product</th>
            <th style="text-align:center;padding:12px 16px">Qty</th>
            <th style="text-align:center;padding:12px 16px">Threshold</th>
            <th style="text-align:center;padding:12px 16px">Status</th>
            <th style="text-align:center;padding:12px 16px">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products"
            :key="product.id"
            :style="product.low ? 'background:rgba(232,168,76,0.04)' : ''"
          >
            <td style="padding:12px 20px">
              <div style="display:flex;align-items:center;gap:8px">
                <i class="ph ph-package" :style="{ color: product.low ? 'var(--app-amber)' : 'var(--app-text-muted)', fontSize: '1rem' }"></i>
                <span style="font-size:0.85rem;font-weight:600;color:var(--app-text)">{{ product.name }}</span>
              </div>
            </td>
            <td style="padding:12px 16px;text-align:center">
              <span
                v-if="product.low"
                class="app-badge amber"
                style="font-size:0.85rem;font-weight:700;padding:2px 10px"
              >{{ product.qty }}</span>
              <span v-else style="font-size:1rem;font-weight:700;color:var(--app-text)">{{ product.qty }}</span>
            </td>
            <td style="padding:12px 16px;text-align:center;font-size:0.83rem;color:var(--app-text-muted)">{{ product.threshold }}</td>
            <td style="padding:12px 16px;text-align:center">
              <span class="app-badge" :class="product.low ? 'amber' : 'green'">{{ product.low ? 'LOW' : 'OK' }}</span>
            </td>
            <td style="padding:12px 16px;text-align:center">
              <template v-if="product.low">
                <button
                  v-if="!reorderSent.has(product.id)"
                  class="app-btn ghost"
                  style="font-size:0.72rem;padding:4px 12px"
                  @click="requestReorder(product.id)"
                >Request Reorder</button>
                <span v-else style="font-size:0.72rem;color:var(--app-green)">Requested</span>
              </template>
              <span v-else style="font-size:0.75rem;color:var(--app-text-muted)">—</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
