<script setup>
import { ref } from 'vue'
defineProps({ role: String, text: String })
const open = ref(true)
</script>
<template>
  <div v-if="text" style="border-left:3px solid #b8960c;background:#111111;border-radius:0 8px 8px 0;margin-bottom:24px">
    <div class="flex items-center justify-between px-4 py-3 cursor-pointer" @click="open = !open">
      <div class="flex items-center gap-2">
        <i class="ph ph-sparkle" style="color:#b8960c;font-size:1rem"></i>
        <span style="font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#b8960c">AI Insights</span>
      </div>
      <i :class="open ? 'ph-caret-up' : 'ph-caret-down'" class="ph" style="color:#4b5563;font-size:0.75rem"></i>
    </div>
    <div v-show="open" class="px-4 pb-4" style="font-size:0.85rem;color:#d1d5db;line-height:1.6">{{ text }}</div>
  </div>
</template>
