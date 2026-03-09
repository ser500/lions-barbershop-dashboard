<script setup>
import { useLiveFeedStore } from '../../stores/liveFeed'
const store = useLiveFeedStore()
</script>

<template>
  <div class="ticker-wrap">
    <div class="ticker-label">
      <span class="ticker-dot"></span>
      LIVE
    </div>
    <div class="ticker-overflow">
      <div class="ticker-track">
        <span v-for="(ev, i) in [...store.events, ...store.events]" :key="i" class="ticker-item">
          <span class="ticker-bullet">●</span>
          {{ ev.text }}
          <span class="ticker-time">{{ ev.time }}</span>
          <span class="ticker-sep">|</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ticker-wrap {
  height: 34px;
  background: var(--app-sidebar);
  border-bottom: 1px solid var(--app-border-dim);
  display: flex;
  align-items: center;
  overflow: hidden;
  flex-shrink: 0;
}

.ticker-label {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 14px;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--app-green);
  border-right: 1px solid var(--app-border-dim);
  white-space: nowrap;
  flex-shrink: 0;
  font-family: 'Inter', sans-serif;
}
.ticker-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--app-green);
  box-shadow: 0 0 6px var(--app-green);
  animation: ticker-blink 2s ease-in-out infinite;
  flex-shrink: 0;
}

.ticker-overflow {
  flex: 1;
  overflow: hidden;
}
.ticker-track {
  display: flex;
  gap: 0;
  white-space: nowrap;
  animation: ticker-scroll 45s linear infinite;
}
.ticker-item {
  display: inline-flex;
  align-items: center;
  padding: 0 28px;
  font-size: 0.72rem;
  color: rgba(255,255,255,0.45);
  font-family: 'Inter', sans-serif;
  gap: 6px;
}
.ticker-bullet { color: var(--app-gold); font-size: 0.55rem; flex-shrink: 0; }
.ticker-time { color: var(--app-text-muted); font-size: 0.65rem; }
.ticker-sep { color: var(--app-border); margin-left: 22px; }

@keyframes ticker-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes ticker-blink {
  0%, 100% { opacity: 0.6; }
  50%       { opacity: 1; }
}
</style>
