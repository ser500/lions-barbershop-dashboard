<script setup>
defineProps({
  staff: { type: Array, required: true }
})
</script>

<template>
  <div class="rounded-xl p-5 font-inter mx-6 mb-6" style="background:#111;border:1px solid #1e1e1e">
    <div class="mb-5">
      <h3 class="font-cinzel font-bold text-zinc-100 mb-0.5">Staff Performance</h3>
      <p class="text-xs text-zinc-500">Today's metrics by barber</p>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr style="border-bottom:1px solid #1e1e1e">
            <th class="text-left pb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Barber</th>
            <th class="text-left pb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Appointments</th>
            <th class="text-left pb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Revenue</th>
            <th class="text-left pb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Utilization</th>
            <th class="text-left pb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in staff" :key="s.id" class="transition-colors hover:bg-zinc-900/50" style="border-bottom:1px solid #141414">
            <td class="py-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black" style="background:linear-gradient(135deg,#b8960c,#8a7009)">{{ s.initials }}</div>
                <span class="font-medium text-zinc-200 text-sm">{{ s.name }}</span>
              </div>
            </td>
            <td class="py-3 text-zinc-300 text-sm">{{ s.appts }}</td>
            <td class="py-3 text-zinc-300 text-sm font-medium" style="color:#b8960c">{{ s.revenue }}</td>
            <td class="py-3">
              <div class="flex items-center gap-3">
                <div class="flex-1 h-1.5 rounded-full overflow-hidden max-w-24" style="background:#1f2937">
                  <div class="h-full rounded-full transition-all" :style="{ width: `${s.utilization}%`, background: 'linear-gradient(to right,#b8960c,#8a7009)' }"></div>
                </div>
                <span class="text-xs text-zinc-400 w-9">{{ s.utilization }}%</span>
              </div>
            </td>
            <td class="py-3">
              <span
                class="text-xs font-medium px-2.5 py-1 rounded-full"
                :style="s.status === 'active'
                  ? 'background:rgba(34,197,94,0.1);color:#22c55e;border:1px solid rgba(34,197,94,0.2)'
                  : 'background:rgba(251,191,36,0.1);color:#fbbf24;border:1px solid rgba(251,191,36,0.2)'"
              >{{ s.status === 'active' ? 'Active' : 'On Break' }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
