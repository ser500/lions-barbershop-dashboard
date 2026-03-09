<script setup>
defineProps({
  client: { type: Object, required: true }
})

function planBadgeClass(plan) {
  if (plan === 'vip') return 'app-badge vip'
  if (plan === 'premium') return 'app-badge gold'
  return 'app-badge blue'
}

function planLabel(plan) {
  if (plan === 'vip') return 'VIP'
  if (plan === 'premium') return 'Premium'
  return 'Essential'
}

function avatarRingColor(plan) {
  if (plan === 'vip' || plan === 'premium') return 'linear-gradient(135deg,var(--app-gold),#8a7009)'
  return 'linear-gradient(135deg,var(--app-blue),#3a6fad)'
}
</script>
<template>
  <div class="app-card app-enter font-inter" style="padding:20px">
    <div class="flex items-center justify-between mb-3">
      <div class="person-badge">
        <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0" :style="{ background: avatarRingColor(client.plan) }">
          {{ client.initials || client.name.split(' ').map(n => n[0]).join('') }}
        </div>
        <span style="font-size:0.875rem;font-weight:600;color:var(--app-text)">{{ client.name }}</span>
      </div>
      <span :class="planBadgeClass(client.plan)">{{ planLabel(client.plan) }}</span>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
      <div style="font-size:0.78rem;color:var(--app-text-dim)">
        <i class="ph ph-clock mr-1"></i>{{ client.daysSince }} days ago
      </div>
      <div style="font-size:0.78rem;color:var(--app-text-dim)">
        <i class="ph ph-scissors mr-1"></i>{{ client.visits }} visits
      </div>
    </div>

    <div v-if="client.notes" class="app-card" style="background:var(--app-surface-2);padding:12px;border-radius:8px;margin-bottom:10px">
      <p style="font-size:0.78rem;color:var(--app-text-dim);line-height:1.5;margin:0">{{ client.notes }}</p>
    </div>

    <div v-if="client.suggestedUpsell" class="app-card gold" style="padding:10px 14px">
      <div style="font-size:0.78rem;color:var(--app-gold);font-style:italic">
        <i class="ph ph-sparkle mr-1"></i>{{ client.suggestedUpsell }}
      </div>
    </div>
  </div>
</template>
