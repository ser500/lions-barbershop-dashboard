<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const stats = [
  { label: 'Total Visits',   value: '32',   sub: 'All time', icon: 'ph-calendar-check' },
  { label: 'Total Spent',    value: '$3,520', sub: 'All time', icon: 'ph-currency-dollar' },
  { label: 'Cuts This Month', value: '2 / ∞', sub: 'VIP plan', icon: 'ph-scissors' },
  { label: 'Member Since',   value: 'Jan \'24', sub: '26 months', icon: 'ph-crown-simple' },
]

const recentActivity = [
  { date: 'Mar 5, 2026',  service: 'Signature Cut + Beard', barber: 'Devon Richards', amount: '$110' },
  { date: 'Feb 10, 2026', service: 'Signature Cut + Beard', barber: 'Devon Richards', amount: '$110' },
  { date: 'Jan 14, 2026', service: 'Signature Cut + Beard', barber: 'Devon Richards', amount: '$110' },
]
</script>

<template>
  <div class="dash-root">
    <!-- Welcome card -->
    <div class="welcome-card app-enter">
      <div class="welcome-glow"></div>
      <div class="welcome-body">
        <div class="welcome-avatar">MJ</div>
        <div class="welcome-text">
          <div class="welcome-name">Welcome back, Marcus</div>
          <div class="welcome-meta">
            <span class="app-badge vip">
              <i class="ph ph-crown-simple"></i>
              VIP Member
            </span>
            <span class="meta-sep">·</span>
            <span class="welcome-billing">Unlimited cuts · Next billing Mar 15</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats row -->
    <div class="stats-grid">
      <div v-for="(s, i) in stats" :key="s.label"
        class="app-stat app-enter"
        :class="`app-d${i + 1}`"
      >
        <div class="app-stat-label">{{ s.label }}</div>
        <div class="app-stat-value">{{ s.value }}</div>
        <div class="app-stat-sub">{{ s.sub }}</div>
        <i :class="`ph ${s.icon} app-stat-icon`"></i>
      </div>
    </div>

    <!-- Next appointment + AI nudge -->
    <div class="row-2">
      <!-- Next appointment -->
      <div class="app-card lift app-enter app-d3 next-appt-card">
        <div class="card-header-row">
          <div class="app-section-label">Next Appointment</div>
          <span class="app-badge green">
            <span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#6dc97c;margin-right:3px;"></span>
            Confirmed
          </span>
        </div>
        <div class="appt-body">
          <div>
            <div class="appt-date">Tuesday, Mar 10</div>
            <div class="appt-service">Signature Cut + Beard</div>
            <div class="appt-meta">
              <i class="ph ph-user"></i> Devon Richards
              <span class="appt-sep">·</span>
              <i class="ph ph-map-pin"></i> Downtown
            </div>
          </div>
          <div class="appt-countdown">
            <div class="countdown-num">2</div>
            <div class="countdown-label">days away</div>
          </div>
        </div>
        <hr class="app-divider-gold" style="margin:16px 0;" />
        <button class="app-btn ghost" style="width:100%;justify-content:center;" @click="router.push('/app/client/appointments')">
          <i class="ph ph-calendar"></i>
          Manage Appointments
        </button>
      </div>

      <!-- AI rebooking nudge -->
      <div class="app-card gold app-enter app-d4 nudge-card">
        <div class="nudge-icon-row">
          <div class="nudge-icon">
            <i class="ph ph-sparkle"></i>
          </div>
          <div class="nudge-label">Smart Rebooking</div>
        </div>
        <div class="nudge-text">
          Based on your 4-week pattern, you're due for a cut this week.
        </div>
        <div class="nudge-sub">
          Your last 8 visits average every 26 days — you're at day 24.
        </div>
        <div class="nudge-progress">
          <div class="nudge-progress-label">
            <span>Visit pattern</span>
            <span>24 / 26 days</span>
          </div>
          <div class="app-progress">
            <div class="app-progress-fill" style="width:92%"></div>
          </div>
        </div>
        <button class="app-btn primary nudge-btn" @click="router.push('/app/client/appointments')">
          <i class="ph ph-lightning"></i>
          Quick Rebook
        </button>
      </div>
    </div>

    <!-- Recent visits -->
    <div class="app-card app-enter app-d5">
      <div class="card-header-row" style="padding:20px 20px 0;">
        <div class="app-section-label" style="margin:0">Recent Visits</div>
        <button class="app-btn ghost" style="padding:5px 12px;font-size:0.74rem;" @click="router.push('/app/client/history')">
          View All <i class="ph ph-arrow-right" style="font-size:0.75rem;"></i>
        </button>
      </div>
      <div style="padding:12px 0 8px;">
        <div v-for="(a, i) in recentActivity" :key="i" class="visit-row">
          <div class="visit-icon">
            <i class="ph ph-scissors"></i>
          </div>
          <div class="visit-info">
            <div class="visit-service">{{ a.service }}</div>
            <div class="visit-meta">{{ a.date }} · {{ a.barber }}</div>
          </div>
          <div class="visit-amount">{{ a.amount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dash-root {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: 'Inter', sans-serif;
  max-width: 1000px;
}

/* ── Welcome card ─────────────────────────────────── */
.welcome-card {
  background: var(--app-surface);
  border: 1px solid var(--app-border-dim);
  border-radius: 14px;
  padding: 22px 24px;
  position: relative;
  overflow: hidden;
}
.welcome-card::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent);
}
.welcome-glow {
  position: absolute;
  top: -60px; right: -60px;
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%);
  pointer-events: none;
}
.welcome-body { display: flex; align-items: center; gap: 18px; position: relative; }
.welcome-avatar {
  width: 48px; height: 48px;
  border-radius: 50%;
  background: rgba(232,232,232,0.1);
  border: 1.5px solid rgba(232,232,232,0.22);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.85rem; font-weight: 700; color: #e8e8e8;
  flex-shrink: 0;
}
.welcome-text { flex: 1; }
.welcome-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--app-text);
  margin-bottom: 8px;
}
.welcome-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.meta-sep { color: var(--app-text-muted); }
.welcome-billing { font-size: 0.78rem; color: var(--app-text-dim); }

