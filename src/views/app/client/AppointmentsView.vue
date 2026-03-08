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
  <div class="p-6 font-inter">
    <!-- Tabs -->
    <div class="flex gap-1 mb-6 p-1 rounded-lg" style="background:#111;border:1px solid #1a1a1a;display:inline-flex">
      <button v-for="tab in [{ id: 'upcoming', label: 'Upcoming' }, { id: 'past', label: 'Past' }, { id: 'book', label: '+ Book New' }]" :key="tab.id"
        @click="activeTab = tab.id"
        class="px-4 py-1.5 rounded-md text-sm font-medium transition-all"
        :style="activeTab === tab.id ? 'background:rgba(184,150,12,0.15);color:#b8960c;border:1px solid rgba(184,150,12,0.3)' : 'color:#6b7280;border:1px solid transparent'"
      >{{ tab.label }}</button>
    </div>

    <!-- Upcoming -->
    <div v-if="activeTab === 'upcoming'" class="space-y-3">
      <div v-for="(appt, i) in upcoming" :key="i" class="p-5 rounded-xl" style="background:#111;border:1px solid #1a1a1a">
        <div class="flex items-center justify-between">
          <div>
            <div style="font-size:1rem;font-weight:700;color:#e5e7eb;margin-bottom:4px">{{ appt.date }} · {{ appt.time }}</div>
            <div style="font-size:0.83rem;color:#9ca3af;margin-bottom:2px">{{ appt.service }}</div>
            <div style="font-size:0.8rem;color:#6b7280">{{ appt.barber }} · {{ appt.location }}</div>
          </div>
          <span class="text-xs px-2 py-0.5 rounded-full font-medium" :style="statusStyle(appt.status)">{{ appt.status }}</span>
        </div>
      </div>
    </div>

    <!-- Past -->
    <div v-if="activeTab === 'past'" class="space-y-3">
      <div v-for="(appt, i) in past" :key="i" class="p-5 rounded-xl" style="background:#111;border:1px solid #1a1a1a;opacity:0.8">
        <div class="flex items-center justify-between">
          <div>
            <div style="font-size:1rem;font-weight:700;color:#e5e7eb;margin-bottom:4px">{{ appt.date }} · {{ appt.time }}</div>
            <div style="font-size:0.83rem;color:#9ca3af;margin-bottom:2px">{{ appt.service }}</div>
            <div style="font-size:0.8rem;color:#6b7280">{{ appt.barber }} · {{ appt.location }}</div>
          </div>
          <span class="text-xs px-2 py-0.5 rounded-full font-medium" :style="statusStyle(appt.status)">{{ appt.status }}</span>
        </div>
      </div>
    </div>

    <!-- Book new appointment wizard -->
    <div v-if="activeTab === 'book'">
      <!-- Stepper -->
      <div class="flex items-center gap-2 mb-6">
        <div v-for="(step, i) in steps" :key="i" class="flex items-center gap-2">
          <div
            class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            :style="i === bookingStep ? 'background:#b8960c;color:#000' : i < bookingStep ? 'background:rgba(184,150,12,0.3);color:#b8960c' : 'background:#1a1a1a;color:#4b5563'"
          >{{ i + 1 }}</div>
          <span style="font-size:0.78rem;" :style="{ color: i === bookingStep ? '#b8960c' : '#4b5563' }">{{ step }}</span>
          <div v-if="i < steps.length - 1" style="width:24px;height:1px;background:#2a2a2a"></div>
        </div>
      </div>

      <div class="rounded-xl p-6" style="background:#111;border:1px solid #1a1a1a;max-width:480px">
        <!-- Step 1: Location -->
        <div v-if="bookingStep === 0">
          <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Choose Location</div>
          <div class="space-y-2">
            <div v-for="loc in locations" :key="loc"
              @click="booking.location = loc"
              class="p-4 rounded-lg cursor-pointer transition-all"
              :style="booking.location === loc ? 'background:rgba(184,150,12,0.1);border:1px solid rgba(184,150,12,0.4)' : 'background:#0f0f0f;border:1px solid #1e1e1e'"
            >
              <div style="font-size:0.85rem;font-weight:600;" :style="{ color: booking.location === loc ? '#b8960c' : '#e5e7eb' }">{{ loc }}</div>
              <div style="font-size:0.75rem;color:#6b7280">Austin, TX</div>
            </div>
          </div>
        </div>

        <!-- Step 2: Service -->
        <div v-if="bookingStep === 1">
          <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Choose Service</div>
          <div class="space-y-2">
            <div v-for="svc in services" :key="svc"
              @click="booking.service = svc"
              class="p-3 rounded-lg cursor-pointer transition-all"
              :style="booking.service === svc ? 'background:rgba(184,150,12,0.1);border:1px solid rgba(184,150,12,0.4)' : 'background:#0f0f0f;border:1px solid #1e1e1e'"
            >
              <span style="font-size:0.85rem;font-weight:600;" :style="{ color: booking.service === svc ? '#b8960c' : '#e5e7eb' }">{{ svc }}</span>
            </div>
          </div>
        </div>

        <!-- Step 3: Barber -->
        <div v-if="bookingStep === 2">
          <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Choose Barber</div>
          <div class="space-y-2">
            <div v-for="b in barbers" :key="b"
              @click="booking.barber = b"
              class="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all"
              :style="booking.barber === b ? 'background:rgba(184,150,12,0.1);border:1px solid rgba(184,150,12,0.4)' : 'background:#0f0f0f;border:1px solid #1e1e1e'"
            >
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black" style="background:linear-gradient(135deg,#b8960c,#8a7009)">
                {{ b.split(' ').map(n => n[0]).join('') }}
              </div>
              <span style="font-size:0.85rem;font-weight:600;" :style="{ color: booking.barber === b ? '#b8960c' : '#e5e7eb' }">{{ b }}</span>
            </div>
          </div>
        </div>

        <!-- Step 4: Time -->
        <div v-if="bookingStep === 3">
          <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Choose Time</div>
          <div class="grid grid-cols-3 gap-2">
            <div v-for="slot in timeSlots" :key="slot"
              @click="booking.time = slot"
              class="py-2 px-3 rounded-lg cursor-pointer text-center transition-all"
              :style="booking.time === slot ? 'background:rgba(184,150,12,0.15);border:1px solid rgba(184,150,12,0.4);color:#b8960c;font-weight:600' : 'background:#0f0f0f;border:1px solid #1e1e1e;color:#9ca3af'"
              style="font-size:0.8rem"
            >{{ slot }}</div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex gap-3 mt-6">
          <button v-if="bookingStep > 0" @click="prevStep" class="flex-1 py-2 rounded-lg text-sm" style="background:transparent;border:1px solid #2a2a2a;color:#9ca3af;cursor:pointer">Back</button>
          <button
            v-if="bookingStep < 3"
            @click="nextStep"
            class="flex-1 py-2 rounded-lg text-sm font-semibold text-black"
            style="background:linear-gradient(135deg,#b8960c,#8a7009);border:none;cursor:pointer"
          >Next</button>
          <button
            v-if="bookingStep === 3"
            @click="confirmBooking"
            class="flex-1 py-2 rounded-lg text-sm font-semibold text-black"
            style="background:linear-gradient(135deg,#b8960c,#8a7009);border:none;cursor:pointer"
          >Confirm Booking</button>
        </div>
      </div>
    </div>
  </div>
</template>
