<script setup>
import { ref } from 'vue'

const activeTab = ref('upcoming')
const bookingStep = ref(0)
const booking = ref({ location: '', service: '', barber: '', time: '' })

const locations = ['Downtown', 'East Side']
const services = ['Signature Cut', 'Fade + Lineup', 'Beard Trim', 'Royal Shave', 'Signature Cut + Beard']
const barbers = ['Devon Richards', 'Marcus Vance', 'James Pierce', 'Andre Smith']
const timeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM']

const upcoming = [
  { date: 'Tue Mar 10', time: '11:00 AM', service: 'Signature Cut + Beard', barber: 'Devon Richards', location: 'Downtown', status: 'confirmed' },
  { date: 'Mon Mar 30', time: '10:00 AM', service: 'Signature Cut + Beard', barber: 'Devon Richards', location: 'Downtown', status: 'confirmed' },
]

const past = [
  { date: 'Thu Mar 5',  time: '9:00 AM', service: 'Signature Cut + Beard', barber: 'Devon Richards', location: 'Downtown', status: 'completed' },
  { date: 'Mon Feb 10', time: '10:00 AM', service: 'Signature Cut + Beard', barber: 'Devon Richards', location: 'Downtown', status: 'completed' },
]

const steps = ['Location', 'Service', 'Barber', 'Time']

function nextStep() { if (bookingStep.value < 3) bookingStep.value++ }
function prevStep() { if (bookingStep.value > 0) bookingStep.value-- }
function confirmBooking() {
  bookingStep.value = 0
  booking.value = { location: '', service: '', barber: '', time: '' }
  activeTab.value = 'upcoming'
}

function statusStyle(s) {
  if (s === 'confirmed') return 'background:rgba(34,197,94,0.1);color:#22c55e;border:1px solid rgba(34,197,94,0.2)'
  return 'background:#1f2937;color:#4b5563;border:1px solid #374151'
}
</script>
<template>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">

    <!-- Tabs -->
    <div class="tab-bar">
      <button
        v-for="tab in [{ id: 'upcoming', label: 'Upcoming' }, { id: 'past', label: 'Past' }, { id: 'book', label: '+ Book New' }]"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
      >{{ tab.label }}</button>
    </div>

    <!-- Upcoming -->
    <template v-if="activeTab === 'upcoming'">
      <div class="app-section-label" style="margin-bottom:-4px">Upcoming Appointments</div>
      <div
        v-for="(appt, i) in upcoming"
        :key="i"
        class="app-card lift app-enter"
        :class="`app-d${i + 1}`"
        style="padding:20px"
      >
        <div class="appt-row">
          <div class="appt-left">
            <div class="appt-datetime">{{ appt.date }} · {{ appt.time }}</div>
            <div class="appt-service">{{ appt.service }}</div>
            <div class="appt-meta">
              <i class="ph ph-user"></i> {{ appt.barber }}
              <span class="sep">·</span>
              <i class="ph ph-map-pin"></i> {{ appt.location }}
            </div>
          </div>
          <div class="appt-right">
            <span class="app-badge green" style="margin-bottom:12px;align-self:flex-end">
              <span class="status-dot"></span>
              {{ appt.status }}
            </span>
            <div class="appt-actions">
              <button class="app-btn ghost" style="font-size:0.75rem;padding:6px 12px">Cancel</button>
              <button class="app-btn primary" style="font-size:0.75rem;padding:6px 14px">Rebook</button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Past -->
    <template v-if="activeTab === 'past'">
      <div class="app-section-label" style="margin-bottom:-4px">Past Appointments</div>
      <div
        v-for="(appt, i) in past"
        :key="i"
        class="app-card app-enter"
        :class="`app-d${i + 1}`"
        style="padding:20px;opacity:0.8"
      >
        <div class="appt-row">
          <div class="appt-left">
            <div class="appt-datetime">{{ appt.date }} · {{ appt.time }}</div>
            <div class="appt-service">{{ appt.service }}</div>
            <div class="appt-meta">
              <i class="ph ph-user"></i> {{ appt.barber }}
              <span class="sep">·</span>
              <i class="ph ph-map-pin"></i> {{ appt.location }}
            </div>
          </div>
          <div class="appt-right">
            <span class="app-badge amber">{{ appt.status }}</span>
          </div>
        </div>
      </div>
    </template>

    <!-- Book new appointment wizard -->
    <template v-if="activeTab === 'book'">
      <!-- Stepper -->
      <div class="stepper">
        <div v-for="(step, i) in steps" :key="i" class="step-item">
          <div
            class="step-circle"
            :class="{ active: i === bookingStep, done: i < bookingStep }"
          >{{ i + 1 }}</div>
          <span class="step-label" :class="{ active: i === bookingStep }">{{ step }}</span>
          <div v-if="i < steps.length - 1" class="step-connector"></div>
        </div>
      </div>

      <div class="app-card app-enter app-d1" style="padding:24px;max-width:480px">
        <!-- Step 1: Location -->
        <div v-if="bookingStep === 0">
          <div class="wizard-title">Choose Location</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div
              v-for="loc in locations"
              :key="loc"
              @click="booking.location = loc"
              class="wizard-option"
              :class="{ selected: booking.location === loc }"
            >
              <div class="wizard-option-name" :class="{ selected: booking.location === loc }">{{ loc }}</div>
              <div style="font-size:0.75rem;color:var(--app-text-muted)">Austin, TX</div>
            </div>
          </div>
        </div>

        <!-- Step 2: Service -->
        <div v-if="bookingStep === 1">
          <div class="wizard-title">Choose Service</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div
              v-for="svc in services"
              :key="svc"
              @click="booking.service = svc"
              class="wizard-option"
              :class="{ selected: booking.service === svc }"
            >
              <span class="wizard-option-name" :class="{ selected: booking.service === svc }">{{ svc }}</span>
            </div>
          </div>
        </div>

        <!-- Step 3: Barber -->
        <div v-if="bookingStep === 2">
          <div class="wizard-title">Choose Barber</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div
              v-for="b in barbers"
              :key="b"
              @click="booking.barber = b"
              class="wizard-option flex items-center gap-3"
              :class="{ selected: booking.barber === b }"
            >
              <div class="barber-avatar">{{ b.split(' ').map(n => n[0]).join('') }}</div>
              <span class="wizard-option-name" :class="{ selected: booking.barber === b }">{{ b }}</span>
            </div>
          </div>
        </div>

        <!-- Step 4: Time -->
        <div v-if="bookingStep === 3">
          <div class="wizard-title">Choose Time</div>
          <div class="grid grid-cols-3 gap-2">
            <div
              v-for="slot in timeSlots"
              :key="slot"
              @click="booking.time = slot"
              class="time-slot"
              :class="{ selected: booking.time === slot }"
            >{{ slot }}</div>
          </div>
        </div>

        <!-- Navigation -->
        <div style="display:flex;gap:10px;margin-top:24px">
          <button v-if="bookingStep > 0" @click="prevStep" class="app-btn ghost" style="flex:1;justify-content:center">Back</button>
          <button
            v-if="bookingStep < 3"
            @click="nextStep"
            class="app-btn primary"
            style="flex:1;justify-content:center"
          >Next</button>
          <button
            v-if="bookingStep === 3"
            @click="confirmBooking"
            class="app-btn primary"
            style="flex:1;justify-content:center"
          >Confirm Booking</button>
        </div>
      </div>
    </template>

  </div>
