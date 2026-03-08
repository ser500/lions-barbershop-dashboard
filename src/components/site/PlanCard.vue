<template>
  <div class="plan-card" :class="[`tier-${plan.tier}`, { highlight: plan.highlight }]">
    <div v-if="plan.highlight" class="popular-badge">MOST POPULAR</div>
    <div class="plan-header">
      <h3 class="plan-name">{{ plan.name }}</h3>
      <p class="plan-tagline">{{ plan.tagline }}</p>
    </div>
    <div class="plan-pricing">
      <div class="price-row">
        <span class="price-label">Haircut + Beard</span>
        <span class="price-val">{{ plan.price_combo }}</span>
      </div>
      <div class="price-row" v-if="plan.price_cut">
        <span class="price-label">Haircut Only</span>
        <span class="price-val">{{ plan.price_cut }}</span>
      </div>
    </div>
    <ul class="plan-features">
      <li v-for="f in plan.features" :key="f">
        <span class="check">✓</span> {{ f }}
      </li>
    </ul>
    <button class="btn-gold plan-btn" @click="$emit('book', plan.name)">
      JOIN {{ plan.name }}
    </button>
  </div>
</template>

<script setup>
defineProps({ plan: Object })
defineEmits(['book'])
</script>

<style scoped>
.plan-card {
  position: relative;
  background: var(--color-dark-2);
  border: 1px solid rgba(201,168,76,0.2);
  border-radius: 16px;
  padding: 36px 28px;
  transition: transform 0.3s, border-color 0.3s;
}
.plan-card:hover { transform: translateY(-4px); border-color: var(--color-gold); }
.plan-card.highlight {
  border-color: var(--color-gold);
  background: linear-gradient(135deg, rgba(201,168,76,0.08) 0%, var(--color-dark-2) 100%);
}
.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-gold);
  color: var(--color-black);
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 4px 16px;
  border-radius: 20px;
}
.plan-name {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 4px;
  color: var(--color-gold);
  margin-bottom: 6px;
}
.plan-tagline { font-size: 0.82rem; color: var(--color-gray-light); margin-bottom: 24px; }
.plan-pricing { margin-bottom: 24px; border-top: 1px solid rgba(201,168,76,0.15); padding-top: 20px; }
.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.price-label { font-size: 0.8rem; color: var(--color-gray-light); }
.price-val { font-family: var(--font-display); font-size: 1.1rem; color: var(--color-white); font-weight: 700; }
.plan-features { list-style: none; margin-bottom: 28px; }
.plan-features li {
  display: flex;
  gap: 10px;
  font-size: 0.85rem;
  color: var(--color-gray-light);
  margin-bottom: 10px;
}
.check { color: var(--color-gold); }
.plan-btn { width: 100%; text-align: center; font-size: 0.8rem; padding: 14px; }
</style>
