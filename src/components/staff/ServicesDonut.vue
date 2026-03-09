<script setup>
import { computed } from 'vue'

const props = defineProps({
  services: { type: Array, required: true }
})

const conicGradient = computed(() => {
  let deg = 0
  const stops = props.services.map(s => {
    const start = deg
    deg += (s.pct / 100) * 360
    return `${s.color} ${start}deg ${deg}deg`
  })
  return `conic-gradient(${stops.join(', ')})`
})

const total = computed(() => props.services.reduce((a, b) => a + b.pct, 0))
</script>

<template>
  <div class="rounded-xl p-5 font-inter" style="background:#111;border:1px solid #1e1e1e">
    <div class="mb-4">
      <h3 class="font-cinzel font-bold text-zinc-100 text-sm mb-0.5">Services Breakdown</h3>
      <p class="text-xs text-zinc-500">Today's service mix</p>
    </div>

    <!-- Donut -->
    <div class="flex justify-center mb-4">
      <div class="relative w-28 h-28">
        <div
          class="w-28 h-28 rounded-full"
          :style="{ background: conicGradient }"
        ></div>
        <!-- Hole -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-16 h-16 rounded-full flex flex-col items-center justify-center" style="background:#111">
            <div class="text-lg font-bold" style="color:#b8960c">{{ total }}</div>
            <div class="text-xs text-zinc-600">appts</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="space-y-2">
      <div v-for="s in services" :key="s.name" class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full flex-shrink-0" :style="{ background: s.color }"></div>
          <span class="text-xs text-zinc-400">{{ s.name }}</span>
        </div>
        <span class="text-xs font-semibold text-zinc-300">{{ s.pct }}%</span>
      </div>
    </div>
  </div>
</template>
