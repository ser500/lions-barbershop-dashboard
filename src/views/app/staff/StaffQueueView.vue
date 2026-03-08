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

function planBadgeStyle(plan) {
  if (plan === 'vip') return 'background:rgba(232,232,232,0.1);color:#e8e8e8;border:1px solid rgba(232,232,232,0.3)'
  if (plan === 'premium') return 'background:rgba(201,168,76,0.15);color:#c9a84c;border:1px solid rgba(201,168,76,0.3)'
  if (plan === 'essential') return 'background:rgba(168,184,200,0.1);color:#a8b8c8;border:1px solid rgba(168,184,200,0.3)'
  return null
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
  <div class="p-6 font-inter">
    <!-- Estimated wait -->
    <div class="flex items-center gap-4 mb-6 p-4 rounded-xl" style="background:#111;border:1px solid #1a1a1a">
      <div style="font-size:2rem;font-weight:700;color:#b8960c">{{ estWait }} min</div>
      <div>
        <div style="font-size:0.85rem;font-weight:600;color:#e5e7eb">Estimated Wait for New Walk-in</div>
        <div style="font-size:0.75rem;color:#6b7280;margin-top:1px">{{ store.waitingArea.length }} clients in queue · ~35 min avg service</div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6">
      <!-- Live queue -->
      <div>
        <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Live Queue</div>
        <div class="space-y-3">
          <div
            v-for="client in store.waitingArea"
            :key="client.id"
            class="flex items-center justify-between p-4 rounded-xl"
            style="background:#111;border:1px solid #1a1a1a"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-black" style="background:linear-gradient(135deg,#b8960c,#8a7009)">
                {{ client.name.split(' ').map(n => n[0]).join('') }}
              </div>
              <div>
                <div style="font-size:0.85rem;font-weight:600;color:#e5e7eb">{{ client.name }}</div>
                <div style="font-size:0.75rem;color:#6b7280">{{ client.service }}</div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span v-if="getPlanForClient(client.name)" class="text-xs px-2 py-0.5 rounded-full font-medium" :style="planBadgeStyle(getPlanForClient(client.name))">{{ getPlanForClient(client.name) }}</span>
              <span
                class="text-xs px-2 py-0.5 rounded-full font-medium"
                :style="client.type === 'member' ? 'background:rgba(184,150,12,0.15);color:#b8960c;border:1px solid rgba(184,150,12,0.3)' : 'background:#1f2937;color:#6b7280;border:1px solid #374151'"
              >{{ client.type === 'member' ? 'Member' : 'Walk-in' }}</span>
              <span style="font-size:0.78rem;color:#6b7280">{{ client.wait }}</span>
              <button
                v-if="!notifiedIds.has(client.id)"
                @click="notify(client.id)"
                style="font-size:0.72rem;background:rgba(184,150,12,0.1);color:#b8960c;border:1px solid rgba(184,150,12,0.2);padding:4px 10px;border-radius:6px;cursor:pointer"
              >Notify</button>
              <span v-else style="font-size:0.72rem;color:#22c55e">SMS sent</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Add walk-in form -->
      <div>
        <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Add Walk-in</div>
        <div class="rounded-xl p-5 space-y-4" style="background:#111;border:1px solid #1a1a1a">
          <div>
            <label style="font-size:0.75rem;color:#6b7280;display:block;margin-bottom:4px">Client Name</label>
            <input
              v-model="newWalkIn.name"
              type="text"
              placeholder="Enter client name"
              style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#e5e7eb;font-size:0.85rem;padding:10px 12px;border-radius:8px;outline:none;font-family:'Inter',sans-serif"
            />
          </div>
          <div>
            <label style="font-size:0.75rem;color:#6b7280;display:block;margin-bottom:4px">Service</label>
            <select
              v-model="newWalkIn.service"
              style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#e5e7eb;font-size:0.85rem;padding:10px 12px;border-radius:8px;outline:none;font-family:'Inter',sans-serif;cursor:pointer"
            >
              <option value="">Select service...</option>
              <option v-for="s in services" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
          <div>
            <label style="font-size:0.75rem;color:#6b7280;display:block;margin-bottom:4px">Preferred Barber</label>
            <select
              v-model="newWalkIn.barber"
              style="width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#e5e7eb;font-size:0.85rem;padding:10px 12px;border-radius:8px;outline:none;font-family:'Inter',sans-serif;cursor:pointer"
            >
              <option value="">Any barber</option>
              <option v-for="b in barbers" :key="b" :value="b">{{ b }}</option>
            </select>
          </div>
          <button
            @click="addWalkIn"
            class="w-full py-2.5 rounded-lg text-sm font-semibold text-black"
            style="background:linear-gradient(135deg,#b8960c,#8a7009);border:none;cursor:pointer"
          >Add to Queue</button>
        </div>
      </div>
    </div>
  </div>
</template>
