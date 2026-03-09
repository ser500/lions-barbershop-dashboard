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

function rankColor(rank) {
  if (rank === 1) return 'var(--app-gold)'
  if (rank === 2) return 'rgba(192,192,192,0.9)'
  return 'rgba(180,120,60,0.9)'
}
</script>
<template>
  <div class="app-card app-enter font-inter" style="padding:20px">
    <div class="flex items-center justify-between mb-4">
      <div>
        <div class="app-section-label">Location Rivalry</div>
        <div style="font-size:0.83rem;font-weight:600;color:var(--app-text-dim);margin-top:1px">By revenue this month</div>
      </div>
      <i class="ph ph-trophy" style="font-size:1.2rem;color:var(--app-gold)"></i>
    </div>

    <div class="space-y-3">
      <div v-for="loc in ranked" :key="loc.id" :class="loc.rank === 1 ? 'app-card gold' : 'app-card'" style="padding:12px 14px">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <i class="ph ph-trophy" :style="{ color: rankColor(loc.rank), fontSize: '1.1rem' }"></i>
            <div>
              <div style="font-size:0.83rem;font-weight:600;color:var(--app-text)">{{ loc.name }}</div>
              <div style="font-size:0.72rem;color:var(--app-text-muted)">{{ loc.appts }} appts · {{ loc.barberCount }} barbers</div>
            </div>
          </div>
          <div class="text-right">
            <div style="font-size:0.9rem;font-weight:700;color:var(--app-gold)">${{ loc.revenue.toLocaleString() }}</div>
            <div style="font-size:0.68rem;color:var(--app-green)">MTD</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-3">
      <p style="font-size:0.78rem;color:var(--app-text-dim);font-style:italic">
        <i class="ph ph-trend-up mr-1" style="color:var(--app-gold)"></i>East Side closes gap +18% this week
      </p>
    </div>
  </div>
</template>
