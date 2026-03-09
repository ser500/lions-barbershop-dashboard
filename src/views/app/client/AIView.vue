<script setup>
import QueVexChat from '../../../components/app/QueVexChat.vue'
</script>

<template>
  <div class="ai-page">
    <div class="ai-page-header">
      <div class="ai-page-title-group">
        <div class="ai-orb">
          <i class="ph ph-sparkle"></i>
        </div>
        <div>
          <h1 class="ai-page-title">QueVex Intelligence</h1>
          <p class="ai-page-sub">Personalized help with appointments, memberships, and rebooking</p>
        </div>
      </div>
    </div>
    <div class="ai-chat-wrapper">
      <QueVexChat role="client" />
    </div>
  </div>
</template>

<style scoped>
.ai-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px;
  gap: 20px;
  font-family: 'Inter', sans-serif;
}

.ai-page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.ai-page-title-group {
  display: flex;
  align-items: center;
  gap: 14px;
}

.ai-orb {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #c9a84c 0%, #8a6a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #000;
  box-shadow: 0 0 24px rgba(201, 168, 76, 0.35);
  flex-shrink: 0;
}

.ai-page-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--app-text);
  margin: 0;
  letter-spacing: -0.01em;
}

.ai-page-sub {
  font-size: 0.78rem;
  color: var(--app-text-muted);
  margin: 2px 0 0;
}

.ai-chat-wrapper {
  flex: 1;
  min-height: 0;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--app-border);
}
</style>
