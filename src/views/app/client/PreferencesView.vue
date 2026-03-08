<script setup>
import { ref } from 'vue'

const phone = ref('(512) 555-0194')
const email = ref('marcus.johnson@email.com')
const preferredBarber = ref('Devon Richards — Downtown')
const preferredService = ref('Signature Cut + Beard')
const styleNotes = ref('Low fade on sides, keep top longer. Beard: sharp line.')

const barbers = ['Devon Richards — Downtown', 'Marcus Vance — Downtown', 'James Pierce — East Side', 'Andre Smith — East Side']
const services = ['Signature Cut', 'Signature Cut + Beard', 'Fade + Lineup', 'Beard Trim', 'Royal Shave']

const notifications = ref({
  reminders: true,
  rebooking: true,
  promotions: false,
})

const toast = ref('')

function save() {
  toast.value = 'Preferences saved'
  setTimeout(() => { toast.value = '' }, 2000)
}
</script>
<template>
  <div class="p-6 font-inter space-y-5">
    <!-- Toast -->
    <div v-if="toast" style="position:fixed;top:20px;right:20px;background:#111;border:1px solid rgba(184,150,12,0.4);color:#b8960c;padding:10px 20px;border-radius:8px;font-size:0.83rem;z-index:999">{{ toast }}</div>

    <!-- Contact info -->
    <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
      <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Contact Info</div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label style="font-size:0.72rem;color:#6b7280;display:block;margin-bottom:4px">Phone</label>
          <input v-model="phone" type="text" style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#e5e7eb;font-size:0.85rem;padding:10px 12px;border-radius:8px;outline:none;font-family:'Inter',sans-serif" />
        </div>
        <div>
          <label style="font-size:0.72rem;color:#6b7280;display:block;margin-bottom:4px">Email</label>
          <input v-model="email" type="email" style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#e5e7eb;font-size:0.85rem;padding:10px 12px;border-radius:8px;outline:none;font-family:'Inter',sans-serif" />
        </div>
      </div>
    </div>

    <!-- Service preferences -->
    <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
      <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Service Preferences</div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label style="font-size:0.72rem;color:#6b7280;display:block;margin-bottom:4px">Preferred Barber</label>
          <select v-model="preferredBarber" style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#e5e7eb;font-size:0.85rem;padding:10px 12px;border-radius:8px;outline:none;font-family:'Inter',sans-serif;cursor:pointer">
            <option v-for="b in barbers" :key="b" :value="b">{{ b }}</option>
          </select>
        </div>
        <div>
          <label style="font-size:0.72rem;color:#6b7280;display:block;margin-bottom:4px">Preferred Service</label>
          <select v-model="preferredService" style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#e5e7eb;font-size:0.85rem;padding:10px 12px;border-radius:8px;outline:none;font-family:'Inter',sans-serif;cursor:pointer">
            <option v-for="s in services" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
      </div>
      <div>
        <label style="font-size:0.72rem;color:#6b7280;display:block;margin-bottom:4px">Style Notes</label>
        <textarea v-model="styleNotes" rows="3" style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#e5e7eb;font-size:0.85rem;padding:10px 12px;border-radius:8px;outline:none;font-family:'Inter',sans-serif;resize:vertical"></textarea>
      </div>
    </div>

    <!-- Notifications -->
    <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
      <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Notifications</div>
      <div class="space-y-4">
        <div v-for="(val, key) in notifications" :key="key" class="flex items-center justify-between">
          <div>
            <div style="font-size:0.85rem;font-weight:600;color:#e5e7eb">
              {{ key === 'reminders' ? 'Appointment Reminders' : key === 'rebooking' ? 'Rebooking Nudges' : 'Promotions' }}
            </div>
            <div style="font-size:0.75rem;color:#6b7280">
              {{ key === 'reminders' ? 'Get notified 24h before appointments' : key === 'rebooking' ? 'Smart nudges when you\'re due for a cut' : 'Special offers and promotions' }}
            </div>
          </div>
          <!-- Toggle -->
          <div
            @click="notifications[key] = !notifications[key]"
            class="cursor-pointer rounded-full relative transition-all"
            style="width:44px;height:24px;flex-shrink:0"
            :style="{ background: notifications[key] ? '#b8960c' : '#2a2a2a' }"
          >
            <div
              class="absolute rounded-full bg-white transition-all"
              style="width:18px;height:18px;top:3px;transition:left 0.2s"
              :style="{ left: notifications[key] ? '23px' : '3px' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <button @click="save" class="w-full py-3 rounded-xl text-sm font-semibold text-black" style="background:linear-gradient(135deg,#b8960c,#8a7009);border:none;cursor:pointer;max-width:200px">Save Preferences</button>
  </div>
</template>
