<template>
  <section class="hero" id="home">
    <div class="hero-bg"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="hero-headline" ref="headline">
        <span class="line1">LOOK SHARP</span>
        <span class="line2">FEEL SHARPER</span>
      </h1>
      <p class="hero-sub" ref="subRef">
        Get ready for a next-level experience. Our services are personalized so you feel the best experience you can imagine. Precise cuts, legendary service, and an atmosphere that hooks you from the very first walk-in.
      </p>
      <div class="hero-ctas" ref="ctasRef">
        <a href="#memberships" class="btn-member"
          @click="trackClick('Become a MEMBER', '#memberships', 'hero')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          Become a MEMBER
        </a>
        <a href="https://vagaro.com/lionsloungebarbershop" target="_blank" class="btn-book"
          @click="trackIntent('Book Now - Hero', 'https://vagaro.com/lionsloungebarbershop')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
          Book Now
        </a>
      </div>
    </div>
    <div class="scroll-indicator">
      <span></span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { useTracker } from '../../composables/useTracker.js'

const { trackClick, trackBookingIntent } = useTracker()
const headline = ref(null)
const subRef = ref(null)
const ctasRef = ref(null)

function trackIntent(label, url) { trackBookingIntent(label, url) }

onMounted(() => {
  const tl = gsap.timeline({ delay: 0.3 })
  tl.fromTo('.line1', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
    .fromTo('.line2', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
    .fromTo(subRef.value, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
    .fromTo(ctasRef.value, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
})
</script>

<style scoped>
.hero {
  position: relative;
  z-index: 0;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background: url('/src/assets/images/backgrounds/hero-bg.webp') center/cover no-repeat;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 45%, transparent 65%),
    linear-gradient(to bottom, transparent 50%, var(--color-black) 100%);
}
.hero-content {
  position: relative;
  width: 55%;
  max-width: 760px;
  padding: 0 0 90px 48px;
}
.hero-headline {
  font-family: var(--font-display);
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.0;
  margin-bottom: 16px;
  white-space: nowrap;
}
.line1, .line2 {
  display: block;
  font-size: clamp(3.5rem, 6vw, 7rem);
  letter-spacing: 0;
  color: var(--color-white);
}
.hero-sub {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.78);
  max-width: 420px;
  margin-bottom: 28px;
  line-height: 1.65;
  text-align: left;
}
.hero-ctas {
  display: flex;
  gap: 12px;
}
.btn-member {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 16px;
  background: #b8972e;
  color: var(--color-white);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius: 6px;
  transition: background 0.3s;
}
.btn-member:hover { background: var(--color-gold); }
.btn-member svg, .btn-book svg { flex-shrink: 0; }
.btn-book {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 16px;
  background: rgba(255,255,255,0.92);
  color: var(--color-black);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius: 6px;
  transition: background 0.3s;
}
.btn-book:hover { background: #ffffff; }
.scroll-indicator {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
}
.scroll-indicator span {
  display: block;
  width: 22px;
  height: 38px;
  border: 2px solid rgba(255,255,255,0.35);
  border-radius: 11px;
  position: relative;
}
.scroll-indicator span::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 7px;
  background: rgba(255,255,255,0.6);
  border-radius: 2px;
  animation: scrollBounce 1.5s ease-in-out infinite;
}
@keyframes scrollBounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(8px); }
}
</style>
