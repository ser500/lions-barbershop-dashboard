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
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">

    <!-- Toast -->
    <div v-if="toast" class="toast">{{ toast }}</div>

    <!-- Contact Info -->
    <div class="app-card app-enter app-d1" style="padding:24px">
      <div class="section-title">Contact Info</div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="field-label">Phone</label>
          <input v-model="phone" type="text" class="field-input" />
        </div>
        <div>
          <label class="field-label">Email</label>
          <input v-model="email" type="email" class="field-input" />
        </div>
      </div>
    </div>

    <!-- Barber Preferences -->
    <div class="app-card app-enter app-d2" style="padding:24px">
      <div class="section-title">Barber Preferences</div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="field-label">Preferred Barber</label>
          <select v-model="preferredBarber" class="field-input" style="cursor:pointer">
            <option v-for="b in barbers" :key="b" :value="b">{{ b }}</option>
          </select>
        </div>
        <div>
          <label class="field-label">Preferred Service</label>
          <select v-model="preferredService" class="field-input" style="cursor:pointer">
            <option v-for="s in services" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Style Notes -->
    <div class="app-card app-enter app-d3" style="padding:24px">
      <div class="section-title">Style Notes</div>
      <div>
        <label class="field-label">Notes for your barber</label>
        <textarea v-model="styleNotes" rows="3" class="field-input" style="resize:vertical"></textarea>
      </div>
    </div>

    <!-- Notifications -->
    <div class="app-card app-enter app-d4" style="padding:24px">
      <div class="section-title">Notifications</div>
      <div style="display:flex;flex-direction:column;gap:20px">
        <div v-for="(val, key) in notifications" :key="key" class="notif-row">
          <div>
            <div class="notif-title">
              {{ key === 'reminders' ? 'Appointment Reminders' : key === 'rebooking' ? 'Rebooking Nudges' : 'Promotions' }}
            </div>
            <div class="notif-sub">
              {{ key === 'reminders' ? 'Get notified 24h before appointments' : key === 'rebooking' ? 'Smart nudges when you\'re due for a cut' : 'Special offers and promotions' }}
            </div>
          </div>
          <!-- Toggle -->
          <div
            @click="notifications[key] = !notifications[key]"
            class="toggle"
            :class="{ on: notifications[key] }"
          >
            <div class="toggle-knob" :class="{ on: notifications[key] }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Save button -->
    <div>
      <button @click="save" class="app-btn primary" style="padding:12px 32px;font-size:0.875rem">
        <i class="ph ph-floppy-disk"></i>
        Save Preferences
      </button>
    </div>

  </div>
</template>

<style scoped>
/* ── Toast ──────────────────────────────────── */
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--app-surface);
  border: 1px solid rgba(201, 168, 76, 0.4);
  color: var(--app-gold);
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.83rem;
  z-index: 999;
  font-family: 'Inter', sans-serif;
}

/* ── Section title ───────────────────────────── */
.section-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--app-text);
  margin-bottom: 16px;
}

/* ── Form fields ─────────────────────────────── */
.field-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--app-text-dim);
  margin-bottom: 6px;
  display: block;
}
.field-input {
  width: 100%;
  background: var(--app-surface-2);
  border: 1px solid var(--app-border);
  border-radius: 8px;
  padding: 10px 14px;
  color: var(--app-text);
  font-size: 0.875rem;
  outline: none;
  font-family: 'Inter', sans-serif;
  transition: border-color 0.18s, box-shadow 0.18s;
  box-sizing: border-box;
  appearance: none;
}
.field-input:focus {
  border-color: rgba(201, 168, 76, 0.5);
  box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.08);
}
.field-input::placeholder {
  color: var(--app-text-muted);
}
/* Select arrow + option contrast */
select.field-input {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.45)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
  cursor: pointer;
}
select.field-input option {
  background: #111828;
  color: rgba(255,255,255,0.9);
}
select.field-input option:checked {
  background: rgba(201,168,76,0.18);
  color: #c9a84c;
}

/* ── Notifications ───────────────────────────── */
.notif-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.notif-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--app-text);
  margin-bottom: 2px;
}
.notif-sub {
  font-size: 0.75rem;
  color: var(--app-text-muted);
}

/* ── Toggle ──────────────────────────────────── */
.toggle {
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: var(--app-surface-2);
  border: 1px solid var(--app-border);
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s;
}
.toggle.on {
  background: var(--app-green);
  border-color: var(--app-green);
}
.toggle-knob {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  top: 2px;
  left: 3px;
  transition: left 0.2s;
}
.toggle-knob.on {
  left: 23px;
}
</style>
