<script setup>
import { ref, computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useMembershipStore } from '../../../stores/membership'

const store = useMembershipStore()

const planCounts = computed(() => {
  const counts = { essential: 0, premium: 0, vip: 0 }
  store.subscribers.forEach(s => { counts[s.plan]++ })
  return counts
})

const donutSeries = computed(() => [planCounts.value.essential, planCounts.value.premium, planCounts.value.vip])
const donutOptions = ref({
  chart: { type: 'donut', background: 'transparent' },
  colors: ['#a8b8c8', '#c9a84c', '#e8e8e8'],
  labels: ['Essential', 'Premium', 'VIP'],
  dataLabels: { enabled: false },
  legend: { labels: { colors: '#9ca3af' } },
  plotOptions: { pie: { donut: { size: '65%' } } },
  tooltip: { theme: 'dark' },
})

const atRisk = computed(() => store.subscribers.filter(s => s.status === 'at-risk' || s.status === 'inactive'))

function planBadgeClass(plan) {
  if (plan === 'vip') return 'app-badge vip'
  if (plan === 'premium') return 'app-badge gold'
  return 'app-badge blue'
}

function statusBadgeClass(status) {
  if (status === 'active') return 'app-badge green'
  if (status === 'at-risk') return 'app-badge amber'
  return 'app-badge red'
}
</script>
<template>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">
    <!-- Stats row -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
      <div class="app-stat app-enter app-d1" style="padding:16px">
        <div class="app-stat-label">Total Subscribers</div>
        <div class="app-stat-value">{{ store.stats.totalSubscribers }}</div>
        <i class="ph ph-users app-stat-icon"></i>
      </div>
      <div class="app-stat app-enter app-d2" style="padding:16px">
        <div class="app-stat-label">MRR</div>
        <div class="app-stat-value" style="color:var(--app-gold)">${{ store.stats.mrr }}</div>
        <i class="ph ph-crown-simple app-stat-icon"></i>
      </div>
      <div class="app-stat app-enter app-d3" style="padding:16px">
        <div class="app-stat-label">Churn Rate</div>
        <div class="app-stat-value" style="color:var(--app-amber)">{{ store.stats.churnRate }}%</div>
        <i class="ph ph-arrow-counter-clockwise app-stat-icon"></i>
      </div>
      <div class="app-stat app-enter app-d4" style="padding:16px">
        <div class="app-stat-label">Avg Plan Value</div>
        <div class="app-stat-value">${{ store.stats.avgPlanValue }}</div>
        <i class="ph ph-trend-up app-stat-icon"></i>
      </div>
    </div>

    <!-- 2-col row: donut + subscribers table -->
    <div style="display:grid;grid-template-columns:1fr 2fr;gap:16px">
      <!-- Donut chart -->
      <div class="app-card app-enter app-d2" style="padding:20px">
        <div class="app-section-label" style="margin-bottom:16px">Plan Distribution</div>
        <VueApexCharts type="donut" height="220" :series="donutSeries" :options="donutOptions" />
        <div style="margin-top:12px;display:flex;flex-direction:column;gap:4px">
          <div class="flex justify-between" style="font-size:0.78rem">
            <span style="color:#a8b8c8">Essential</span><span style="color:var(--app-text-muted)">{{ planCounts.essential }}</span>
          </div>
          <div class="flex justify-between" style="font-size:0.78rem">
            <span style="color:var(--app-gold)">Premium</span><span style="color:var(--app-text-muted)">{{ planCounts.premium }}</span>
          </div>
          <div class="flex justify-between" style="font-size:0.78rem">
            <span style="color:var(--app-text)">VIP</span><span style="color:var(--app-text-muted)">{{ planCounts.vip }}</span>
          </div>
        </div>
      </div>

      <!-- Subscribers table -->
      <div class="app-card app-enter app-d3" style="padding:0;overflow:hidden">
        <div style="padding:20px 20px 0">
          <div class="app-section-label" style="margin-bottom:16px">All Subscribers</div>
        </div>
        <table class="app-table w-full">
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-center">Plan</th>
              <th class="text-center">Location</th>
              <th class="text-center">Billing</th>
              <th class="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sub in store.subscribers" :key="sub.id">
              <td style="font-size:0.83rem;font-weight:600;color:var(--app-text)">{{ sub.name }}</td>
              <td class="text-center">
                <span :class="planBadgeClass(sub.plan)">{{ sub.plan.charAt(0).toUpperCase() + sub.plan.slice(1) }}</span>
              </td>
              <td class="text-center" style="font-size:0.78rem;color:var(--app-text-muted)">{{ sub.locationId === 'loc-1' ? 'Downtown' : 'East Side' }}</td>
              <td class="text-center" style="font-size:0.78rem;color:var(--app-text-muted)">{{ sub.billingDate }}</td>
              <td class="text-center">
                <span :class="statusBadgeClass(sub.status)">{{ sub.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- At-risk section -->
    <div
      v-if="atRisk.length"
      class="app-card app-enter app-d5"
      style="padding:20px;border:1px solid rgba(212,108,108,0.28);background:rgba(212,108,108,0.03)"
    >
      <div class="flex items-center gap-2" style="margin-bottom:16px">
        <i class="ph ph-warning" style="color:var(--app-red);font-size:1rem"></i>
        <div style="font-size:0.9rem;font-weight:700;color:var(--app-red)">At-Risk Subscribers</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <div
          v-for="sub in atRisk"
          :key="sub.id"
          class="flex items-center justify-between"
          style="padding:12px;border-radius:8px;background:var(--app-surface-2);border:1px solid var(--app-border-dim)"
        >
          <div class="flex items-center gap-3">
            <span style="font-size:0.83rem;font-weight:600;color:var(--app-text)">{{ sub.name }}</span>
            <span :class="planBadgeClass(sub.plan)">{{ sub.plan }}</span>
          </div>
          <div class="flex items-center gap-3">
            <span style="font-size:0.78rem;color:var(--app-text-muted)">Billing: {{ sub.billingDate }}</span>
            <span :class="statusBadgeClass(sub.status)">{{ sub.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
