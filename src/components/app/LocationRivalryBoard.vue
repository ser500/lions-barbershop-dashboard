<script setup>
import { computed } from 'vue'
import { useLocationStore } from '../../stores/location'

const store = useLocationStore()

const ranked = computed(() => {
  return [...store.locations]
    .filter(l => l.status !== 'coming-soon')
    .sort((a, b) => b.revenue - a.revenue)
    .map((loc, i) => {
      const prev = store.locations.find(l => l.id === loc.id)
      return { ...loc, rank: i + 1 }
    })
})

const trophies = ['🥇', '🥈', '🥉']
</script>
<template>
  <div class="font-inter" style="background:#111;border:1px solid #1a1a1a;border-radius:10px;padding:16px">
    <div class="flex items-center justify-between mb-4">
      <div>
        <div style="font-size:0.85rem;font-weight:700;color:#e5e7eb">Location Rankings</div>
        <div style="font-size:0.72rem;color:#6b7280;margin-top:1px">By revenue this month</div>
      </div>
    </div>

    <div class="space-y-3">
      <div v-for="loc in ranked" :key="loc.id" class="flex items-center justify-between p-3 rounded-lg" style="background:#0f0f0f;border:1px solid #1e1e1e">
        <div class="flex items-center gap-3">
          <span style="font-size:1.2rem">{{ trophies[loc.rank - 1] || loc.rank }}</span>
          <div>
            <div style="font-size:0.83rem;font-weight:600;color:#e5e7eb">{{ loc.name }}</div>
            <div style="font-size:0.72rem;color:#6b7280">{{ loc.appts }} appts · {{ loc.barberCount }} barbers</div>
          </div>
        </div>
        <div class="text-right">
          <div style="font-size:0.9rem;font-weight:700;color:#b8960c">${{ loc.revenue.toLocaleString() }}</div>
          <div style="font-size:0.68rem;color:#22c55e">MTD</div>
        </div>
      </div>
    </div>

    <div class="mt-3 px-3 py-2 rounded-lg" style="background:rgba(184,150,12,0.05);border:1px solid rgba(184,150,12,0.15)">
      <div style="font-size:0.75rem;color:#b8960c;font-style:italic">
        <i class="ph ph-trend-up mr-1"></i>East Side closes gap +18% this week
      </div>
    </div>
  </div>
</template>
