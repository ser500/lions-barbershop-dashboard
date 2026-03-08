<template>
  <section class="faq-section" id="faq">
    <div class="faq-inner">
      <div class="section-header reveal">
        <p class="eyebrow">❓ GOT QUESTIONS</p>
        <h2 class="section-title">FREQUENTLY <span>ASKED</span></h2>
        <div class="gold-line"></div>
      </div>
      <div class="faq-list reveal">
        <div
          v-for="(item, i) in faqs"
          :key="i"
          class="faq-item"
          :class="{ open: openIndex === i }"
          @click="toggle(i)"
        >
          <div class="faq-question">
            <span>{{ item.q }}</span>
            <span class="faq-icon">{{ openIndex === i ? '−' : '+' }}</span>
          </div>
          <div class="faq-answer">
            <p>{{ item.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '../../composables/useScrollReveal.js'
import { useAnalyticsStore } from '../../stores/analytics.js'

const store = useAnalyticsStore()
useScrollReveal()

const openIndex = ref(null)

function toggle(i) {
  if (openIndex.value === i) {
    openIndex.value = null
  } else {
    openIndex.value = i
    store.push('faq_open', { question_text: faqs[i].q })
  }
}

const faqs = [
  { q: 'Do I need an appointment?', a: 'Walk-ins are always welcome! However, booking in advance via Vagaro or WhatsApp guarantees your spot and minimizes wait time, especially on weekends.' },
  { q: 'How does the Lions Club membership work?', a: 'Choose a plan (BLACK, GOLD, or ESSENTIAL), pay monthly, and enjoy your included services plus member pricing. Cancel anytime — no contracts.' },
  { q: 'What is the difference between BLACK and GOLD plans?', a: 'BLACK plan members can book any day of the week, while GOLD members visit on Tuesdays and Wednesdays. Both offer haircut-only or haircut+beard options at their respective prices.' },
  { q: 'Can I choose my barber?', a: 'Absolutely! When booking via Vagaro, you can select your preferred barber based on availability. We recommend booking in advance to secure your favorite.' },
  { q: 'Do you offer services for kids?', a: 'Yes! We have Kid\'s Haircut services available. Our barbers are experienced and patient with younger clients to ensure a positive experience.' },
  { q: 'Where are you located?', a: 'We are located in Orlando, Florida. Find us on Google Maps or contact us via WhatsApp for the exact address and directions.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, cash, and digital payments. Membership billing is handled securely through our booking platform.' },
]
</script>

<style scoped>
.faq-section {
  padding: 100px 24px;
  background: var(--color-dark);
}
.faq-inner { max-width: 800px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 56px; }
.eyebrow {
  font-family: var(--font-display);
  font-size: 0.75rem;
  letter-spacing: 4px;
  color: var(--color-gold);
  text-transform: uppercase;
  margin-bottom: 12px;
}
.faq-item {
  border: 1px solid rgba(201,168,76,0.15);
  border-radius: 10px;
  margin-bottom: 12px;
  overflow: hidden;
  transition: border-color 0.3s;
  cursor: pointer;
}
.faq-item.open { border-color: var(--color-gold); }
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  font-family: var(--font-display);
  font-size: 0.9rem;
  letter-spacing: 1px;
  color: var(--color-white);
  user-select: none;
}
.faq-icon {
  color: var(--color-gold);
  font-size: 1.4rem;
  font-weight: 300;
  flex-shrink: 0;
}
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.3s;
}
.faq-item.open .faq-answer {
  max-height: 200px;
  padding: 0 24px 20px;
}
.faq-answer p { font-size: 0.88rem; color: var(--color-gray-light); line-height: 1.7; }
</style>
