<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <div class="sidebar-brand">
        <span>🦁</span>
        <span class="brand-text">LION'S ANALYTICS</span>
      </div>
      <nav class="sidebar-nav">
        <RouterLink to="/dashboard/overview" class="nav-item">
          <span>📊</span> Overview
        </RouterLink>
        <RouterLink to="/dashboard/traffic" class="nav-item">
          <span>🚦</span> Traffic
        </RouterLink>
        <RouterLink to="/dashboard/behavior" class="nav-item">
          <span>🖱️</span> Behavior
        </RouterLink>
        <RouterLink to="/dashboard/funnel" class="nav-item">
          <span>🔀</span> Booking Funnel
        </RouterLink>
        <RouterLink to="/dashboard/services" class="nav-item">
          <span>✂️</span> Services
        </RouterLink>
        <RouterLink to="/dashboard/team" class="nav-item">
          <span>👥</span> Team
        </RouterLink>
      </nav>
      <div class="sidebar-footer">
        <RouterLink to="/" class="back-link">← View Site</RouterLink>
      </div>
    </aside>
    <main class="dashboard-main">
      <div class="dash-topbar">
        <div class="topbar-left">
          <h1 class="page-title">{{ pageTitle }}</h1>
          <p class="page-date">{{ currentDate }}</p>
        </div>
        <div class="topbar-right">
          <span class="live-badge">● LIVE</span>
        </div>
      </div>
      <div class="dash-content">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import dayjs from 'dayjs'

const route = useRoute()
const currentDate = dayjs().format('dddd, MMMM D YYYY')

const titles = {
  '/dashboard/overview': 'Overview',
  '/dashboard/traffic': 'Traffic Sources',
  '/dashboard/behavior': 'User Behavior',
  '/dashboard/funnel': 'Booking Funnel',
  '/dashboard/services': 'Services Analytics',
  '/dashboard/team': 'Team Performance',
}
const pageTitle = computed(() => titles[route.path] || 'Dashboard')
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #0d0d0d;
  color: var(--color-white);
  font-family: var(--font-body);
}
.sidebar {
  width: 240px;
  flex-shrink: 0;
  background: #111;
  border-right: 1px solid rgba(201,168,76,0.15);
  display: flex;
  flex-direction: column;
  padding: 0;
}
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 24px 20px;
  border-bottom: 1px solid rgba(201,168,76,0.1);
  font-size: 1.2rem;
}
.brand-text {
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 2px;
  color: var(--color-gold);
}
.sidebar-nav {
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  gap: 4px;
  flex: 1;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--color-gray-light);
  transition: all 0.2s;
  text-decoration: none;
}
.nav-item:hover { background: rgba(201,168,76,0.08); color: var(--color-white); }
.nav-item.router-link-active { background: rgba(201,168,76,0.12); color: var(--color-gold); }
.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid rgba(201,168,76,0.1);
}
.back-link { font-size: 0.82rem; color: var(--color-gray); transition: color 0.2s; }
.back-link:hover { color: var(--color-gold); }
.dashboard-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.dash-topbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 32px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.page-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  letter-spacing: 2px;
  color: var(--color-white);
  margin-bottom: 4px;
}
.page-date { font-size: 0.8rem; color: var(--color-gray); }
.live-badge {
  font-size: 0.75rem;
  color: #4ade80;
  letter-spacing: 1px;
  padding: 6px 12px;
  background: rgba(74,222,128,0.1);
  border-radius: 20px;
  border: 1px solid rgba(74,222,128,0.2);
}
.dash-content { flex: 1; overflow-y: auto; padding: 32px; }
</style>
