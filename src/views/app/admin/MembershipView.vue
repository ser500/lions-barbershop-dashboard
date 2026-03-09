<script setup>
import { computed } from 'vue'
import { useMembershipStore } from '../../../stores/membership'

const store = useMembershipStore()

const atRisk = computed(() => store.subscribers.filter(s => s.status === 'at-risk' || s.status === 'inactive'))

const recentActivity = [
  { text: 'Marcus Johnson renewed VIP plan',         time: '2d ago',  type: 'renew' },
  { text: 'Antoine B. enrolled in Essential plan',   time: '5d ago',  type: 'new' },
  { text: 'DeShawn P. cancelled Premium plan',       time: '8d ago',  type: 'cancel' },
  { text: 'Chris W. upgraded to Premium from Essential', time: '12d ago', type: 'upgrade' },
]

const kpis = [
  { label: 'Subscribers', value: '10',   icon: 'ph-users',       color: 'var(--app-text)' },
  { label: 'MRR',         value: '$921', icon: 'ph-crown-simple', color: 'var(--app-gold)' },
  { label: 'Churn Rate',  value: '4.2%', icon: 'ph-trend-down',  color: 'var(--app-amber)' },
  { label: 'Avg Value',   value: '$92',  icon: 'ph-chart-bar',   color: 'var(--app-text)' },
]

function planBadgeClass(plan) {
  if (plan === 'vip') return 'vip'
  if (plan === 'premium') return 'gold'
  return 'blue'
}

function statusBadgeClass(status) {
  if (status === 'active') return 'green'
  if (status === 'at-risk') return 'amber'
  return 'red'
}

function activityIcon(type) {
  if (type === 'new') return 'ph-check-circle'
  if (type === 'upgrade') return 'ph-arrow-circle-up'
  if (type === 'cancel') return 'ph-x-circle'
  return 'ph-arrows-clockwise'
}

function activityIconColor(type) {
  if (type === 'new') return 'var(--app-green)'
  if (type === 'upgrade') return 'var(--app-gold)'
  if (type === 'cancel') return 'var(--app-red)'
  return 'var(--app-gold)'
}
</script>
<template>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">
    <!-- Stats row -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
      <div
        v-for="(kpi, i) in kpis"
        :key="kpi.label"
        class="app-stat app-enter"
        :class="`app-d${i + 1}`"
      >
        <div class="app-stat-label">{{ kpi.label }}</div>
        <div class="app-stat-value" :style="{ color: kpi.color }">{{ kpi.value }}</div>
        <i :class="`ph ${kpi.icon} app-stat-icon`"></i>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <!-- Subscribers table -->
      <div class="app-card app-enter app-d3" style="padding:0;overflow:hidden">
        <div style="padding:16px 20px 0;margin-bottom:12px">
          <div class="app-section-label">Subscribers</div>
        </div>
        <table class="app-table" style="width:100%">
          <thead>
            <tr>
              <th style="text-align:left;padding:10px 20px">Name</th>
              <th style="text-align:center;padding:10px 12px">Plan</th>
              <th style="text-align:center;padding:10px 12px">Status</th>
              <th style="text-align:right;padding:10px 16px">Billing</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sub in store.subscribers" :key="sub.id">
              <td style="padding:10px 20px">
                <div style="font-size:0.83rem;font-weight:600;color:var(--app-text)">{{ sub.name }}</div>
                <div v-if="sub.plan === 'essential' && sub.cutsUsed !== null" style="font-size:0.68rem;color:var(--app-text-muted);margin-top:1px">{{ sub.cutsUsed }}/{{ sub.cutsAllowed }} cuts</div>
              </td>
              <td style="padding:10px 12px;text-align:center">
                <span class="app-badge" :class="planBadgeClass(sub.plan)">{{ sub.plan }}</span>
              </td>
              <td style="padding:10px 12px;text-align:center">
                <span class="app-badge" :class="statusBadgeClass(sub.status)">{{ sub.status }}</span>
              </td>
              <td style="padding:10px 16px;text-align:right;font-size:0.78rem;color:var(--app-text-muted)">{{ sub.billingDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Right column -->
      <div style="display:flex;flex-direction:column;gap:16px">
        <!-- Activity feed -->
        <div class="app-card app-enter app-d4" style="padding:20px">
          <div class="app-section-label" style="margin-bottom:14px">Recent Activity</div>
          <div style="display:flex;flex-direction:column;gap:12px">
            <div v-for="(a, i) in recentActivity" :key="i" style="display:flex;align-items:flex-start;gap:10px">
              <i :class="`ph ${activityIcon(a.type)}`" :style="{ color: activityIconColor(a.type), fontSize: '1rem', flexShrink: 0, marginTop: '1px' }"></i>
              <div style="flex:1">
                <div style="font-size:0.82rem;color:var(--app-text)">{{ a.text }}</div>
                <div style="font-size:0.7rem;color:var(--app-text-muted);margin-top:1px">{{ a.time }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- At-risk section -->
        <div v-if="atRisk.length" class="app-card app-enter app-d5" style="padding:16px;border-left:3px solid var(--app-amber)">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
            <i class="ph ph-warning" style="color:var(--app-amber);font-size:0.9rem"></i>
            <div style="font-size:0.85rem;font-weight:700;color:var(--app-amber)">At-Risk Subscribers</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div v-for="sub in atRisk" :key="sub.id" style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:8px;background:var(--app-surface);border:1px solid var(--app-border-dim)">
              <div>
                <div style="font-size:0.82rem;font-weight:600;color:var(--app-text)">{{ sub.name }}</div>
                <span class="app-badge amber" style="font-size:0.62rem;padding:1px 6px;margin-top:3px;display:inline-block">{{ sub.status }}</span>
              </div>
              <button class="app-btn ghost" style="font-size:0.72rem;padding:4px 10px">Contact</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
