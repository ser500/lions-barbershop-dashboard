<template>
  <section class="membership-section" id="memberships">
    <div class="membership-inner">
      <div class="section-header reveal">
        <p class="eyebrow">👑 EXCLUSIVE ACCESS</p>
        <h2 class="section-title">LIONS <span>CLUB</span></h2>
        <div class="gold-line"></div>
        <p class="section-subtitle">Join the pride. Unlock premium benefits and savings.</p>
      </div>

      <div class="benefits-grid reveal">
        <div class="benefit" v-for="b in benefits" :key="b">
          <span class="benefit-check">✓</span>
          <span>{{ b }}</span>
        </div>
      </div>

      <div class="plans-grid reveal">
        <PlanCard
          v-for="plan in plans"
          :key="plan.name"
          :plan="plan"
          @book="onBook"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import PlanCard from './PlanCard.vue'
import { useTracker } from '../../composables/useTracker.js'
import { useScrollReveal } from '../../composables/useScrollReveal.js'

const { trackBookingIntent } = useTracker()
useScrollReveal()

function onBook(planName) {
  trackBookingIntent(planName, 'https://vagaro.com/lionsloungebarbershop')
  window.open('https://vagaro.com/lionsloungebarbershop', '_blank')
}

const benefits = [
  'Priority booking — skip the wait',
  'Exclusive member pricing on all services',
  'Birthday month special treatment',
  'Members-only promotions and events',
  'Flexible pause or cancel anytime',
  'Dedicated member support line',
  'Loyalty points on every visit',
]

const plans = [
  {
    name: 'BLACK',
    tier: 'black',
    tagline: 'The Ultimate Experience',
    price_combo: '$179.90/mo',
    price_cut: '$89.90/mo',
    features: ['Unlimited haircuts (with beard)', 'Or haircut-only option', 'Top-priority booking', 'All add-ons at member rate', 'VIP lounge access'],
    highlight: true,
  },
  {
    name: 'GOLD',
    tier: 'gold',
    tagline: 'Smart Value, Premium Quality',
    price_combo: '$139.90/mo',
    price_cut: '$69.90/mo',
    features: ['Haircut + beard or haircut only', 'Available Tue & Wed only', 'Priority booking over walk-ins', 'Member pricing on add-ons'],
    highlight: false,
  },
  {
    name: 'ESSENTIAL',
    tier: 'essential',
    tagline: 'Simple. Clean. Consistent.',
    price_combo: '$40.00/mo',
    price_cut: null,
    features: ['1 haircut per month', 'Standard booking', 'Member community access'],
    highlight: false,
  },
]
</script>

<style scoped>
.membership-section {
  padding: 100px 24px;
  background:
    linear-gradient(to bottom, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.75) 50%, rgba(10,10,10,0.92) 100%),
    url('/images/membership-banner.webp') center/cover no-repeat;
  background-color: var(--color-dark);
}
.membership-inner { max-width: 1200px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 56px; }
.eyebrow {
  font-family: var(--font-display);
  font-size: 0.75rem;
  letter-spacing: 4px;
  color: var(--color-gold);
  text-transform: uppercase;
  margin-bottom: 12px;
}
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 14px;
  margin-bottom: 60px;
  background: var(--color-dark-2);
  border: 1px solid rgba(201,168,76,0.15);
  border-radius: 16px;
  padding: 32px;
}
.benefit {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
  color: var(--color-gray-light);
}
.benefit-check {
  color: var(--color-gold);
  font-weight: 700;
  flex-shrink: 0;
}
.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
@media (max-width: 768px) {
  .membership-section { padding: 80px 20px; }
  .plans-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
  .benefits-grid { grid-template-columns: 1fr; padding: 24px; }
}
</style>
