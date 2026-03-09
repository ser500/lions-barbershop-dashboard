<script setup>
import { ref } from 'vue'
defineProps({ role: String, text: String })
const open = ref(true)
</script>
<template>
  <div v-if="text" class="app-card gold app-enter" style="margin-bottom:24px">
    <div class="flex items-center justify-between cursor-pointer" style="padding:16px 20px" @click="open = !open">
      <div class="flex items-center gap-2">
        <i class="ph ph-sparkle" style="color:var(--app-gold);font-size:1.1rem;filter:drop-shadow(0 0 6px rgba(201,168,76,0.5))"></i>
        <span style="font-size:0.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--app-gold)">AI Insights</span>
      </div>
      <i :class="open ? 'ph-caret-up' : 'ph-caret-down'" class="ph" style="color:var(--app-text-muted);font-size:0.75rem"></i>
    </div>
    <div class="collapse-body" :class="{ open }" style="padding:0 20px">
      <div class="collapse-inner" style="font-size:0.875rem;color:var(--app-text-dim);line-height:1.6;padding-bottom:16px">{{ text }}</div>
    </div>
  </div>
</template>
<style scoped>
.collapse-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.collapse-body.open {
  max-height: 200px;
}
</style>
