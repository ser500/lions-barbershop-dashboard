<script setup>
defineProps({
  stats: { type: Object, required: true }
})

const cards = [
  { key: 'revenue',      label: "Today's Revenue",   icon: 'ph-currency-dollar', valueKey: 'revenue',      changeKey: 'revenueChange',      positive: true },
  { key: 'appointments', label: 'Appointments',       icon: 'ph-calendar-check',  valueKey: 'appointments', changeKey: 'appointmentsChange', positive: true },
  { key: 'newClients',   label: 'New Clients',        icon: 'ph-user-plus',       valueKey: 'newClients',   changeKey: 'newClientsChange',   positive: true },
  { key: 'avgTicket',    label: 'Avg Ticket',         icon: 'ph-receipt',         valueKey: 'avgTicket',    changeKey: 'avgTicketChange',    positive: true },
]
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6">
    <div
      v-for="card in cards"
      :key="card.key"
      class="rounded-xl p-5"
      style="background:#111;border:1px solid #1e1e1e"
    >
      <div class="flex items-center justify-between mb-4">
        <span class="text-xs font-semibold uppercase tracking-wider text-zinc-500">{{ card.label }}</span>
        <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:rgba(184,150,12,0.1);border:1px solid rgba(184,150,12,0.2)">
          <i :class="`ph ${card.icon} text-sm`" style="color:#b8960c"></i>
        </div>
      </div>
      <div class="text-2xl font-bold text-zinc-100 mb-1">{{ stats[card.valueKey] }}</div>
      <div class="flex items-center gap-1">
        <i class="ph ph-arrow-up text-xs" style="color:#22c55e"></i>
        <span class="text-xs font-medium" style="color:#22c55e">{{ stats[card.changeKey] }}</span>
        <span class="text-xs text-zinc-600 ml-1">vs yesterday</span>
      </div>
    </div>
  </div>
</template>
