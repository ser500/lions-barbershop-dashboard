<script setup>
const stats = [
  { label: 'Total Visits',      value: '48',                   icon: 'ph-calendar-check' },
  { label: 'Total Spent',       value: '$4,320',               icon: 'ph-currency-dollar' },
  { label: 'Favorite Service',  value: 'Signature Cut + Beard', icon: 'ph-scissors' },
  { label: 'Favorite Barber',   value: 'Devon Richards',       icon: 'ph-user' },
]

const visits = [
  { date: 'Mar 5, 2026',  service: 'Signature Cut + Beard', barber: 'Devon Richards', amount: 110, rating: 5 },
  { date: 'Feb 10, 2026', service: 'Signature Cut + Beard', barber: 'Devon Richards', amount: 110, rating: 5 },
  { date: 'Jan 14, 2026', service: 'Signature Cut + Beard', barber: 'Devon Richards', amount: 110, rating: 5 },
  { date: 'Dec 18, 2025', service: 'Signature Cut + Beard', barber: 'Devon Richards', amount: 110, rating: 4 },
  { date: 'Nov 21, 2025', service: 'Royal Shave',           barber: 'Devon Richards', amount: 75,  rating: 5 },
  { date: 'Oct 28, 2025', service: 'Signature Cut + Beard', barber: 'Devon Richards', amount: 110, rating: 5 },
]
</script>
<template>
  <div class="p-6 font-inter space-y-6">
    <!-- Stats -->
    <div class="grid grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.label" class="rounded-xl p-4" style="background:#111;border:1px solid #1a1a1a">
        <div class="flex items-center gap-2 mb-2">
          <i :class="`ph ${stat.icon}`" style="color:#b8960c;font-size:0.9rem"></i>
          <span style="font-size:0.68rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">{{ stat.label }}</span>
        </div>
        <div style="font-size:0.95rem;font-weight:700;color:#ffffff">{{ stat.value }}</div>
      </div>
    </div>

    <!-- Visit timeline -->
    <div>
      <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Visit History</div>
      <div class="space-y-3">
        <div v-for="(v, i) in visits" :key="i" class="p-5 rounded-xl" style="background:#111;border:1px solid #1a1a1a">
          <div class="flex items-center justify-between">
            <div>
              <div style="font-size:0.85rem;font-weight:700;color:#e5e7eb;margin-bottom:3px">{{ v.service }}</div>
              <div style="font-size:0.78rem;color:#6b7280">{{ v.date }} · {{ v.barber }}</div>
            </div>
            <div class="text-right">
              <div style="font-size:1rem;font-weight:700;color:#b8960c;margin-bottom:3px">${{ v.amount }}</div>
              <div class="flex gap-0.5 justify-end">
                <i v-for="s in 5" :key="s" class="ph ph-star-fill" :style="{ color: s <= v.rating ? '#b8960c' : '#2a2a2a', fontSize: '0.75rem' }"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
