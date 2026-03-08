<script setup>
defineProps({
  client: { type: Object, required: true }
})

function planBadgeStyle(plan) {
  if (plan === 'vip') return 'background:rgba(232,232,232,0.1);color:#e8e8e8;border:1px solid rgba(232,232,232,0.3)'
  if (plan === 'premium') return 'background:rgba(201,168,76,0.15);color:#c9a84c;border:1px solid rgba(201,168,76,0.3)'
  return 'background:rgba(168,184,200,0.1);color:#a8b8c8;border:1px solid rgba(168,184,200,0.3)'
}

function planLabel(plan) {
  if (plan === 'vip') return 'VIP'
  if (plan === 'premium') return 'Premium'
  return 'Essential'
}
</script>
<template>
  <div class="font-inter" style="background:#111;border:1px solid #1a1a1a;border-radius:8px;padding:12px">
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0" style="background:linear-gradient(135deg,#b8960c,#8a7009)">
          {{ client.initials || client.name.split(' ').map(n => n[0]).join('') }}
        </div>
        <span style="font-size:0.85rem;font-weight:600;color:#e5e7eb">{{ client.name }}</span>
      </div>
      <span class="text-xs px-2 py-0.5 rounded-full font-medium" :style="planBadgeStyle(client.plan)">{{ planLabel(client.plan) }}</span>
    </div>
    <div class="flex items-center gap-3 mb-2" style="font-size:0.75rem;color:#6b7280">
      <span><i class="ph ph-clock mr-1"></i>{{ client.daysSince }} days ago</span>
      <span><i class="ph ph-scissors mr-1"></i>{{ client.visits }} visits</span>
    </div>
    <div v-if="client.notes" style="font-size:0.78rem;color:#9ca3af;line-height:1.5;margin-bottom:8px;padding:8px;background:#0f0f0f;border-radius:6px;border:1px solid #1e1e1e">
      {{ client.notes }}
    </div>
    <div v-if="client.suggestedUpsell" style="font-size:0.75rem;color:#b8960c;font-style:italic">
      <i class="ph ph-trend-up mr-1"></i>{{ client.suggestedUpsell }}
    </div>
  </div>
</template>