</template>

<style scoped>
/* ── Tab bar ─────────────────────────────────── */
.tab-bar {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  background: var(--app-surface);
  border: 1px solid var(--app-border-dim);
  border-radius: 10px;
}
.tab-btn {
  padding: 6px 16px;
  border-radius: 7px;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--app-text-muted);
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  transition: all 0.15s;
  font-family: 'Inter', sans-serif;
}
.tab-btn.active {
  background: rgba(201, 168, 76, 0.12);
  color: var(--app-gold);
  border-color: rgba(201, 168, 76, 0.3);
}

/* ── Appointment card rows ───────────────────── */
.appt-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.appt-left { flex: 1; min-width: 0; }
.appt-datetime {
  font-size: 1rem;
  font-weight: 700;
  color: var(--app-text);
  margin-bottom: 4px;
}
.appt-service {
  font-size: 0.8rem;
  color: var(--app-text-dim);
  margin-bottom: 4px;
}
.appt-meta {
  font-size: 0.8rem;
  color: var(--app-text-dim);
  display: flex;
  align-items: center;
  gap: 5px;
}
.appt-meta i { color: var(--app-text-muted); }
.sep { color: var(--app-border); }
.appt-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
}
.appt-actions { display: flex; gap: 8px; }
.status-dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--app-green);
  margin-right: 3px;
}

/* ── Stepper ─────────────────────────────────── */
.stepper {
  display: flex;
  align-items: center;
  gap: 0;
}
.step-item {
  display: flex;
  align-items: center;
  gap: 6px;
}
.step-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  background: var(--app-surface-2);
  color: var(--app-text-muted);
  border: 1px solid var(--app-border);
  flex-shrink: 0;
}
.step-circle.active {
  background: var(--app-gold);
  color: #060810;
  border-color: var(--app-gold);
}
.step-circle.done {
  background: rgba(201, 168, 76, 0.2);
  color: var(--app-gold);
  border-color: rgba(201, 168, 76, 0.4);
}
.step-label {
  font-size: 0.78rem;
  color: var(--app-text-muted);
}
.step-label.active { color: var(--app-gold); }
.step-connector {
  width: 24px;
  height: 1px;
  background: var(--app-border-dim);
  margin: 0 4px;
}

/* ── Booking wizard internals ────────────────── */
.wizard-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--app-text);
  margin-bottom: 16px;
}
.wizard-option {
  padding: 12px 14px;
  border-radius: 8px;
  background: var(--app-surface-2);
  border: 1px solid var(--app-border-dim);
  cursor: pointer;
  transition: all 0.15s;
}
.wizard-option.selected {
  background: rgba(201, 168, 76, 0.08);
  border-color: rgba(201, 168, 76, 0.4);
}
.wizard-option-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--app-text);
}
.wizard-option-name.selected { color: var(--app-gold); }
.barber-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--app-gold), #8a7009);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 700;
  color: #060810;
  flex-shrink: 0;
}
.time-slot {
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--app-surface-2);
  border: 1px solid var(--app-border-dim);
  cursor: pointer;
  text-align: center;
  font-size: 0.8rem;
  color: var(--app-text-dim);
  transition: all 0.15s;
}
.time-slot.selected {
  background: rgba(201, 168, 76, 0.12);
  border-color: rgba(201, 168, 76, 0.4);
  color: var(--app-gold);
  font-weight: 600;
}
</style>
