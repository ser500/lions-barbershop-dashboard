<script setup>
const emit = defineEmits(['openNewAppt'])

const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
</script>

<template>
  <header class="px-6 py-4 flex items-center gap-4 font-inter" style="background:#0a0a0a;border-bottom:1px solid #1a1a1a;flex-shrink:0">
    <!-- Search -->
    <div class="flex-1 relative max-w-sm">
      <i class="ph ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm"></i>
      <input
        type="text"
        placeholder="Search clients, appointments..."
        class="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-zinc-900 text-zinc-300 placeholder-zinc-600 outline-none transition-all"
        style="border:1px solid #2a2a2a"
        @focus="e => e.target.style.borderColor='#b8960c'"
        @blur="e => e.target.style.borderColor='#2a2a2a'"
      />
    </div>

    <!-- Date -->
    <div class="hidden md:block text-xs text-zinc-500 font-inter">{{ today }}</div>

    <!-- Bell -->
    <button class="relative p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-all" style="border:1px solid #1a1a1a">
      <i class="ph ph-bell text-base"></i>
      <span class="absolute top-1 right-1 w-2 h-2 rounded-full" style="background:#b8960c"></span>
    </button>

    <!-- New Appt -->
    <button
      class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-black transition-all hover:opacity-90"
      style="background:linear-gradient(135deg,#b8960c,#8a7009)"
      @click="emit('openNewAppt')"
    >
      <i class="ph ph-plus text-sm"></i>
      New Appt
    </button>
  </header>
</template>
