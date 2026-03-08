<script setup>
import { computed } from 'vue'
import { useMembershipStore } from '../../../stores/membership'

const store = useMembershipStore()

const atRisk = computed(() => store.subscribers.filter(s => s.status === 'at-risk' || s.status === 'inactive'))

const recentActivity = [
  { text: 'Marcus Johnson renewed VIP plan',         time: '2d ago',   type: 'renew' },
  { text: 'Antoine B. enrolled in Essential plan',   time: '5d ago',   type: 'new' },
  { text: 'DeShawn P. cancelled Premium plan',       time: '8d ago',   type: 'cancel' },
  { text: 'Chris W. upgraded to Premium from Essential', time: '12d ago', type: 'upgrade' },
]

function planBadgeStyle(plan) {
  if (plan === 'vip') return 'background:rgba(232,232,232,0.1);color:#e8e8e8;border:1px solid rgba(232,232,232,0.3)'
  if (plan === 'premium') return 'background:rgba(201,168,76,0.15);color:#c9a84c;border:1px solid rgba(201,168,76,0.3)'
  return 'background:rgba(168,184,200,0.1);color:#a8b8c8;border:1px solid rgba(168,184,200,0.3)'
}

function statusBadgeStyle(status) {
  if (status === 'active') return 'background:rgba(34,197,94,0.1);color:#22c55e;border:1px solid rgba(34,197,94,0.2)'
  if (status === 'at-risk') return 'background:rgba(251,191,36,0.1);color:#fbbf24;border:1px solid rgba(251,191,36,0.2)'
  return 'background:rgba(239,68,68,0.1);color:#ef4444;border:1px solid rgba(239,68,68,0.2)'
}

function activityColor(type) {
  if (type === 'new' || type === 'upgrade') return '#22c55e'
  if (type === 'cancel') return '#ef4444'
  return '#b8960c'
}
</script>
<template>
  <div class="p-6 font-inter space-y-6">
    <!-- Stats -->
    <div class="grid grid-cols-4 gap-4">
      <div class="rounded-xl p-4" style="background:#111;border:1px solid #1a1a1a">
        <div style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;margin-bottom:4px">Subscribers</div>
        <div style="font-size:1.5rem;font-weight:700;color:#ffffff">10</div>
      </div>
      <div class="rounded-xl p-4" style="background:#111;border:1px solid #1a1a1a">
        <div style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;margin-bottom:4px">MRR</div>
        <div style="font-size:1.5rem;font-weight:700;color:#b8960c">$921</div>
      </div>
      <div class="rounded-xl p-4" style="background:#111;border:1px solid #1a1a1a">
        <div style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;margin-bottom:4px">Churn Rate</div>
        <div style="font-size:1.5rem;font-weight:700;color:#fbbf24">4.2%</div>
      </div>
      <div class="rounded-xl p-4" style="background:#111;border:1px solid #1a1a1a">
        <div style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;margin-bottom:4px">Avg Value</div>
        <div style="font-size:1.5rem;font-weight:700;color:#ffffff">$92</div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6">
      <!-- Subscribers table -->
      <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
        <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Subscribers</div>
        <div class="space-y-2">
          <div v-for="sub in store.subscribers" :key="sub.id" class="flex items-center justify-between p-3 rounded-lg" style="background:#0f0f0f;border:1px solid #1e1e1e">
            <div>
              <div style="font-size:0.83rem;font-weight:600;color:#e5e7eb">{{ sub.name }}</div>
              <div style="font-size:0.72rem;color:#6b7280;margin-top:1px">
                Billing: {{ sub.billingDate }}
                <span v-if="sub.plan === 'essential' && sub.cutsUsed !== null"> · {{ sub.cutsUsed }}/{{ sub.cutsAllowed }} cuts</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs px-2 py-0.5 rounded-full font-medium" :style="planBadgeStyle(sub.plan)">{{ sub.plan }}</span>
              <span class="text-xs px-2 py-0.5 rounded-full font-medium" :style="statusBadgeStyle(sub.status)">{{ sub.status }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity feed -->
      <div>
        <div class="rounded-xl p-5 mb-5" style="background:#111;border:1px solid #1a1a1a">
          <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Recent Activity</div>
          <div class="space-y-3">
            <div v-for="(a, i) in recentActivity" :key="i" class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" :style="{ background: activityColor(a.type) }"></div>
              <div>
                <div style="font-size:0.82rem;color:#e5e7eb">{{ a.text }}</div>
                <div style="font-size:0.7rem;color:#6b7280;margin-top:1px">{{ a.time }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- At-risk -->
        <div v-if="atRisk.length" class="rounded-xl p-5" style="background:rgba(239,68,68,0.05);border:1px solid rgba(239,68,68,0.15)">
          <div class="flex items-center gap-2 mb-3">
            <i class="ph ph-warning" style="color:#ef4444;font-size:0.9rem"></i>
            <div style="font-size:0.85rem;font-weight:700;color:#ef4444">At-Risk</div>
          </div>
          <div class="space-y-2">
            <div v-for="sub in atRisk" :key="sub.id" class="flex items-center justify-between p-3 rounded-lg" style="background:#0f0f0f;border:1px solid #1e1e1e">
              <div>
                <div style="font-size:0.82rem;font-weight:600;color:#e5e7eb">{{ sub.name }}</div>
                <div style="font-size:0.7rem;color:#6b7280">{{ sub.status }}</div>
              </div>
              <button style="font-size:0.72rem;background:rgba(239,68,68,0.1);color:#ef4444;border:1px solid rgba(239,68,68,0.3);padding:4px 10px;border-radius:6px;cursor:pointer">Contact</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
