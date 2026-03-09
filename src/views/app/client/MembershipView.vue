<script setup>
import { useMembershipStore } from '../../../stores/membership'

const store = useMembershipStore()

const myPlan = store.plans.find(p => p.id === 'vip')
const perks = ['Unlimited cuts', 'Free monthly product', 'Concierge booking', 'Dedicated barber']

function planBadgeClass(id) {
  if (id === 'essential') return 'app-badge blue'
  if (id === 'premium') return 'app-badge gold'
  return 'app-badge vip'
}
</script>
<template>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">

    <!-- Current plan hero -->
    <div class="app-card gold app-enter" style="padding:28px">
      <div class="plan-hero-row">
        <div>
          <div class="app-section-label" style="margin-bottom:8px">Your Plan</div>
          <div class="plan-name">VIP</div>
          <div class="plan-sub">Member since Jan 2024</div>
        </div>
        <div class="plan-hero-right">
          <span class="app-badge green" style="margin-bottom:8px">
            <span class="status-dot"></span>
            Active
          </span>
          <div class="plan-price">$149<span class="plan-price-sub">/mo</span></div>
          <div class="plan-billing">Next billing: Mar 15</div>
        </div>
      </div>

      <hr class="app-divider-gold" style="margin:20px 0 16px" />

      <!-- Perks -->
      <div style="display:flex;flex-direction:column;gap:10px">
        <div v-for="perk in perks" :key="perk" class="perk-row">
          <i class="ph ph-check-circle" style="color:var(--app-green);font-size:0.95rem;flex-shrink:0"></i>
          <span style="font-size:0.83rem;color:var(--app-text)">{{ perk }}</span>
        </div>
      </div>
    </div>

    <!-- All Plans -->
    <div class="app-section-label" style="margin-bottom:-4px">All Plans</div>
    <div class="plans-grid">
      <div
        v-for="(plan, i) in store.plans"
        :key="plan.id"
        class="app-card app-enter"
        :class="`app-d${i + 1}`"
        :style="plan.id === 'vip' ? 'padding:20px;border-color:rgba(201,168,76,0.4)' : 'padding:20px'"
      >
        <div class="plan-card-header">
          <span :class="planBadgeClass(plan.id)">{{ plan.label }}</span>
          <span v-if="plan.id === 'vip'" class="app-badge vip" style="font-size:0.68rem">Your Plan</span>
        </div>
        <div class="plan-card-price">
          ${{ plan.price }}<span class="plan-mo">/mo</span>
        </div>
        <div class="plan-card-perks">{{ plan.perks.join(' · ') }}</div>
      </div>
    </div>

    <!-- Referral -->
    <div class="app-card app-enter app-d4" style="padding:20px">
      <div class="referral-header">
        <i class="ph ph-gift" style="color:var(--app-gold);font-size:1.1rem"></i>
        <div style="font-size:0.95rem;font-weight:700;color:var(--app-text)">Refer a Friend</div>
      </div>
      <div style="font-size:0.83rem;color:var(--app-text-dim);margin-bottom:14px">
        Refer a friend and earn 1 free cut per referral. No limits.
      </div>
      <div class="referral-box">
        <div class="referral-code">lions-mj-ref-48</div>
        <button class="app-btn primary" style="font-size:0.82rem;padding:8px 16px">Copy Link</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* ── Hero card ─────────────────────────────── */
.plan-hero-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.plan-name {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--app-text);
  margin-bottom: 4px;
}
.plan-sub {
  font-size: 0.8rem;
  color: var(--app-text-dim);
}
.plan-hero-right {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.plan-price {
  font-size: 2rem;
  font-weight: 700;
  color: var(--app-gold);
  line-height: 1.1;
  margin-bottom: 4px;
}
.plan-price-sub {
  font-size: 0.9rem;
  color: var(--app-text-dim);
  font-weight: 400;
}
.plan-billing {
  font-size: 0.8rem;
  color: var(--app-text-dim);
}
.status-dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--app-green);
  margin-right: 3px;
}
.perk-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ── Plans grid ────────────────────────────── */
.plans-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.plan-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.plan-card-price {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--app-text);
  margin-bottom: 8px;
}
.plan-mo {
  font-size: 0.75rem;
  color: var(--app-text-muted);
  font-weight: 400;
}
.plan-card-perks {
  font-size: 0.75rem;
  color: var(--app-text-dim);
  line-height: 1.5;
}

/* ── Referral ──────────────────────────────── */
.referral-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.referral-box {
  display: flex;
  gap: 10px;
  align-items: center;
}
.referral-code {
  flex: 1;
  background: var(--app-surface-2);
  border: 1px dashed rgba(201, 168, 76, 0.3);
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 1.1rem;
  font-weight: 700;
  font-family: monospace;
  color: var(--app-gold);
  letter-spacing: 0.1em;
}
</style>
