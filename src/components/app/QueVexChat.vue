<script setup>
import { ref, nextTick, watch, computed } from 'vue'
import { useQueVexStore } from '../../stores/quevex'

const props = defineProps({ role: { type: String, default: 'staff' } })

const store = useQueVexStore()
store.setRole(props.role)

const inputText = ref('')
const messagesEl = ref(null)

const promptSuggestions = computed(() => {
  const map = {
    'super-admin': ["Which location is underperforming?", "Show me MRR breakdown", "Who are top performers?"],
    'admin':       ["Who are my at-risk clients?", "How's today's utilization?", "What's driving revenue this week?"],
    'staff':       ["How long is today's wait?", "Any cancellations this afternoon?", "Who's next in queue?"],
    'barber':      ["What does Marcus usually get?", "How's my week looking?", "What should I upsell today?"],
    'client':      ["When should I rebook?", "What's my membership status?", "Book same as last time"],
  }
  return map[props.role] || map['staff']
})

async function send(text) {
  const msg = text || inputText.value.trim()
  if (!msg) return
  inputText.value = ''
  await store.sendMessage(msg)
  await nextTick()
  if (messagesEl.value) messagesEl.value.scrollTop = messagesEl.value.scrollHeight
}

watch(() => store.messages.length, async () => {
  await nextTick()
  if (messagesEl.value) messagesEl.value.scrollTop = messagesEl.value.scrollHeight
})
</script>

<template>
  <div class="qv-shell">

    <!-- Header -->
    <div class="qv-header">
      <div class="qv-header-left">
        <div class="qv-avatar">
          <i class="ph ph-robot"></i>
        </div>
        <div>
          <div class="qv-name">QueVex <span class="qv-badge">AI</span></div>
          <div class="qv-status"><span class="qv-dot"></span>Online · ready</div>
        </div>
      </div>
      <button class="qv-clear-btn" @click="store.clearMessages()">
        <i class="ph ph-arrow-counter-clockwise"></i>
        Clear
      </button>
    </div>

    <!-- Messages -->
    <div ref="messagesEl" class="qv-messages">

      <!-- Empty state -->
      <div v-if="store.messages.length === 0" class="qv-empty">
        <div class="qv-empty-glow"></div>
        <div class="qv-empty-icon">
          <i class="ph ph-sparkle"></i>
        </div>
        <div class="qv-empty-title">Ask me anything</div>
        <div class="qv-empty-sub">Revenue, staff performance, client trends, memberships — I know your business.</div>
        <div class="qv-prompt-grid">
          <button
            v-for="prompt in promptSuggestions"
            :key="prompt"
            class="qv-prompt-card"
            @click="send(prompt)"
          >
            <i class="ph ph-lightning"></i>
            {{ prompt }}
          </button>
        </div>
      </div>

      <!-- Messages list -->
      <template v-else>
        <div
          v-for="msg in store.messages"
          :key="msg.id"
          class="qv-msg-row"
          :class="msg.role === 'user' ? 'qv-msg-row--user' : 'qv-msg-row--ai'"
        >
          <!-- AI message -->
          <template v-if="msg.role === 'ai'">
            <div class="qv-msg-avatar">
              <i class="ph ph-robot"></i>
            </div>
            <div class="qv-msg-body">
              <div class="qv-msg-meta"><span class="qv-msg-sender">QueVex</span> · {{ msg.time }}</div>
              <div class="qv-bubble qv-bubble--ai">{{ msg.text }}</div>
            </div>
          </template>

          <!-- User message -->
          <template v-else>
            <div class="qv-msg-body qv-msg-body--user">
              <div class="qv-msg-meta qv-msg-meta--user">You · {{ msg.time }}</div>
              <div class="qv-bubble qv-bubble--user">{{ msg.text }}</div>
            </div>
          </template>
        </div>

        <!-- Typing indicator -->
        <div v-if="store.isTyping" class="qv-msg-row qv-msg-row--ai">
          <div class="qv-msg-avatar">
            <i class="ph ph-robot"></i>
          </div>
          <div class="qv-bubble qv-bubble--ai qv-bubble--typing">
            <span class="typing-dot"></span>
            <span class="typing-dot" style="animation-delay:0.18s"></span>
            <span class="typing-dot" style="animation-delay:0.36s"></span>
          </div>
        </div>
      </template>
    </div>

    <!-- Suggestion chips (when messages exist) -->
    <div v-if="store.messages.length > 0" class="qv-chips">
      <button
        v-for="prompt in promptSuggestions"
        :key="prompt"
        class="qv-chip"
        @click="send(prompt)"
      >{{ prompt }}</button>
    </div>

    <!-- Input -->
    <div class="qv-input-bar">
      <div class="qv-input-wrap">
        <i class="ph ph-chat-dots qv-input-icon"></i>
        <input
          v-model="inputText"
          type="text"
          class="qv-input"
          placeholder="Ask QueVex anything…"
          @keydown.enter="send()"
        />
        <button class="qv-send-btn" @click="send()" :disabled="!inputText.trim()">
          <i class="ph ph-paper-plane-tilt"></i>
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* ─── Shell ─────────────────────────────────────────────── */
.qv-shell {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--app-surface);
}

/* ─── Header ─────────────────────────────────────────────── */
.qv-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--app-border);
  background: var(--app-surface);
  flex-shrink: 0;
}

.qv-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.qv-avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #c9a84c, #8a6a1a);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-size: 1rem;
  box-shadow: 0 0 16px rgba(201,168,76,0.3);
  flex-shrink: 0;
}

.qv-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--app-text);
  display: flex;
  align-items: center;
  gap: 6px;
}

