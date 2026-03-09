<script setup>
import { useRoute } from 'vue-router'
import LiveFeedTicker from '../../components/app/LiveFeedTicker.vue'

const route = useRoute()

const navItems = [
  { label: 'Overview',  icon: 'ph-squares-four',    to: '/app/barber/overview' },
  { label: 'Schedule',  icon: 'ph-calendar',        to: '/app/barber/schedule' },
  { label: 'Clients',   icon: 'ph-address-book',    to: '/app/barber/clients' },
  { label: 'Earnings',  icon: 'ph-currency-dollar', to: '/app/barber/earnings' },
  { label: 'Reviews',   icon: 'ph-star',            to: '/app/barber/reviews' },
  { label: 'AI',        icon: 'ph-robot',           to: '/app/barber/ai', badge: 'AI' },
]

function isActive(to) {
  return route.path === to || route.path.startsWith(to + '/')
}

const today = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
</script>

<template>
  <div class="app-shell">
    <aside class="app-sidebar">
      <div class="sidebar-logo">
        <div class="sidebar-logo-icon">
          <i class="ph ph-scissors"></i>
        </div>
        <div>
          <div class="sidebar-brand font-cinzel">LION'S</div>
          <div class="sidebar-sub font-cinzel">BARBERSHOP</div>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="app-nav-section">My Panel</div>
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to"
          :class="['app-nav-item', isActive(item.to) && 'active']">
          <i :class="`ph ${item.icon}`" class="nav-icon"></i>
          {{ item.label }}
          <span v-if="item.badge" class="nav-ai-badge">{{ item.badge }}</span>
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        <div class="sidebar-user-avatar gold">DR</div>
        <div class="sidebar-user-info">
          <div class="sidebar-user-name">Devon Richards</div>
          <div class="sidebar-user-role">Senior Barber</div>
        </div>
        <RouterLink to="/app" class="sidebar-switch" title="Switch Role">
          <i class="ph ph-arrows-left-right"></i>
        </RouterLink>
      </div>
    </aside>

    <main class="app-main">
      <header class="app-topbar">
        <div class="topbar-title">My Barber Panel</div>
        <div class="topbar-right">
          <span class="topbar-date">{{ today }}</span>
          <span class="app-badge green">
            <span class="live-dot"></span>Downtown · Open
          </span>
        </div>
      </header>
      <LiveFeedTicker />
      <div class="app-content"><RouterView /></div>
    </main>
  </div>
</template>

<style scoped>
.app-shell { width:100%; height:100vh; display:flex; overflow:hidden; background:var(--app-bg); font-family:'Inter',sans-serif; }
.app-sidebar {
  width:240px; flex-shrink:0; height:100%;
  background:var(--app-sidebar); border-right:1px solid var(--app-border-dim);
  display:flex; flex-direction:column; position:relative;
}
.app-sidebar::before {
  content:''; position:absolute; top:0; left:0; right:0; height:200px;
  background:radial-gradient(ellipse at 50% -20%, rgba(201,168,76,0.08) 0%, transparent 70%); pointer-events:none;
}
.sidebar-logo { padding:20px 18px 16px; border-bottom:1px solid var(--app-border-dim); display:flex; align-items:center; gap:12px; }
.sidebar-logo-icon { width:34px; height:34px; border-radius:9px; background:linear-gradient(135deg,#c9a84c,#7a6008); display:flex; align-items:center; justify-content:center; flex-shrink:0; box-shadow:0 0 16px rgba(201,168,76,0.22); }
.sidebar-logo-icon i { font-size:1rem; color:#060810; }
.sidebar-brand { font-size:0.85rem; font-weight:700; color:#c9a84c; letter-spacing:0.1em; line-height:1.1; }
.sidebar-sub { font-size:0.62rem; color:rgba(255,255,255,0.2); letter-spacing:0.2em; text-transform:uppercase; }
.sidebar-nav { flex:1; padding:12px 10px; overflow-y:auto; }
.nav-icon { font-size:1rem; flex-shrink:0; }
.nav-ai-badge { margin-left:auto; font-size:0.6rem; font-weight:700; background:var(--app-gold); color:#060810; padding:2px 6px; border-radius:4px; }
.sidebar-footer { padding:14px 16px; border-top:1px solid var(--app-border-dim); display:flex; align-items:center; gap:10px; }
.sidebar-user-avatar { width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.7rem; font-weight:700; flex-shrink:0; background:rgba(232,232,232,0.1); color:#e8e8e8; border:1px solid rgba(232,232,232,0.2); }
.sidebar-user-avatar.gold { background:linear-gradient(135deg,#c9a84c,#7a6008); color:#060810; border:none; }
.sidebar-user-info { flex:1; min-width:0; }
.sidebar-user-name { font-size:0.78rem; font-weight:600; color:rgba(255,255,255,0.85); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.sidebar-user-role { font-size:0.68rem; color:var(--app-text-muted); }
.sidebar-switch { color:var(--app-text-muted); transition:color 0.15s; font-size:0.95rem; }
.sidebar-switch:hover { color:#c9a84c; }
.app-main { flex:1; display:flex; flex-direction:column; height:100%; overflow:hidden; background:var(--app-bg); }
.app-topbar { height:56px; flex-shrink:0; display:flex; align-items:center; justify-content:space-between; padding:0 24px; background:var(--app-sidebar); border-bottom:1px solid var(--app-border-dim); }
.topbar-title { font-size:0.85rem; font-weight:600; color:var(--app-text); letter-spacing:0.02em; }
.topbar-right { display:flex; align-items:center; gap:12px; }
.topbar-date { font-size:0.75rem; color:var(--app-text-muted); }
.live-dot { display:inline-block; width:5px; height:5px; border-radius:50%; background:#6dc97c; margin-right:2px; }
.app-content { flex:1; overflow-y:auto; }
.app-content::-webkit-scrollbar { width:4px; }
.app-content::-webkit-scrollbar-track { background:transparent; }
.app-content::-webkit-scrollbar-thumb { background:var(--app-border); border-radius:2px; }
</style>
