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
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">

    <!-- Stats grid -->
    <div class="stats-grid">
      <div
        v-for="(stat, i) in stats"
        :key="stat.label"
        class="app-stat app-enter"
        :class="`app-d${i + 1}`"
      >
        <div class="app-stat-label">{{ stat.label }}</div>
        <div class="app-stat-value">{{ stat.value }}</div>
        <i :class="`ph ${stat.icon} app-stat-icon`"></i>
      </div>
    </div>

    <!-- Visit history label -->
    <div class="app-section-label" style="margin-bottom:-4px">Visit History</div>

    <!-- Visit list -->
    <div
      v-for="(v, i) in visits"
      :key="i"
      class="app-card app-enter"
      :class="`app-d${Math.min(i + 1, 7)}`"
      style="padding:16px 20px"
    >
      <div class="visit-row">
        <div class="visit-left">
          <div class="visit-date">{{ v.date }}</div>
          <div class="visit-service">{{ v.service }}</div>
          <div class="visit-meta">
            <i class="ph ph-user"></i> {{ v.barber }}
          </div>
        </div>
        <div class="visit-right">
          <div class="visit-amount">${{ v.amount }}</div>
          <div class="star-row">
            <i
              v-for="s in 5"
              :key="s"
              class="ph ph-star-fill"
              :style="{ color: s <= v.rating ? 'var(--app-gold)' : 'var(--app-text-muted)', fontSize: '0.75rem' }"
            ></i>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.visit-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.visit-left { flex: 1; min-width: 0; }
.visit-date {
  font-size: 0.8rem;
  color: var(--app-text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 4px;
}
.visit-service {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--app-text);
  margin-bottom: 3px;
}
.visit-meta {
  font-size: 0.8rem;
  color: var(--app-text-dim);
  display: flex;
  align-items: center;
  gap: 5px;
}
.visit-right {
  text-align: right;
  flex-shrink: 0;
}
.visit-amount {
  font-size: 1rem;
  font-weight: 700;
  color: var(--app-gold);
  margin-bottom: 5px;
}
.star-row {
  display: flex;
  gap: 2px;
  justify-content: flex-end;
}
</style>
