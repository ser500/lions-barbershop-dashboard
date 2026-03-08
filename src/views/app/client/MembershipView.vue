<script setup>
import { useMembershipStore } from '../../../stores/membership'

const store = useMembershipStore()

const myPlan = store.plans.find(p => p.id === 'vip')
const perks = ['Unlimited cuts', 'Free monthly product', 'Concierge booking', 'Dedicated barber']
</script>
<template>
  <div class="p-6 font-inter space-y-6">
    <!-- VIP plan card -->
    <div class="rounded-xl p-6" style="background:linear-gradient(135deg,rgba(232,232,232,0.06),rgba(232,232,232,0.02));border:1px solid rgba(232,232,232,0.2)">
      <div class="flex items-start justify-between mb-4">
        <div>
          <div style="font-size:0.72rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#9ca3af;margin-bottom:6px">Your Plan</div>
          <div style="font-size:1.8rem;font-weight:700;color:#e8e8e8;margin-bottom:2px">VIP</div>
          <div style="font-size:0.85rem;color:#9ca3af">$149 / month · Member since Jan 2024</div>
        </div>
        <div class="text-right">
          <div style="font-size:0.72rem;background:rgba(34,197,94,0.1);color:#22c55e;border:1px solid rgba(34,197,94,0.2);padding:4px 12px;border-radius:20px;font-weight:600;margin-bottom:8px">Active</div>
          <div style="font-size:0.72rem;color:#6b7280">Next billing: Mar 15</div>
        </div>
      </div>

      <!-- Perks -->
      <div class="space-y-2">
        <div v-for="perk in perks" :key="perk" class="flex items-center gap-2">
          <i class="ph ph-check-circle" style="color:#22c55e;font-size:0.9rem;flex-shrink:0"></i>
          <span style="font-size:0.83rem;color:#d1d5db">{{ perk }}</span>
        </div>
      </div>
    </div>

    <!-- Refer a friend -->
    <div class="rounded-xl p-5" style="background:rgba(184,150,12,0.05);border:1px solid rgba(184,150,12,0.2)">
      <div class="flex items-center gap-3 mb-3">
        <i class="ph ph-gift" style="color:#b8960c;font-size:1.1rem"></i>
        <div style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Refer a Friend</div>
      </div>
      <div style="font-size:0.83rem;color:#9ca3af;margin-bottom:12px">Refer a friend and earn 1 free cut per referral. No limits.</div>
      <div class="flex gap-2">
        <div style="flex:1;background:#111;border:1px solid #2a2a2a;border-radius:8px;padding:10px 14px;font-size:0.82rem;color:#b8960c;font-family:'Inter',sans-serif">lions-mj-ref-48</div>
        <button style="background:linear-gradient(135deg,#b8960c,#8a7009);color:#000;border:none;padding:10px 16px;border-radius:8px;font-size:0.82rem;font-weight:600;cursor:pointer">Copy Link</button>
      </div>
    </div>

    <!-- Plan options (non-VIP would see upgrade CTA) -->
    <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
      <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">All Plans</div>
      <div class="space-y-3">
        <div v-for="plan in store.plans" :key="plan.id" class="p-4 rounded-lg" :style="plan.id === 'vip' ? 'background:rgba(232,232,232,0.05);border:1px solid rgba(232,232,232,0.2)' : 'background:#0f0f0f;border:1px solid #1e1e1e'">
          <div class="flex items-center justify-between mb-2">
            <span style="font-size:0.85rem;font-weight:700;" :style="{ color: plan.color }">{{ plan.label }}</span>
            <div class="flex items-center gap-2">
              <span style="font-size:0.95rem;font-weight:700;color:#e5e7eb">${{ plan.price }}<span style="font-size:0.72rem;color:#6b7280">/mo</span></span>
              <span v-if="plan.id === 'vip'" style="font-size:0.68rem;background:rgba(232,232,232,0.1);color:#e8e8e8;border:1px solid rgba(232,232,232,0.3);padding:2px 8px;border-radius:20px;font-weight:600">Your Plan</span>
            </div>
          </div>
          <div style="font-size:0.75rem;color:#6b7280">{{ plan.perks.join(' · ') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
