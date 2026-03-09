<script setup>
defineProps({
  clients: { type: Array, required: true }
})
</script>

<template>
  <div class="rounded-xl p-5 font-inter" style="background:#111;border:1px solid #1e1e1e">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="font-cinzel font-bold text-zinc-100 text-sm mb-0.5">Waiting Area</h3>
        <p class="text-xs text-zinc-500">{{ clients.length }} clients waiting</p>
      </div>
      <button class="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:bg-yellow-900/20" style="color:#b8960c;border:1px dashed rgba(184,150,12,0.4)">
        + Add Walk-in
      </button>
    </div>

    <div class="space-y-2">
      <div
        v-for="client in clients"
        :key="client.id"
        class="flex items-center justify-between p-3 rounded-lg"
        style="background:#0f0f0f;border:1px solid #1e1e1e"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black" style="background:linear-gradient(135deg,#b8960c,#8a7009)">
            {{ client.name.split(' ').map(n => n[0]).join('') }}
          </div>
          <div>
            <div class="text-xs font-semibold text-zinc-200">{{ client.name }}</div>
            <div class="text-xs text-zinc-600">{{ client.service }}</div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="text-xs px-2 py-0.5 rounded-full font-medium"
            :style="client.type === 'member'
              ? 'background:rgba(184,150,12,0.15);color:#b8960c;border:1px solid rgba(184,150,12,0.3)'
              : 'background:#1f2937;color:#6b7280;border:1px solid #374151'"
          >{{ client.type === 'member' ? 'Member' : 'Walk-in' }}</span>
          <span class="text-xs text-zinc-500">{{ client.wait }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
