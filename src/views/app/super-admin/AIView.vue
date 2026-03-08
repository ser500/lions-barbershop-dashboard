<script setup>
import QueVexChat from '../../../components/app/QueVexChat.vue'
</script>
<template>
  <div class="font-inter flex flex-col" style="height:calc(100vh - 92px)">
    <div class="px-6 pt-5 pb-4 flex-shrink-0" style="border-bottom:1px solid #1a1a1a">
      <div style="font-size:1.1rem;font-weight:700;color:#e5e7eb;margin-bottom:2px">QueVex AI — Chain Intelligence</div>
      <div style="font-size:0.8rem;color:#6b7280">Ask anything about revenue, staff, locations, memberships, and performance across your entire chain.</div>
    </div>
    <div class="flex-1 overflow-hidden">
      <QueVexChat role="super-admin" />
    </div>
  </div>
</template>