.qv-badge {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #000;
  background: linear-gradient(135deg, #c9a84c, #dbb95a);
  padding: 1px 6px;
  border-radius: 4px;
}

.qv-status {
  font-size: 0.68rem;
  color: var(--app-text-muted);
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 2px;
}

.qv-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 6px rgba(74,222,128,0.6);
}

.qv-clear-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--app-text-muted);
  background: var(--app-surface-2, rgba(255,255,255,0.04));
  border: 1px solid var(--app-border);
  border-radius: 7px;
  padding: 5px 12px;
  cursor: pointer;
  font-family: inherit;
  transition: color 0.2s, border-color 0.2s;
}
.qv-clear-btn:hover { color: var(--app-text); border-color: rgba(201,168,76,0.4); }

/* ─── Messages area ──────────────────────────────────────── */
.qv-messages {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  scroll-behavior: smooth;
}

/* ─── Empty state ────────────────────────────────────────── */
.qv-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  padding: 40px 20px;
  position: relative;
}

.qv-empty-glow {
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  pointer-events: none;
}

.qv-empty-icon {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05));
  border: 1px solid rgba(201,168,76,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  color: #c9a84c;
  margin-bottom: 18px;
  box-shadow: 0 0 32px rgba(201,168,76,0.15);
}

.qv-empty-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--app-text);
  margin-bottom: 8px;
}

.qv-empty-sub {
  font-size: 0.8rem;
  color: var(--app-text-muted);
  max-width: 340px;
  line-height: 1.5;
  margin-bottom: 28px;
}

.qv-prompt-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 420px;
}

.qv-prompt-card {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--app-surface-2, rgba(255,255,255,0.03));
  border: 1px solid var(--app-border);
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--app-text-dim);
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}
.qv-prompt-card i { color: #c9a84c; font-size: 0.9rem; flex-shrink: 0; }
.qv-prompt-card:hover {
  border-color: rgba(201,168,76,0.4);
  color: var(--app-text);
  background: rgba(201,168,76,0.04);
}

/* ─── Message rows ───────────────────────────────────────── */
.qv-msg-row {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  animation: msg-in 0.2s ease;
}
.qv-msg-row--user { flex-direction: row-reverse; }

@keyframes msg-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.qv-msg-avatar {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, #c9a84c, #8a6a1a);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-size: 0.75rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.qv-msg-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 76%;
}
.qv-msg-body--user { align-items: flex-end; }

.qv-msg-meta {
  font-size: 0.62rem;
  color: var(--app-text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}
.qv-msg-meta--user { justify-content: flex-end; }

.qv-msg-sender {
  color: #c9a84c;
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.04em;
}

/* ─── Bubbles ────────────────────────────────────────────── */
.qv-bubble {
  padding: 11px 15px;
  font-size: 0.84rem;
  line-height: 1.65;
  border-radius: 4px 12px 12px 12px;
}

.qv-bubble--ai {
  background: var(--app-surface-2, rgba(255,255,255,0.04));
  border: 1px solid var(--app-border);
  color: var(--app-text-dim);
  border-radius: 4px 12px 12px 12px;
}

.qv-bubble--user {
  background: linear-gradient(135deg, rgba(201,168,76,0.14), rgba(201,168,76,0.07));
  border: 1px solid rgba(201,168,76,0.22);
  color: var(--app-text);
  border-radius: 12px 4px 12px 12px;
}

/* Typing bubble */
.qv-bubble--typing {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 14px 18px;
}

.typing-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--app-text-muted);
  animation: typing-bounce 1.1s infinite;
}
@keyframes typing-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-5px); opacity: 1; }
}

/* ─── Chips (shown when messages exist) ─────────────────── */
.qv-chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  padding: 10px 20px;
  border-top: 1px solid var(--app-border);
  flex-shrink: 0;
}

.qv-chip {
  font-size: 0.71rem;
  font-weight: 500;
  color: var(--app-text-muted);
  background: transparent;
  border: 1px solid var(--app-border);
  border-radius: 20px;
  padding: 4px 12px;
  cursor: pointer;
  font-family: inherit;
  white-space: nowrap;
  transition: border-color 0.2s, color 0.2s;
}
.qv-chip:hover { border-color: rgba(201,168,76,0.5); color: #c9a84c; }

/* ─── Input bar ──────────────────────────────────────────── */
.qv-input-bar {
  padding: 14px 20px;
  border-top: 1px solid var(--app-border);
  flex-shrink: 0;
}

.qv-input-wrap {
  display: flex;
  align-items: center;
  gap: 0;
  background: var(--app-bg);
  border: 1px solid var(--app-border);
  border-radius: 12px;
  padding: 0 6px 0 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.qv-input-wrap:focus-within {
  border-color: rgba(201,168,76,0.5);
  box-shadow: 0 0 0 3px rgba(201,168,76,0.08);
}

.qv-input-icon {
  font-size: 0.95rem;
  color: var(--app-text-muted);
  flex-shrink: 0;
  margin-right: 8px;
}

.qv-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 12px 0;
  font-size: 0.875rem;
  color: var(--app-text);
  font-family: 'Inter', sans-serif;
}
.qv-input::placeholder { color: var(--app-text-muted); }

.qv-send-btn {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: linear-gradient(135deg, #c9a84c, #b8952e);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-size: 0.9rem;
  flex-shrink: 0;
  transition: opacity 0.2s, transform 0.1s;
}
.qv-send-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.qv-send-btn:not(:disabled):hover { opacity: 0.9; }
.qv-send-btn:not(:disabled):active { transform: scale(0.94); }
</style>
