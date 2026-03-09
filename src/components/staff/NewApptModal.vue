<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true }
})
const emit = defineEmits(['update:modelValue'])

const form = ref({ clientName: '', service: '', barber: '', time: '' })
const confirmed = ref(false)

function close() {
  emit('update:modelValue', false)
  confirmed.value = false
  form.value = { clientName: '', service: '', barber: '', time: '' }
}

function submit() {
  confirmed.value = true
  setTimeout(close, 2000)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4" style="background:rgba(0,0,0,0.8);backdrop-filter:blur(4px)" @click.self="close">
        <div class="w-full max-w-md rounded-2xl p-6 font-inter" style="background:#111;border:1px solid #2a2a2a">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="font-cinzel font-bold text-zinc-100">New Appointment</h2>
              <p class="text-xs text-zinc-500 mt-0.5">Schedule a client</p>
            </div>
            <button class="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-all" @click="close">
              <i class="ph ph-x text-base"></i>
            </button>
          </div>

          <!-- Confirmed state -->
          <div v-if="confirmed" class="text-center py-8">
            <div class="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style="background:rgba(184,150,12,0.15);border:1px solid rgba(184,150,12,0.3)">
              <i class="ph ph-check text-2xl" style="color:#b8960c"></i>
            </div>
            <div class="font-cinzel font-bold text-zinc-100 mb-1">Appointment Booked</div>
            <div class="text-xs text-zinc-500">Closing automatically...</div>
          </div>

          <!-- Form -->
          <form v-else @submit.prevent="submit" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-zinc-400 mb-1.5">Client Name</label>
              <input v-model="form.clientName" type="text" placeholder="Enter client name" required class="w-full px-3 py-2.5 rounded-lg text-sm text-zinc-200 bg-zinc-900 placeholder-zinc-600 outline-none transition-all" style="border:1px solid #2a2a2a" @focus="e => e.target.style.borderColor='#b8960c'" @blur="e => e.target.style.borderColor='#2a2a2a'" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-zinc-400 mb-1.5">Service</label>
              <select v-model="form.service" required class="w-full px-3 py-2.5 rounded-lg text-sm text-zinc-200 bg-zinc-900 outline-none transition-all" style="border:1px solid #2a2a2a" @focus="e => e.target.style.borderColor='#b8960c'" @blur="e => e.target.style.borderColor='#2a2a2a'">
                <option value="" disabled>Select service</option>
                <option>Signature Cut</option>
                <option>Fade + Lineup</option>
                <option>Royal Shave</option>
                <option>Beard Trim</option>
                <option>Haircut + Design</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-zinc-400 mb-1.5">Barber</label>
              <select v-model="form.barber" required class="w-full px-3 py-2.5 rounded-lg text-sm text-zinc-200 bg-zinc-900 outline-none transition-all" style="border:1px solid #2a2a2a" @focus="e => e.target.style.borderColor='#b8960c'" @blur="e => e.target.style.borderColor='#2a2a2a'">
                <option value="" disabled>Select barber</option>
                <option>Devon Richards</option>
                <option>Marcus Vance</option>
                <option>James Pierce</option>
                <option>Andre Smith</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-zinc-400 mb-1.5">Time</label>
              <input v-model="form.time" type="time" required class="w-full px-3 py-2.5 rounded-lg text-sm text-zinc-200 bg-zinc-900 outline-none transition-all" style="border:1px solid #2a2a2a" @focus="e => e.target.style.borderColor='#b8960c'" @blur="e => e.target.style.borderColor='#2a2a2a'" />
            </div>
            <button type="submit" class="w-full py-3 rounded-lg font-semibold text-sm text-black transition-all hover:opacity-90" style="background:linear-gradient(135deg,#b8960c,#8a7009)">
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
