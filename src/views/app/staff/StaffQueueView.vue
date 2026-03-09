<script setup>
import { ref, computed } from 'vue'
import { useStaffStore } from '../../../stores/staff'
import { useMembershipStore } from '../../../stores/membership'

const store = useStaffStore()
const memberStore = useMembershipStore()

const newWalkIn = ref({ name: '', service: '', barber: '' })
const services = ['Signature Cut', 'Fade + Lineup', 'Beard Trim', 'Royal Shave', 'Haircut + Design']
const barbers = ['Devon R.', 'Marcus V.', 'James P.', 'Andre S.']
const notifiedIds = ref(new Set())

const estWait = computed(() => store.waitingArea.length * 35)

function getPlanForClient(name) {
  const firstName = name.split(' ')[0].toLowerCase()
  const sub = memberStore.subscribers.find(s => s.name.toLowerCase().startsWith(firstName))
  return sub ? sub.plan : null
}

function planBadgeClass(plan) {
  if (plan === 'vip') return 'app-badge vip'
  if (plan === 'premium') return 'app-badge gold'
  if (plan === 'essential') return 'app-badge blue'
  return ''
}

function addWalkIn() {
  if (!newWalkIn.value.name || !newWalkIn.value.service) return
  store.waitingArea.push({
    id: Date.now(),
    name: newWalkIn.value.name,
    service: newWalkIn.value.service,
    wait: `${estWait.value + 35} min`,
    type: 'walk-in',
  })
  newWalkIn.value = { name: '', service: '', barber: '' }
}

function notify(id) {
  notifiedIds.value.add(id)
}
</script>
<template>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">
    <!-- Estimated wait hero card -->
    <div class="app-card gold app-enter" style="padding:32px;text-align:center">
      <div style="font-size:0.8rem;font-weight:700;color:var(--app-gold);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px">Estimated Wait for New Walk-in</div>
      <div style="font-size:2.5rem;font-weight:800;color:var(--app-text);line-height:1">{{ estWait }} min</div>
      <div style="font-size:0.8rem;color:var(--app-text-dim);margin-top:8px">{{ store.waitingArea.length }} clients in queue · ~35 min avg service</div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <!-- Live queue -->
      <div style="display:flex;flex-direction:column;gap:12px">
        <div class="app-section-label">Live Queue</div>
        <div
          v-for="(client, i) in store.waitingArea"
          :key="client.id"
          class="app-card lift app-enter"
          :class="`app-d${Math.min(i + 1, 6)}`"
          style="padding:16px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px"
        >
          <div class="flex items-center gap-3">
            <div style="font-size:1.3rem;font-weight:800;color:var(--app-gold);width:32px;flex-shrink:0">{{ i + 1 }}</div>
            <div class="person-badge">
              <div class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0" style="background:linear-gradient(135deg,var(--app-gold),#8a7009)">
                {{ client.name.split(' ').map(n => n[0]).join('') }}
              </div>
              <span style="font-size:0.95rem;font-weight:600;color:var(--app-text)">{{ client.name }}</span>
            </div>
            <div style="font-size:0.8rem;color:var(--app-text-dim)">{{ client.service }} · {{ client.wait }}</div>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <span v-if="getPlanForClient(client.name)" :class="planBadgeClass(getPlanForClient(client.name))">{{ getPlanForClient(client.name) }}</span>
            <button
              v-if="!notifiedIds.has(client.id)"
              class="app-btn ghost"
              style="padding:4px 10px;font-size:0.72rem"
              @click="notify(client.id)"
            >Notify</button>
            <span v-else style="font-size:0.72rem;color:var(--app-green);font-weight:600">SMS sent</span>
          </div>
        </div>
      </div>

      <!-- Add walk-in form -->
      <div class="app-card app-enter app-d7" style="padding:20px;display:flex;flex-direction:column;gap:16px">
        <div class="app-section-label">Add Walk-in</div>
        <div>
          <label style="font-size:0.78rem;font-weight:600;color:var(--app-text-dim);margin-bottom:6px;display:block">Client Name</label>
          <input
            v-model="newWalkIn.name"
            type="text"
            placeholder="Enter client name"
            class="app-input"
          />
        </div>
        <div>
          <label style="font-size:0.78rem;font-weight:600;color:var(--app-text-dim);margin-bottom:6px;display:block">Service</label>
          <select v-model="newWalkIn.service" class="app-select">
            <option value="">Select service...</option>
            <option v-for="s in services" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
        <div>
          <label style="font-size:0.78rem;font-weight:600;color:var(--app-text-dim);margin-bottom:6px;display:block">Preferred Barber</label>
          <select v-model="newWalkIn.barber" class="app-select">
            <option value="">Any barber</option>
            <option v-for="b in barbers" :key="b" :value="b">{{ b }}</option>
          </select>
        </div>
        <button class="app-btn primary" style="width:100%;justify-content:center" @click="addWalkIn">
          Add to Queue
        </button>
      </div>
    </div>
  </div>
</template>
