<template>
  <section class="reviews-section" id="reviews">
    <div class="reviews-inner">
      <div class="section-header reveal">
        <p class="eyebrow">⭐ WHAT THEY SAY</p>
        <h2 class="section-title">1000+ <span>REVIEWS</span></h2>
        <div class="gold-line"></div>
        <div class="stars-row">⭐⭐⭐⭐⭐</div>
      </div>
      <div class="reviews-grid">
        <div class="review-card reveal" v-for="r in reviews" :key="r.name">
          <div class="review-stars">⭐⭐⭐⭐⭐</div>
          <p class="review-text">"{{ r.text }}"</p>
          <div class="reviewer">
            <div class="reviewer-avatar">
              <img v-if="r.photo" :src="r.photo" :alt="r.name" class="reviewer-photo" />
              <span v-else>{{ r.name[0] }}</span>
            </div>
            <div>
              <p class="reviewer-name">{{ r.name }}</p>
              <p class="reviewer-meta">{{ r.meta }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useScrollReveal } from '../../composables/useScrollReveal.js'
useScrollReveal()

const reviews = [
  { name: 'Christophe Guynn', text: "One of the best haircuts I've had for a long time. Great service. Great atmosphere. I'll definitely be going here from now on!", meta: 'Google Review · Jun 2024', photo: '/src/assets/images/reviews/christophe.webp' },
  { name: 'Charles Fisher', text: 'Great haircut and finally got my hair to style the way I wanted it to for years. Vinicius is amazing and you won\'t be disappointed.', meta: 'Google Review · Jun 2024', photo: '/src/assets/images/reviews/charles.webp' },
  { name: 'Nick Santos', text: 'From the moment I walked in, I was greeted with warmth and professionalism. The modern yet inviting decor immediately set the tone for a luxurious experience.', meta: 'Google Review · Jun 2024', photo: '/src/assets/images/reviews/nick.webp' },
  { name: 'Peter Parise', text: 'Great service, clean atmosphere, Vinicius my barber is very detailed.', meta: 'Google Review · Jun 2024', photo: '/src/assets/images/reviews/peter.webp' },
]
</script>

<style scoped>
.reviews-section {
  padding: 100px 24px;
  background: var(--color-black);
}
.reviews-inner { max-width: 1200px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 56px; }
.eyebrow {
  font-family: var(--font-display);
  font-size: 0.75rem;
  letter-spacing: 4px;
  color: var(--color-gold);
  text-transform: uppercase;
  margin-bottom: 12px;
}
.stars-row { font-size: 1.5rem; margin-top: 12px; }
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
@media (max-width: 900px) {
  .reviews-grid { grid-template-columns: 1fr; }
}
.review-card {
  background: var(--color-dark-2);
  border: 1px solid rgba(201,168,76,0.15);
  border-radius: 16px;
  padding: 28px;
  transition: border-color 0.3s, transform 0.3s;
}
.review-card:hover { border-color: var(--color-gold); transform: translateY(-3px); }
.review-stars { font-size: 1rem; margin-bottom: 16px; }
.review-text {
  font-size: 0.88rem;
  color: var(--color-gray-light);
  line-height: 1.7;
  margin-bottom: 20px;
  font-style: italic;
}
.reviewer { display: flex; align-items: center; gap: 12px; }
.reviewer-avatar {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--color-gold);
  color: var(--color-black);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700;
  font-family: var(--font-display);
  flex-shrink: 0;
  overflow: hidden;
}
.reviewer-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.reviewer-name { font-weight: 600; font-size: 0.9rem; }
.reviewer-meta { font-size: 0.75rem; color: var(--color-gray); }
@media (max-width: 640px) {
  .reviews-section { padding: 80px 16px; }
}
</style>
