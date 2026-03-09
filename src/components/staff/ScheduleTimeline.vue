<script setup>
import { ref } from 'vue'

defineProps({
  schedule: { type: Array, required: true }
})

const activeView = ref('all')

function serviceColor(service) {
  if (!service) return 'var(--app-blue)'
  const s = service.toLowerCase()
  if (s.includes('beard')) return 'var(--app-amber)'
  if (s.includes('shave') || s.includes('royal')) return 'var(--app-gold)'
  if (s.includes('fade') || s.includes('lineup')) return 'var(--app-green)'
  return 'var(--app-blue)'
}

function initials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}
</script>

<template>
  <div class="tl-root">

    <!-- Header -->
    <div class="tl-header">
      <div class="tl-title-group">
        <div class="tl-orb">
          <i class="ph ph-calendar-check"></i>
        </div>
        <div>
          <h3 class="tl-title">Schedule Timeline</h3>
          <p class="tl-sub">Today's appointments &middot; {{ schedule.length }} booked</p>
        </div>
      </div>
      <div class="tl-tabs">
        <button class="tl-tab" :class="{ active: activeView === 'all' }" @click="activeView = 'all'">All Barbers</button>
        <button class="tl-tab" :class="{ active: activeView === 'mine' }" @click="activeView = 'mine'">My Schedule</button>
      </div>
    </div>

    <!-- Timeline -->
    <div class="tl-body">
      <div class="tl-connector"></div>

      <div
        v-for="(appt, i) in schedule"
        :key="appt.id"
        class="tl-row app-enter"
        :class="`app-d${Math.min(i + 1, 5)}`"
      >
        <!-- Time -->
        <div class="tl-time" :class="`tl-time--${appt.status}`">{{ appt.time }}</div>

        <!-- Dot -->
        <div class="tl-dot-wrap">
          <div class="tl-dot" :class="`tl-dot--${appt.status}`"></div>
        </div>

        <!-- Card -->
        <div
          class="tl-card"
          :class="`tl-card--${appt.status}`"
          :style="appt.status !== 'completed' ? `border-left-color:${serviceColor(appt.service)}` : ''"
        >
          <div class="tl-card-inner">
            <!-- Left: avatar + name -->
            <div class="tl-left">
              <div class="tl-avatar" :class="{ 'tl-avatar--dim': appt.status === 'completed' }">
                {{ initials(appt.client) }}
              </div>
              <div class="tl-info">
                <div class="tl-name" :class="{ 'tl-name--done': appt.status === 'completed' }">{{ appt.client }}</div>
                <div class="tl-meta">{{ appt.service }} &middot; {{ appt.barber }}</div>
              </div>
            </div>

            <!-- Right: badge + action -->
            <div class="tl-right">
              <span class="tl-chip" :class="`tl-chip--${appt.status}`">
                {{ appt.status === 'in-chair' ? 'In Chair' : appt.status === 'completed' ? 'Done' : `${appt.duration}m` }}
              </span>
              <button v-if="appt.status === 'in-chair'" class="tl-checkout">Checkout</button>
              <button v-if="appt.status === 'upcoming'" class="tl-edit">
                <i class="ph ph-pencil"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.tl-root {
  font-family: 'Inter', sans-serif;
}

/* ── Header ───────────────────────────────── */
.tl-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 22px;
  flex-wrap: wrap;
}

.tl-title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tl-orb {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--app-gold) 0%, #8a6a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #000;
  box-shadow: 0 0 18px rgba(201, 168, 76, 0.32);
  flex-shrink: 0;
}

.tl-title {
  font-family: 'Cinzel', serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--app-text);
  letter-spacing: 0.07em;
  text-transform: uppercase;
  margin: 0;
}

.tl-sub {
  font-size: 0.7rem;
  color: var(--app-text-muted);
  margin: 2px 0 0;
}

.tl-tabs {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--app-border);
}

.tl-tab {
  padding: 5px 14px;
  font-size: 0.7rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  border: none;
  background: transparent;
  color: var(--app-text-muted);
  letter-spacing: 0.03em;
  transition: all 0.15s ease;
}
.tl-tab.active {
  background: var(--app-gold);
  color: #060810;
}
.tl-tab:not(.active):hover {
  background: rgba(201, 168, 76, 0.06);
  color: var(--app-text-dim);
}

/* ── Body & connector ─────────────────────── */
.tl-body {
  position: relative;
  display: flex;
  flex-direction: column;
}

.tl-connector {
  position: absolute;
  left: 89px;
  top: 12px;
  bottom: 12px;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    var(--app-border) 12%,
    var(--app-border) 88%,
    transparent 100%
  );
  pointer-events: none;
}

