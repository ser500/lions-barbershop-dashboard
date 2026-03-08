<script setup>
import { useRoute } from 'vue-router'
import LiveFeedTicker from '../../components/app/LiveFeedTicker.vue'

const route = useRoute()

const chainItems = [
  { label: 'Overview',  icon: 'ph-squares-four',  to: '/app/super-admin/overview' },
  { label: 'Locations', icon: 'ph-map-pin',        to: '/app/super-admin/locations' },
  { label: 'Analytics', icon: 'ph-chart-line',     to: '/app/super-admin/analytics' },
]

const businessItems = [
  { label: 'Revenue',    icon: 'ph-currency-dollar', to: '/app/super-admin/revenue' },
  { label: 'Membership', icon: 'ph-crown-simple',    to: '/app/super-admin/membership' },
  { label: 'Staff',      icon: 'ph-users',           to: '/app/super-admin/staff' },
]

const controlItems = [
  { label: 'Settings', icon: 'ph-gear',  to: '/app/super-admin/settings' },
  { label: 'AI',       icon: 'ph-robot', to: '/app/super-admin/ai', badge: 'AI' },
]

function isActive(to) {
  return route.path === to || route.path.startsWith(to + '/')
}

const today = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
</script>
<template>
  <div class="w-full h-screen flex overflow-hidden font-inter" style="background:#050505">
    <!-- Sidebar -->
    <aside class="flex flex-col h-full flex-shrink-0" style="width:240px;background:#0a0a0a;border-right:1px solid #1a1a1a">
      <!-- Logo -->
      <div class="px-5 py-5" style="border-bottom:1px solid #1a1a1a">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style="background:linear-gradient(135deg,#b8960c,#8a7009)">
            <i class="ph ph-scissors text-black text-sm"></i>
          </div>
          <div>
            <div class="font-cinzel font-bold text-sm" style="color:#b8960c">LION'S</div>
            <div class="font-cinzel text-xs text-zinc-500 tracking-widest">BARBERSHOP</div>
          </div>
        </div>
        <div class="mt-3 text-xs px-2 py-1 rounded-md" style="background:rgba(184,150,12,0.1);color:#b8960c;border:1px solid rgba(184,150,12,0.2);display:inline-block">Super Admin</div>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-3 py-4 overflow-y-auto">
        <div class="mb-5">
          <div class="px-3 mb-2 text-xs font-semibold tracking-widest uppercase" style="color:#3f3f46">Chain</div>
          <RouterLink
            v-for="item in chainItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-all"
            :style="isActive(item.to)
              ? 'background:rgba(184,150,12,0.15);color:#b8960c;border:1px solid rgba(184,150,12,0.3)'
              : 'color:#6b7280;border:1px solid transparent'"
          >
            <i :class="`ph ${item.icon} text-base`"></i>
            {{ item.label }}
          </RouterLink>
        </div>
        <div class="mb-5">
          <div class="px-3 mb-2 text-xs font-semibold tracking-widest uppercase" style="color:#3f3f46">Business</div>
          <RouterLink
            v-for="item in businessItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-all"
            :style="isActive(item.to)
              ? 'background:rgba(184,150,12,0.15);color:#b8960c;border:1px solid rgba(184,150,12,0.3)'
              : 'color:#6b7280;border:1px solid transparent'"
          >
            <i :class="`ph ${item.icon} text-base`"></i>
            {{ item.label }}
          </RouterLink>
        </div>
        <div>
          <div class="px-3 mb-2 text-xs font-semibold tracking-widest uppercase" style="color:#3f3f46">Control</div>
          <RouterLink
            v-for="item in controlItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-all"
            :style="isActive(item.to)
              ? 'background:rgba(184,150,12,0.15);color:#b8960c;border:1px solid rgba(184,150,12,0.3)'
              : 'color:#6b7280;border:1px solid transparent'"
          >
            <i :class="`ph ${item.icon} text-base`"></i>
            {{ item.label }}
            <span v-if="item.badge" class="ml-auto text-xs font-bold px-1.5 py-0.5 rounded" style="background:#b8960c;color:#000;font-size:0.6rem">{{ item.badge }}</span>
          </RouterLink>
        </div>
      </nav>

      <!-- User footer -->
      <div class="px-4 py-4" style="border-top:1px solid #1a1a1a">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0" style="background:linear-gradient(135deg,#b8960c,#8a7009)">LA</div>
          <div class="flex-1 min-w-0">
            <div class="text-xs font-semibold text-zinc-200 truncate">Lion's Admin</div>
            <div class="text-xs text-zinc-600">Super Admin</div>
          </div>
          <RouterLink to="/app" title="Switch Role">
            <i class="ph ph-arrows-left-right text-zinc-600 cursor-pointer hover:text-zinc-400 transition-colors"></i>
          </RouterLink>
        </div>
      </div>
    </aside>

    <!-- Main -->
    <main class="flex-1 flex flex-col h-full overflow-hidden" style="background:#0a0a0a">
      <!-- Topbar -->
      <header class="flex items-center justify-between px-6 py-3 flex-shrink-0" style="background:#050505;border-bottom:1px solid #1a1a1a;height:56px">
        <div style="font-size:0.85rem;font-weight:600;color:#e5e7eb">Chain Management</div>
        <div class="flex items-center gap-3">
          <span style="font-size:0.75rem;color:#6b7280">{{ today }}</span>
          <span style="font-size:0.72rem;background:rgba(34,197,94,0.1);color:#22c55e;border:1px solid rgba(34,197,94,0.2);padding:2px 8px;border-radius:20px">2 Locations Open</span>
        </div>
      </header>
      <LiveFeedTicker />
      <div class="flex-1 overflow-y-auto">
        <RouterView />
      </div>
    </main>
  </div>
</template>
