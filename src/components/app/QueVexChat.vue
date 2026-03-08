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
    'admin': ["Who are my at-risk clients?", "How's today's utilization?", "What's driving revenue this week?"],
    'staff': ["How long is today's wait?", "Any cancellations this afternoon?", "Who's next in queue?"],
    'barber': ["What does Marcus usually get?", "How's my week looking?", "What should I upsell today?"],
    'client': ["When should I rebook?", "What's my membership status?", "Book same as last time"],
  }
  return map[props.role] || map['staff']
})

async function send(text) {
  const msg = text || inputText.value.trim()
  if (!msg) return
  inputText.value = ''
  await store.sendMessage(msg)
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
}

watch(() => store.messages.length, async () => {
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
})
</script>
<template>
  <div class="font-inter flex flex-col" style="height:100%">
    <!-- Header -->
    <div class="flex items-center justify-between px-5 py-4" style="border-bottom:1px solid #1a1a1a;flex-shrink:0">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full flex items-center justify-center" style="background:linear-gradient(135deg,#b8960c,#8a7009)">
          <i class="ph ph-robot text-black text-sm"></i>
        </div>
        <div>
          <div style="font-size:0.85rem;font-weight:700;color:#e5e7eb">QueVex AI</div>
          <div style="font-size:0.7rem;color:#6b7280">Chain Intelligence</div>
        </div>
      </div>
      <button @click="store.clearMessages()" style="font-size:0.72rem;color:#6b7280;border:1px solid #2a2a2a;background:transparent;padding:4px 10px;border-radius:6px;cursor:pointer">Clear</button>
    </div>

    <!-- Messages -->
    <div ref="messagesEl" class="flex-1 overflow-y-auto px-5 py-4 space-y-4" style="min-height:0">
      <div v-if="store.messages.length === 0" class="flex flex-col items-center justify-center h-full" style="color:#3f3f46;text-align:center;padding:40px 20px">
        <i class="ph ph-robot" style="font-size:2.5rem;color:#2a2a2a;margin-bottom:12px"></i>
        <div style="font-size:0.85rem;color:#6b7280;margin-bottom:4px">Ask QueVex anything about your business</div>
        <div style="font-size:0.72rem;color:#3f3f46">Try one of the suggested prompts below</div>
      </div>

      <div v-for="msg in store.messages" :key="msg.id" :class="msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'">
        <!-- AI message -->
        <div v-if="msg.role === 'ai'" class="flex items-start gap-2" style="max-width:80%">
          <div class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style="background:linear-gradient(135deg,#b8960c,#8a7009)">
            <i class="ph ph-robot text-black" style="font-size:0.65rem"></i>
          </div>
          <div>
            <div style="font-size:0.65rem;color:#6b7280;margin-bottom:3px">QueVex AI · {{ msg.time }}</div>
            <div style="background:#111;border:1px solid #2a2a2a;border-radius:0 8px 8px 8px;padding:10px 14px;font-size:0.83rem;color:#d1d5db;line-height:1.6">
              {{ msg.text }}
            </div>
          </div>
        </div>

        <!-- User message -->
        <div v-else style="max-width:80%">
          <div style="font-size:0.65rem;color:#6b7280;margin-bottom:3px;text-align:right">You · {{ msg.time }}</div>
          <div style="background:rgba(184,150,12,0.15);border:1px solid rgba(184,150,12,0.3);border-radius:8px 0 8px 8px;padding:10px 14px;font-size:0.83rem;color:#e5e7eb;line-height:1.6">
            {{ msg.text }}
          </div>
        </div>
      </div>

      <!-- Typing indicator -->
      <div v-if="store.isTyping" class="flex items-start gap-2">
        <div class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style="background:linear-gradient(135deg,#b8960c,#8a7009)">
          <i class="ph ph-robot text-black" style="font-size:0.65rem"></i>
        </div>
        <div style="background:#111;border:1px solid #2a2a2a;border-radius:0 8px 8px 8px;padding:10px 14px">
          <div class="flex items-center gap-1">
            <span class="typing-dot"></span>
            <span class="typing-dot" style="animation-delay:0.2s"></span>
            <span class="typing-dot" style="animation-delay:0.4s"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Suggested prompts -->
    <div class="px-5 py-3 flex gap-2 flex-wrap" style="border-top:1px solid #1a1a1a;flex-shrink:0">
      <button
        v-for="prompt in promptSuggestions"
        :key="prompt"
        @click="send(prompt)"
        style="font-size:0.72rem;color:#9ca3af;background:#111;border:1px solid #2a2a2a;border-radius:20px;padding:4px 12px;cursor:pointer;transition:all 0.2s;white-space:nowrap"
        @mouseenter="e => { e.target.style.borderColor='rgba(184,150,12,0.4)'; e.target.style.color='#b8960c' }"
        @mouseleave="e => { e.target.style.borderColor='#2a2a2a'; e.target.style.color='#9ca3af' }"
      >{{ prompt }}</button>
    </div>

    <!-- Input -->
    <div class="px-5 py-4 flex gap-3 items-center" style="border-top:1px solid #1a1a1a;flex-shrink:0">
      <input
        v-model="inputText"
        type="text"
        placeholder="Ask QueVex..."
        style="flex:1;background:#111;border:1px solid #2a2a2a;border-radius:8px;padding:10px 14px;font-size:0.83rem;color:#e5e7eb;outline:none;font-family:'Inter',sans-serif;transition:border-color 0.2s"
        @focus="e => e.target.style.borderColor='#b8960c'"
        @blur="e => e.target.style.borderColor='#2a2a2a'"
        @keydown.enter="send()"
      />
      <button
        @click="send()"
        style="background:linear-gradient(135deg,#b8960c,#8a7009);border:none;border-radius:8px;width:38px;height:38px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0"
      >
        <i class="ph ph-paper-plane-tilt text-black text-sm"></i>
      </button>
    </div>
  </div>
</template>
<style scoped>
.typing-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #6b7280;
  display: inline-block;
  animation: typing-bounce 1s infinite;
}
@keyframes typing-bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-6px); }
}
</style>
