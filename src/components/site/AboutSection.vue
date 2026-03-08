<template>
  <section class="about-section" id="about">
    <div class="about-inner">
      <div class="about-text reveal">
        <p class="eyebrow">🦁 OUR STORY</p>
        <h2 class="section-title">Welcome to <span>Lion's Lounge</span></h2>
        <div class="gold-line" style="margin:16px 0"></div>
        <p>
          Founded in May 2024 in the heart of Orlando, FL, Lion's Lounge Barbershop was born from a vision to redefine what a barber experience could be. We blended precision craftsmanship with luxury ambiance — creating a space where every client feels like royalty.
        </p>
        <p>
          Our team of expert barbers, led by owners Gabriel and Isabelle, brings passion and artistry to every cut. Whether you're looking for a sharp fade, a classic cut, or a relaxing shave, we deliver an experience that goes beyond the chair.
        </p>
        <p>
          We are more than a barbershop. We are a community — a lounge where style, confidence, and conversation meet.
        </p>
        <div class="about-badges">
          <div class="badge">📍 Orlando, FL</div>
          <div class="badge">📅 Est. May 2024</div>
          <div class="badge">⭐ 1000+ Reviews</div>
        </div>
      </div>
      <div class="about-visual reveal">
        <div class="visual-box">
          <img src="/src/assets/images/backgrounds/about-bg.webp" alt="Lion's Lounge interior" class="about-photo" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useScrollReveal } from '../../composables/useScrollReveal.js'
useScrollReveal()
</script>

<style scoped>
.about-section {
  padding: 100px 24px;
  background: var(--color-black);
}
.about-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.eyebrow {
  font-family: var(--font-display);
  font-size: 0.75rem;
  letter-spacing: 4px;
  color: var(--color-gold);
  text-transform: uppercase;
  margin-bottom: 12px;
}
.about-text p {
  color: var(--color-gray-light);
  line-height: 1.8;
  margin-bottom: 16px;
  font-size: 0.95rem;
}
.about-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}
.badge {
  padding: 8px 16px;
  border: 1px solid rgba(201,168,76,0.3);
  border-radius: 20px;
  font-size: 0.8rem;
  font-family: var(--font-display);
  letter-spacing: 1px;
  color: var(--color-gold);
}
.about-visual { display: flex; justify-content: center; }
.visual-box {
  width: 420px;
  max-width: 100%;
  border-radius: 24px;
  overflow: hidden;
  border: 2px solid rgba(201,168,76,0.25);
  position: relative;
}
.about-photo {
  width: 100%;
  height: 480px;
  object-fit: cover;
  display: block;
}
@media (max-width: 900px) {
  .about-inner { grid-template-columns: 1fr; gap: 40px; }
}
@media (max-width: 640px) {
  .about-section { padding: 80px 20px; }
  .about-visual { display: none; }
}
</style>