/* ── Stats grid ───────────────────────────────────── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

/* ── Row 2 ────────────────────────────────────────── */
.row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: start;
}

.next-appt-card { padding: 20px; }
.card-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.appt-body { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
.appt-date { font-size: 1.1rem; font-weight: 700; color: var(--app-text); margin-bottom: 5px; }
.appt-service { font-size: 0.85rem; color: var(--app-text-dim); margin-bottom: 4px; }
.appt-meta {
  font-size: 0.78rem;
  color: var(--app-text-muted);
  display: flex;
  align-items: center;
  gap: 5px;
}
.appt-sep { color: var(--app-border); }
.appt-countdown { text-align: right; flex-shrink: 0; }
.countdown-num {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--app-gold);
  line-height: 1;
}
.countdown-label { font-size: 0.7rem; color: var(--app-text-muted); margin-top: 2px; }

/* ── AI nudge card ────────────────────────────────── */
.nudge-card { padding: 20px; display: flex; flex-direction: column; gap: 12px; }
.nudge-icon-row { display: flex; align-items: center; gap: 10px; }
.nudge-icon {
  width: 32px; height: 32px;
  border-radius: 8px;
  background: rgba(201,168,76,0.15);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.nudge-icon i { color: #c9a84c; font-size: 1rem; }
.nudge-label { font-size: 0.78rem; font-weight: 700; color: #c9a84c; letter-spacing: 0.04em; }
.nudge-text { font-size: 0.9rem; font-weight: 600; color: var(--app-text); line-height: 1.5; }
.nudge-sub { font-size: 0.78rem; color: var(--app-text-dim); line-height: 1.5; }
.nudge-progress { display: flex; flex-direction: column; gap: 6px; }
.nudge-progress-label {
  display: flex; justify-content: space-between;
  font-size: 0.7rem; color: var(--app-text-muted);
}
.nudge-btn { margin-top: 4px; width: 100%; justify-content: center; }

/* ── Recent visits ────────────────────────────────── */
.visit-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 20px;
  transition: background 0.15s;
}
.visit-row:hover { background: rgba(201,168,76,0.025); }
.visit-icon {
  width: 34px; height: 34px;
  border-radius: 9px;
  background: var(--app-subtle);
  border: 1px solid var(--app-border);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.visit-icon i { font-size: 0.9rem; color: var(--app-text-muted); }
.visit-info { flex: 1; min-width: 0; }
.visit-service { font-size: 0.85rem; font-weight: 600; color: var(--app-text); }
.visit-meta { font-size: 0.72rem; color: var(--app-text-muted); margin-top: 2px; }
.visit-amount { font-size: 0.92rem; font-weight: 700; color: var(--app-gold); flex-shrink: 0; }
</style>
