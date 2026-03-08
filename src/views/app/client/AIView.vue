<script setup>
import QueVexChat from '../../../components/app/QueVexChat.vue'
</script>
<template>
  <div class="font-inter flex flex-col" style="height:calc(100vh - 56px)">
    <div class="px-6 pt-5 pb-4 flex-shrink-0" style="border-bottom:1px solid #1a1a1a">
      <div style="font-size:1.1rem;font-weight:700;color:#e5e7eb;margin-bottom:2px">QueVex AI — My Assistant</div>
      <div style="font-size:0.8rem;color:#6b7280">Ask about your appointments, membership, and rebooking.</div>
    </div>
    <div class="flex-1 overflow-hidden">
      <QueVexChat role="client" />
    </div>
  </div>
</template>
