<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const dailyOpsItems = [
  { label: 'Overview', icon: 'ph-squares-four', to: '/dashboard/staff/overview' },
  { label: 'Schedule', icon: 'ph-calendar', to: '/dashboard/staff/schedule' },
  { label: 'Queue', icon: 'ph-users', to: '/dashboard/staff/queue' },
]

const mgmtItems = [
  { label: 'Clients', icon: 'ph-address-book', to: '/dashboard/staff/clients' },
  { label: 'Revenue', icon: 'ph-chart-bar', to: '/dashboard/staff/revenue' },
  { label: 'Inventory', icon: 'ph-package', to: '/dashboard/staff/inventory' },
]
</script>

<template>
  <aside class="flex flex-col h-full font-inter" style="width:280px;background:#0a0a0a;border-right:1px solid #1a1a1a;flex-shrink:0">
    <!-- Logo -->
    <div class="px-6 py-6" style="border-bottom:1px solid #1a1a1a">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-full flex items-center justify-center" style="background:linear-gradient(135deg,#b8960c,#8a7009)">
          <i class="ph ph-scissors text-black text-base"></i>
        </div>
        <div>
          <div class="font-cinzel font-bold text-sm" style="color:#b8960c">LION'S</div>
          <div class="font-cinzel text-xs text-zinc-500 tracking-widest">BARBERSHOP</div>
        </div>
      </div>
    </div>

    <!-- Nav -->
    <nav class="flex-1 px-3 py-4 overflow-y-auto">
      <div class="mb-6">
        <div class="px-3 mb-2 text-xs font-semibold tracking-widest uppercase text-zinc-600">Daily Ops</div>
        <RouterLink
          v-for="item in dailyOpsItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-all"
          :style="route.path === item.to
            ? 'background:rgba(184,150,12,0.15);color:#b8960c;border:1px solid rgba(184,150,12,0.3)'
            : 'color:#6b7280;border:1px solid transparent'"
        >
          <i :class="`ph ${item.icon} text-base`"></i>
          {{ item.label }}
        </RouterLink>
      </div>
      <div>
        <div class="px-3 mb-2 text-xs font-semibold tracking-widest uppercase text-zinc-600">Management</div>
        <RouterLink
          v-for="item in mgmtItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-all"
          :style="route.path === item.to
            ? 'background:rgba(184,150,12,0.15);color:#b8960c;border:1px solid rgba(184,150,12,0.3)'
            : 'color:#6b7280;border:1px solid transparent'"
        >
          <i :class="`ph ${item.icon} text-base`"></i>
          {{ item.label }}
        </RouterLink>
      </div>
    </nav>

    <!-- User footer -->
    <div class="px-4 py-4" style="border-top:1px solid #1a1a1a">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black" style="background:linear-gradient(135deg,#b8960c,#8a7009)">MV</div>
        <div class="flex-1 min-w-0">
          <div class="text-xs font-semibold text-zinc-200 truncate">Marcus Vance</div>
          <div class="text-xs text-zinc-600">Senior Barber</div>
        </div>
        <i class="ph ph-sign-out text-zinc-600 cursor-pointer hover:text-zinc-400 transition-colors"></i>
      </div>
    </div>
  </aside>
</template>
