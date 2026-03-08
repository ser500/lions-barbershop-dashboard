<script setup>
import { useLiveFeedStore } from '../../stores/liveFeed'
const store = useLiveFeedStore()
</script>
<template>
  <div class="ticker-wrap" style="height:36px;background:#0d0d0d;border-bottom:1px solid #1a1a1a;overflow:hidden;display:flex;align-items:center">
    <div class="ticker-move" style="display:flex;gap:0;white-space:nowrap;animation:ticker-scroll 40s linear infinite">
      <span v-for="(ev, i) in [...store.events, ...store.events]" :key="i" style="display:inline-flex;align-items:center;padding:0 32px;font-size:0.72rem;color:#9ca3af;font-family:'Inter',sans-serif">
        <span style="color:#b8960c;margin-right:6px">●</span>
        {{ ev.text }}
        <span style="color:#4b5563;margin-left:8px;font-size:0.65rem">{{ ev.time }}</span>
        <span style="color:#1a1a1a;margin-left:32px">|</span>
      </span>
    </div>
  </div>
</template>
<style scoped>
@keyframes ticker-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
