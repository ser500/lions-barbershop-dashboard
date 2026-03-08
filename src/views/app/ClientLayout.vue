<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { label: 'Dashboard',    icon: 'ph-house',                    to: '/app/client/dashboard' },
  { label: 'Appointments', icon: 'ph-calendar-check',           to: '/app/client/appointments' },
  { label: 'History',      icon: 'ph-clock-counter-clockwise',  to: '/app/client/history' },
  { label: 'Membership',   icon: 'ph-crown-simple',             to: '/app/client/membership' },
  { label: 'Preferences',  icon: 'ph-sliders',                  to: '/app/client/preferences' },
  { label: 'AI',           icon: 'ph-robot',                    to: '/app/client/ai', badge: 'AI' },
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
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-3 py-4 overflow-y-auto">
        <RouterLink
          v-for="item in navItems"
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
      </nav>

      <!-- User footer -->
      <div class="px-4 py-4" style="border-top:1px solid #1a1a1a">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style="background:rgba(232,232,232,0.15);color:#e8e8e8;border:1px solid rgba(232,232,232,0.3)">MJ</div>
          <div class="flex-1 min-w-0">
            <div class="text-xs font-semibold text-zinc-200 truncate">Marcus Johnson</div>
            <div class="text-xs" style="color:#e8e8e8">VIP Member</div>
          </div>
          <RouterLink to="/app" title="Switch Role">
            <i class="ph ph-arrows-left-right text-zinc-600 cursor-pointer hover:text-zinc-400 transition-colors"></i>
          </RouterLink>
        </div>
      </div>
    </aside>

    <!-- Main -->
    <main class="flex-1 flex flex-col h-full overflow-hidden" style="background:#0a0a0a">
      <header class="flex items-center justify-between px-6 py-3 flex-shrink-0" style="background:#050505;border-bottom:1px solid #1a1a1a;height:56px">
        <div style="font-size:0.85rem;font-weight:600;color:#e5e7eb">My Portal</div>
        <div class="flex items-center gap-3">
          <span style="font-size:0.75rem;color:#6b7280">{{ today }}</span>
          <span style="font-size:0.72rem;padding:2px 8px;border-radius:20px;font-weight:600;background:rgba(232,232,232,0.1);color:#e8e8e8;border:1px solid rgba(232,232,232,0.2)">VIP Member</span>
        </div>
      </header>
      <div class="flex-1 overflow-y-auto">
        <RouterView />
      </div>
    </main>
  </div>
</template>
