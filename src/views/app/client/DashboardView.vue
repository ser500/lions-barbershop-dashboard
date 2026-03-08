<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const recentActivity = [
  { date: 'Mar 5, 2026',  service: 'Signature Cut + Beard', barber: 'Devon Richards', amount: '$110' },
  { date: 'Feb 10, 2026', service: 'Signature Cut + Beard', barber: 'Devon Richards', amount: '$110' },
  { date: 'Jan 14, 2026', service: 'Signature Cut + Beard', barber: 'Devon Richards', amount: '$110' },
]
</script>
<template>
  <div class="p-6 font-inter space-y-5">
    <!-- Welcome card -->
    <div class="rounded-xl p-6" style="background:#111;border:1px solid #1a1a1a">
      <div class="flex items-start justify-between">
        <div>
          <div style="font-size:1.3rem;font-weight:700;color:#e5e7eb;margin-bottom:4px">Welcome back, Marcus</div>
          <div class="flex items-center gap-3 mb-3">
            <span style="font-size:0.75rem;font-weight:600;background:rgba(232,232,232,0.1);color:#e8e8e8;border:1px solid rgba(232,232,232,0.3);padding:2px 10px;border-radius:20px">VIP Member</span>
            <span style="font-size:0.78rem;color:#6b7280">Unlimited cuts · Next billing Mar 15</span>
          </div>
        </div>
        <div class="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold" style="background:rgba(232,232,232,0.1);color:#e8e8e8;border:1px solid rgba(232,232,232,0.3)">MJ</div>
      </div>
    </div>

    <!-- Next appointment -->
    <div class="rounded-xl p-6" style="background:#111;border:1px solid #1a1a1a">
      <div style="font-size:0.72rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;margin-bottom:12px">Next Appointment</div>
      <div class="flex items-start justify-between">
        <div>
          <div style="font-size:1.1rem;font-weight:700;color:#e5e7eb;margin-bottom:4px">Tuesday, Mar 10</div>
          <div style="font-size:0.85rem;color:#9ca3af;margin-bottom:2px">Signature Cut + Beard</div>
          <div style="font-size:0.85rem;color:#9ca3af;margin-bottom:2px">Devon Richards · Downtown</div>
        </div>
        <div class="text-right">
          <div style="font-size:1.6rem;font-weight:700;color:#b8960c">2</div>
          <div style="font-size:0.72rem;color:#6b7280">days away</div>
        </div>
      </div>
    </div>

    <!-- Smart rebooking nudge -->
    <div class="rounded-xl p-5" style="background:rgba(184,150,12,0.05);border:1px solid rgba(184,150,12,0.3)">
      <div class="flex items-start gap-3">
        <i class="ph ph-sparkle" style="color:#b8960c;font-size:1.1rem;flex-shrink:0;margin-top:2px"></i>
        <div class="flex-1">
          <div style="font-size:0.85rem;font-weight:600;color:#e5e7eb;margin-bottom:4px">Based on your 4-week pattern, you're due for a cut this week.</div>
          <div style="font-size:0.78rem;color:#9ca3af">Your last 8 visits average every 26 days — you're at day 24.</div>
        </div>
        <button @click="router.push('/app/client/appointments')" style="font-size:0.78rem;font-weight:600;background:linear-gradient(135deg,#b8960c,#8a7009);color:#000;border:none;padding:8px 16px;border-radius:8px;cursor:pointer;flex-shrink:0;white-space:nowrap">Book Now</button>
      </div>
    </div>

    <!-- Recent activity -->
    <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
      <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Recent Visits</div>
      <div class="space-y-3">
        <div v-for="(a, i) in recentActivity" :key="i" class="flex items-center justify-between p-3 rounded-lg" style="background:#0f0f0f;border:1px solid #1e1e1e">
          <div>
            <div style="font-size:0.83rem;font-weight:600;color:#e5e7eb">{{ a.service }}</div>
            <div style="font-size:0.72rem;color:#6b7280;margin-top:1px">{{ a.date }} · {{ a.barber }}</div>
          </div>
          <span style="font-size:0.9rem;font-weight:700;color:#b8960c">{{ a.amount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
