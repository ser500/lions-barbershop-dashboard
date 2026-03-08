<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLocationStore } from '../../stores/location'
import LiveFeedTicker from '../../components/app/LiveFeedTicker.vue'
import NewApptModal from '../../components/staff/NewApptModal.vue'

const route = useRoute()
const locationStore = useLocationStore()
const showModal = ref(false)

const dailyOpsItems = [
  { label: 'Overview',  icon: 'ph-squares-four', to: '/app/staff/overview' },
  { label: 'Schedule',  icon: 'ph-calendar',     to: '/app/staff/schedule' },
  { label: 'Queue',     icon: 'ph-users',         to: '/app/staff/queue' },
]

const mgmtItems = [
  { label: 'Clients',   icon: 'ph-address-book', to: '/app/staff/clients' },
  { label: 'Revenue',   icon: 'ph-chart-bar',    to: '/app/staff/revenue' },
  { label: 'Inventory', icon: 'ph-package',      to: '/app/staff/inventory' },
  { label: 'AI',        icon: 'ph-robot',        to: '/app/staff/ai', badge: 'AI' },
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
      <!-- Logo + location -->
      <div class="px-5 py-5" style="border-bottom:1px solid #1a1a1a">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style="background:linear-gradient(135deg,#b8960c,#8a7009)">
            <i class="ph ph-scissors text-black text-sm"></i>
          </div>
          <div>
            <div class="font-cinzel font-bold text-sm" style="color:#b8960c">LION'S</div>
            <div class="font-cinzel text-xs text-zinc-500 tracking-widest">BARBERSHOP</div>
          </div>
        </div>
        <select
          :value="locationStore.activeLocationId"
          @change="e => locationStore.setActive(e.target.value)"
          style="width:100%;background:#111;border:1px solid #2a2a2a;color:#e5e7eb;font-size:0.78rem;padding:6px 8px;border-radius:6px;outline:none;font-family:'Inter',sans-serif;cursor:pointer"
        >
          <option v-for="loc in locationStore.locations.filter(l => l.status !== 'coming-soon')" :key="loc.id" :value="loc.id">
            {{ loc.name }}
          </option>
        </select>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-3 py-4 overflow-y-auto">
        <div class="mb-5">
          <div class="px-3 mb-2 text-xs font-semibold tracking-widest uppercase" style="color:#3f3f46">Daily Ops</div>
          <RouterLink
            v-for="item in dailyOpsItems"
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
          <div class="px-3 mb-2 text-xs font-semibold tracking-widest uppercase" style="color:#3f3f46">Management</div>
          <RouterLink
            v-for="item in mgmtItems"
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
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0" style="background:linear-gradient(135deg,#b8960c,#8a7009)">MV</div>
          <div class="flex-1 min-w-0">
            <div class="text-xs font-semibold text-zinc-200 truncate">Marcus Vance</div>
            <div class="text-xs text-zinc-600">Senior Barber</div>
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
        <div style="font-size:0.85rem;font-weight:600;color:#e5e7eb">Staff Panel</div>
        <div class="flex items-center gap-3">
          <span style="font-size:0.75rem;color:#6b7280">{{ today }}</span>
          <button
            class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-black transition-all hover:opacity-90"
            style="background:linear-gradient(135deg,#b8960c,#8a7009)"
            @click="showModal = true"
          >
            <i class="ph ph-plus text-xs"></i>
            New Appt
          </button>
        </div>
      </header>
      <LiveFeedTicker />
      <div class="flex-1 overflow-y-auto">
        <RouterView />
      </div>
    </main>

    <NewApptModal v-model="showModal" />
  </div>
</template>