/* ── Row ──────────────────────────────────── */
.tl-row {
  display: flex;
  align-items: flex-start;
  padding: 5px 0;
}

/* Time */
.tl-time {
  width: 78px;
  flex-shrink: 0;
  text-align: right;
  padding-right: 12px;
  padding-top: 9px;
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.01em;
}
.tl-time--completed { color: var(--app-text-muted); opacity: 0.4; }
.tl-time--in-chair  { color: var(--app-gold); }
.tl-time--upcoming  { color: var(--app-text-dim); }

/* Dot */
.tl-dot-wrap {
  width: 22px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  padding-top: 8px;
  position: relative;
  z-index: 1;
}

.tl-dot {
  border-radius: 50%;
  border: 2px solid;
  transition: all 0.2s ease;
}
.tl-dot--completed {
  width: 9px; height: 9px;
  background: var(--app-surface-2);
  border-color: var(--app-border);
  opacity: 0.35;
}
.tl-dot--in-chair {
  width: 13px; height: 13px;
  background: var(--app-gold);
  border-color: var(--app-gold);
  box-shadow: 0 0 0 5px rgba(201, 168, 76, 0.16), 0 0 14px rgba(201, 168, 76, 0.45);
}
.tl-dot--upcoming {
  width: 9px; height: 9px;
  background: var(--app-surface-2);
  border-color: var(--app-text-muted);
  opacity: 0.55;
}

/* Card */
.tl-card {
  flex: 1;
  border-radius: 10px;
  border-left-width: 3px;
  border-left-style: solid;
  margin-left: 10px;
  transition: border-color 0.18s, background 0.18s;
}

.tl-card--completed {
  background: var(--app-surface);
  border: 1px solid var(--app-border-dim);
  border-left: 2px solid var(--app-border);
  opacity: 0.38;
}

.tl-card--in-chair {
  background: rgba(201, 168, 76, 0.065);
  border: 1px solid rgba(201, 168, 76, 0.26);
  box-shadow: 0 2px 24px rgba(201, 168, 76, 0.1), inset 0 1px 0 rgba(201, 168, 76, 0.08);
}

.tl-card--upcoming {
  background: var(--app-surface);
  border: 1px solid var(--app-border-dim);
}
.tl-card--upcoming:hover {
  background: var(--app-surface-2);
  border-color: var(--app-border);
}

.tl-card-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 14px;
}

/* Left section */
.tl-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.tl-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--app-gold), rgba(201, 168, 76, 0.45));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.62rem;
  font-weight: 800;
  color: #060810;
  flex-shrink: 0;
  letter-spacing: 0.02em;
}
.tl-avatar--dim {
  background: var(--app-surface-2);
  color: var(--app-text-muted);
}

.tl-info { min-width: 0; }

.tl-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--app-text);
  line-height: 1.25;
  white-space: nowrap;
}
.tl-name--done {
  color: var(--app-text-muted);
  text-decoration: line-through;
  text-decoration-color: var(--app-border);
}

.tl-meta {
  font-size: 0.7rem;
  color: var(--app-text-muted);
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Right section */
.tl-right {
  display: flex;
  align-items: center;
  gap: 7px;
  flex-shrink: 0;
}

.tl-chip {
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  border-radius: 20px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  white-space: nowrap;
}
.tl-chip--completed { background: var(--app-surface-2); color: var(--app-text-muted); border: 1px solid var(--app-border); }
.tl-chip--in-chair  { background: rgba(201, 168, 76, 0.14); color: var(--app-gold); border: 1px solid rgba(201, 168, 76, 0.32); }
.tl-chip--upcoming  { background: var(--app-surface-2); color: var(--app-text-dim); border: 1px solid var(--app-border); }

.tl-checkout {
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  background: linear-gradient(135deg, var(--app-gold) 0%, #8a7009 100%);
  border: none;
  color: #060810;
  letter-spacing: 0.02em;
  transition: all 0.15s ease;
}
.tl-checkout:hover {
  opacity: 0.85;
  box-shadow: 0 4px 14px rgba(201, 168, 76, 0.3);
  transform: translateY(-1px);
}

.tl-edit {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  border: 1px solid var(--app-border);
  background: transparent;
  color: var(--app-text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.72rem;
  transition: all 0.15s ease;
}
.tl-edit:hover {
  border-color: rgba(201, 168, 76, 0.4);
  color: var(--app-gold);
  background: rgba(201, 168, 76, 0.06);
}
</style>
