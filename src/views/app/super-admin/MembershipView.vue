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
</script>
<template>
  <div class="p-6 font-inter space-y-6">
    <!-- Stats row -->
    <div class="grid grid-cols-4 gap-4">
      <div class="rounded-xl p-4" style="background:#111;border:1px solid #1a1a1a">
        <div style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;margin-bottom:4px">Total Subscribers</div>
        <div style="font-size:1.5rem;font-weight:700;color:#ffffff">{{ store.stats.totalSubscribers }}</div>
      </div>
      <div class="rounded-xl p-4" style="background:#111;border:1px solid #1a1a1a">
        <div style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;margin-bottom:4px">MRR</div>
        <div style="font-size:1.5rem;font-weight:700;color:#b8960c">${{ store.stats.mrr }}</div>
      </div>
      <div class="rounded-xl p-4" style="background:#111;border:1px solid #1a1a1a">
        <div style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;margin-bottom:4px">Churn Rate</div>
        <div style="font-size:1.5rem;font-weight:700;color:#fbbf24">{{ store.stats.churnRate }}%</div>
      </div>
      <div class="rounded-xl p-4" style="background:#111;border:1px solid #1a1a1a">
        <div style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;margin-bottom:4px">Avg Plan Value</div>
        <div style="font-size:1.5rem;font-weight:700;color:#ffffff">${{ store.stats.avgPlanValue }}</div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-6">
      <!-- Donut chart -->
      <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
        <div class="mb-3" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Plan Distribution</div>
        <VueApexCharts type="donut" height="220" :series="donutSeries" :options="donutOptions" />
        <div class="mt-3 space-y-1">
          <div class="flex justify-between" style="font-size:0.78rem">
            <span style="color:#a8b8c8">Essential</span><span style="color:#9ca3af">{{ planCounts.essential }}</span>
          </div>
          <div class="flex justify-between" style="font-size:0.78rem">
            <span style="color:#c9a84c">Premium</span><span style="color:#9ca3af">{{ planCounts.premium }}</span>
          </div>
          <div class="flex justify-between" style="font-size:0.78rem">
            <span style="color:#e8e8e8">VIP</span><span style="color:#9ca3af">{{ planCounts.vip }}</span>
          </div>
        </div>
      </div>

      <!-- Subscribers table -->
      <div class="col-span-2 rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
        <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">All Subscribers</div>
        <table class="w-full" style="border-collapse:collapse">
          <thead>
            <tr style="border-bottom:1px solid #1a1a1a">
              <th class="text-left pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Name</th>
              <th class="text-center pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Plan</th>
              <th class="text-center pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Location</th>
              <th class="text-center pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Billing</th>
              <th class="text-center pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sub in store.subscribers" :key="sub.id" style="border-bottom:1px solid #0f0f0f">
              <td class="py-2.5" style="font-size:0.83rem;font-weight:600;color:#e5e7eb">{{ sub.name }}</td>
              <td class="py-2.5 text-center">
                <span class="text-xs px-2 py-0.5 rounded-full font-medium" :style="planBadgeStyle(sub.plan)">{{ sub.plan.charAt(0).toUpperCase() + sub.plan.slice(1) }}</span>
              </td>
              <td class="py-2.5 text-center" style="font-size:0.78rem;color:#9ca3af">{{ sub.locationId === 'loc-1' ? 'Downtown' : 'East Side' }}</td>
              <td class="py-2.5 text-center" style="font-size:0.78rem;color:#9ca3af">{{ sub.billingDate }}</td>
              <td class="py-2.5 text-center">
                <span class="text-xs px-2 py-0.5 rounded-full font-medium" :style="statusBadgeStyle(sub.status)">{{ sub.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- At-risk section -->
    <div v-if="atRisk.length" class="rounded-xl p-5" style="background:rgba(239,68,68,0.05);border:1px solid rgba(239,68,68,0.15)">
      <div class="flex items-center gap-2 mb-4">
        <i class="ph ph-warning" style="color:#ef4444;font-size:1rem"></i>
        <div style="font-size:0.9rem;font-weight:700;color:#ef4444">At-Risk Subscribers</div>
      </div>
      <div class="space-y-2">
        <div v-for="sub in atRisk" :key="sub.id" class="flex items-center justify-between p-3 rounded-lg" style="background:#0f0f0f;border:1px solid #1e1e1e">
          <div class="flex items-center gap-3">
            <span style="font-size:0.83rem;font-weight:600;color:#e5e7eb">{{ sub.name }}</span>
            <span class="text-xs px-2 py-0.5 rounded-full font-medium" :style="planBadgeStyle(sub.plan)">{{ sub.plan }}</span>
          </div>
          <div class="flex items-center gap-3">
            <span style="font-size:0.78rem;color:#6b7280">Billing: {{ sub.billingDate }}</span>
            <span class="text-xs px-2 py-0.5 rounded-full font-medium" :style="statusBadgeStyle(sub.status)">{{ sub.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
