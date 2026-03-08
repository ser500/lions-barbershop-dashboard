<template>
  <section class="booking-section" id="booking">
    <div class="booking-inner">
      <div class="section-header reveal">
        <p class="eyebrow">📞 GET IN THE CHAIR</p>
        <h2 class="section-title">BOOK YOUR <span>VISIT</span></h2>
        <div class="gold-line"></div>
      </div>
      <div class="booking-options reveal">
        <a v-for="opt in bookingOptions" :key="opt.label"
          :href="opt.href"
          :target="opt.href.startsWith('http') ? '_blank' : undefined"
          class="booking-option"
          @click="trackIntent(opt.label, opt.href)">
          <span class="opt-icon">{{ opt.icon }}</span>
          <div>
            <p class="opt-label">{{ opt.label }}</p>
            <p class="opt-desc">{{ opt.desc }}</p>
          </div>
        </a>
      </div>
      <div class="hours-social reveal">
        <div class="hours-block">
          <h4 class="block-title">HOURS</h4>
          <div class="hours-list">
            <div class="hour-row" v-for="h in hours" :key="h.days">
              <span class="hour-days">{{ h.days }}</span>
              <span class="hour-time">{{ h.time }}</span>
            </div>
          </div>
        </div>
        <div class="social-block">
          <h4 class="block-title">FIND US</h4>
          <div class="social-links">
            <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank"
              class="social-link" @click="trackIntent(s.label, s.href)">
              {{ s.icon }} {{ s.label }}
            </a>
          </div>
        </div>
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
  { icon: '📱', label: 'Vagaro App', desc: 'Book online — fastest way to secure your slot', href: 'https://vagaro.com/lionsloungebarbershop' },
  { icon: '💬', label: 'WhatsApp', desc: 'Message us directly for same-day availability', href: 'https://wa.me/14075551234' },
  { icon: '📞', label: 'Call Us', desc: 'Speak with a team member directly', href: 'tel:+14075551234' },
  { icon: '🚶', label: 'Walk-In', desc: 'Come in anytime during business hours', href: '#booking' },
]

const hours = [
  { days: 'Monday – Friday', time: '9:00 AM – 8:00 PM' },
  { days: 'Saturday', time: '8:00 AM – 7:00 PM' },
  { days: 'Sunday', time: '10:00 AM – 5:00 PM' },
]

const socials = [
  { icon: '📸', label: 'Instagram', href: 'https://instagram.com/lionsloungebarbershop' },
  { icon: '👍', label: 'Facebook', href: 'https://facebook.com/lionsloungebarbershop' },
  { icon: '🗺️', label: 'Google Maps', href: 'https://maps.google.com/?q=lions+lounge+barbershop+orlando' },
]
</script>

<style scoped>
.booking-section {
  padding: 100px 24px;
  background: var(--color-black);
}
.booking-inner { max-width: 1000px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 56px; }
.eyebrow {
  font-family: var(--font-display);
  font-size: 0.75rem;
  letter-spacing: 4px;
  color: var(--color-gold);
  text-transform: uppercase;
  margin-bottom: 12px;
}
.booking-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 60px;
}
.booking-option {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--color-dark-2);
  border: 1px solid rgba(201,168,76,0.15);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s;
}
.booking-option:hover { border-color: var(--color-gold); transform: translateY(-2px); }
.opt-icon { font-size: 1.8rem; flex-shrink: 0; }
.opt-label {
  font-family: var(--font-display);
  font-size: 0.9rem;
  letter-spacing: 1px;
  color: var(--color-white);
  margin-bottom: 4px;
}
.opt-desc { font-size: 0.75rem; color: var(--color-gray-light); }
.hours-social {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}
.block-title {
  font-family: var(--font-display);
  font-size: 0.8rem;
  letter-spacing: 3px;
  color: var(--color-gold);
  margin-bottom: 20px;
}
.hour-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  font-size: 0.85rem;
}
.hour-days { color: var(--color-gray-light); }
.hour-time { color: var(--color-white); font-weight: 500; }
.social-links { display: flex; flex-direction: column; gap: 12px; }
.social-link {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.88rem;
  color: var(--color-gray-light);
  transition: color 0.3s;
}
.social-link:hover { color: var(--color-gold); }
@media (max-width: 640px) { .hours-social { grid-template-columns: 1fr; } }
</style>
