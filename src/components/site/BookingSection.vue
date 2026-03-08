<template>
  <section class="booking-section" id="booking">
    <div class="booking-inner">
      <div class="section-header reveal">
        <h2 class="section-title">BOOKING OPTIONS</h2>
      </div>

      <div class="booking-options reveal">
        <a v-for="opt in bookingOptions" :key="opt.label"
          :href="opt.href"
          :target="opt.href.startsWith('http') ? '_blank' : undefined"
          class="booking-option"
          @click="trackIntent(opt.label, opt.href)">
          <div class="opt-icon-box">
            <svg :viewBox="opt.viewBox" fill="none" xmlns="http://www.w3.org/2000/svg" class="opt-svg">
              <path :d="opt.path" fill="#0a0a0a" />
            </svg>
          </div>
          <p class="opt-label">{{ opt.label }}</p>
          <p class="opt-desc">{{ opt.desc }}</p>
        </a>
      </div>

      <div class="hours-row reveal">
        <p v-for="h in hours" :key="h.days" class="hour-line">
          <strong>{{ h.days }}:</strong> {{ h.time }}
        </p>
      </div>

      <div class="social-row reveal">
        <a href="https://facebook.com/lionsloungebarbershop" target="_blank"
          class="social-btn" @click="trackIntent('Facebook', 'https://facebook.com/lionsloungebarbershop')">
          <svg viewBox="0 0 24 24" fill="white" class="social-svg">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        </a>
        <a href="https://instagram.com/lionsloungebarbershop" target="_blank"
          class="social-btn" @click="trackIntent('Instagram', 'https://instagram.com/lionsloungebarbershop')">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-svg">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTracker } from '../../composables/useTracker.js'
import { useScrollReveal } from '../../composables/useScrollReveal.js'

const { trackBookingIntent } = useTracker()
useScrollReveal()

function trackIntent(label, url) { trackBookingIntent(label, url) }

const bookingOptions = [
  {
    label: 'Vagaro App',
    desc: 'Ios and Android',
    href: 'https://vagaro.com/lionsloungebarbershop',
    viewBox: '0 0 24 24',
    path: 'M7 17L17 7M17 7H7M17 7V17',
  },
  {
    label: 'WhatsApp',
    desc: '+1 689-231-9590',
    href: 'https://wa.me/16892319590',
    viewBox: '0 0 24 24',
    path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.954 9.954 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z',
  },
  {
    label: 'Phone',
    desc: '+1 689-231-9590',
    href: 'tel:+16892319590',
    viewBox: '0 0 24 24',
    path: 'M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z',
  },
  {
    label: 'Walk-in',
    desc: '340 Moore Rd, Ocoee',
    href: 'https://maps.google.com/?q=340+Moore+Rd+Ocoee+FL',
    viewBox: '0 0 24 24',
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
  },
]

const hours = [
  { days: 'Monday to Friday', time: '9:00 AM – 8:00 PM' },
  { days: 'Saturday', time: '9:00 AM – 6:00 PM' },
  { days: 'Sunday', time: '10:00 AM – 3:00 PM' },
]
</script>

<style scoped>
.booking-section {
  padding: 100px 24px 120px;
  background:
    radial-gradient(ellipse 80% 50% at 50% 100%, rgba(120, 80, 10, 0.35) 0%, transparent 70%),
    var(--color-black);
  text-align: center;
}
.booking-inner { max-width: 1200px; margin: 0 auto; }
.section-header { margin-bottom: 64px; }
.section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  letter-spacing: 4px;
  color: var(--color-white);
  text-transform: uppercase;
}

/* Cards */
.booking-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 56px;
}
.booking-option {
  position: relative;
  background: rgba(255,255,255,0.03);
  border-radius: 16px;
  padding: 40px 24px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  transition: background 0.3s, transform 0.3s;
  isolation: isolate;
}
/* gradient border: bright top-left → fades bottom-right */
.booking-option::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1px;
  background: linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 60%, rgba(255,255,255,0.02) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
.booking-option:hover {
  background: rgba(255,255,255,0.06);
  transform: translateY(-4px);
}
.opt-icon-box {
  width: 46px;
  height: 46px;
  background: rgba(255,255,255,0.92);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  flex-shrink: 0;
}
.opt-svg {
  width: 22px;
  height: 22px;
}
.opt-label {
  font-family: var(--font-body);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-white);
  margin-bottom: 8px;
}
.opt-desc {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
}

/* Hours */
.hours-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 36px;
}
.hour-line {
  font-size: 0.9rem;
  color: var(--color-white);
}
.hour-line strong {
  font-weight: 700;
  color: var(--color-white);
}

/* Social */
.social-row {
  display: flex;
  justify-content: center;
  gap: 12px;
}
.social-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-gold);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s, transform 0.3s;
}
.social-btn:hover { background: var(--color-gold-light); transform: scale(1.1); }
.social-svg { width: 20px; height: 20px; }

@media (max-width: 900px) {
  .booking-options { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 540px) {
  .booking-section { padding: 80px 16px 100px; }
  .booking-options { grid-template-columns: 1fr; }
  .opt-label { font-size: 1.2rem; }
}
</style>
