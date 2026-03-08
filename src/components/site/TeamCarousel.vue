<template>
  <section class="team-section" id="team">
    <div class="section-header reveal">
      <p class="eyebrow">💈 MEET THE CREW</p>
      <h2 class="section-title">OUR <span>TEAM</span></h2>
      <div class="gold-line"></div>
      <p class="section-subtitle">World-class barbers. Local legends.</p>
    </div>
    <div class="team-carousel reveal" style="padding: 0 24px">
      <Swiper
        :modules="modules"
        :slides-per-view="1.5"
        :space-between="24"
        :loop="true"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :grab-cursor="true"
        :breakpoints="{
          640: { slidesPerView: 2.5 },
          1024: { slidesPerView: 4 }
        }"
      >
        <SwiperSlide v-for="(member, i) in team" :key="member.name">
          <div class="team-card" @click="trackBarberView(member.name, i)">
            <div class="member-photo-wrap">
              <img v-if="member.photo" :src="member.photo" :alt="member.name" class="member-photo" />
              <div v-else class="member-photo-fallback">{{ member.name[0] }}</div>
            </div>
            <div class="member-info">
              <h4 class="member-name">{{ member.name }}</h4>
              <p class="member-role">{{ member.role }}</p>
              <p class="member-specialty">{{ member.specialty }}</p>
              <a href="https://vagaro.com/lionsloungebarbershop" target="_blank" class="btn-outline team-btn"
                @click.stop="trackIntent(member.name)">
                Book {{ member.name }}
              </a>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { useTracker } from '../../composables/useTracker.js'
import { useScrollReveal } from '../../composables/useScrollReveal.js'

const { trackBookingIntent } = useTracker()
const modules = [Autoplay]
useScrollReveal()

function trackBarberView(name, index) {
  // just UI interaction
}
function trackIntent(name) {
  trackBookingIntent(name, 'https://vagaro.com/lionsloungebarbershop')
}

const team = [
  { name: 'Gabriel & Isabelle', role: 'Owners', specialty: 'Visionary minds behind Lion\'s Lounge — luxury, innovation, world-class experience.', photo: '/src/assets/images/team/gabriel-isabelle.webp' },
  { name: 'Bormann', role: 'Senior Barber · 20 yrs exp', specialty: 'Expert in scissor cuts, male grooming, and image consulting.', photo: '/src/assets/images/team/bormann.webp' },
  { name: 'Ulysses', role: 'Barber · 10 yrs exp', specialty: 'Masters all hair types — beard expert and artist for all ages.', photo: '/src/assets/images/team/ulysses.webp' },
  { name: 'Enzo', role: 'Barber', specialty: 'Hair Art · Designs · Creative cuts.', photo: '/src/assets/images/team/enzo.webp' },
  { name: 'Guido', role: 'Barber · 9 yrs exp', specialty: 'Fade and beard expert. Passionate and detail-driven.', photo: '/src/assets/images/team/guido.webp' },
  { name: 'Vinicius', role: 'Barber · 10 yrs exp', specialty: 'Passionate about growth, precision, and top service.', photo: '/src/assets/images/team/vinicius.webp' },
]
</script>

<style scoped>
.team-section {
  padding: 100px 0;
  background: var(--color-dark);
}
.section-header { text-align: center; margin-bottom: 56px; padding: 0 24px; }
.eyebrow {
  font-family: var(--font-display);
  font-size: 0.75rem;
  letter-spacing: 4px;
  color: var(--color-gold);
  text-transform: uppercase;
  margin-bottom: 12px;
}
.team-card {
  background: var(--color-dark-2);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.3s, transform 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}
.team-card:hover { border-color: rgba(201,168,76,0.4); transform: translateY(-4px); }
.member-photo-wrap {
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  flex-shrink: 0;
}
.member-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  transition: transform 0.5s ease;
}
.team-card:hover .member-photo { transform: scale(1.04); }
.member-photo-fallback {
  width: 100%;
  height: 100%;
  background: rgba(201,168,76,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-family: var(--font-display);
  color: var(--color-gold);
}
.member-info {
  padding: 20px 20px 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.member-name {
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 4px;
}
.member-role { font-size: 0.78rem; color: var(--color-gray-light); margin-bottom: 10px; }
.member-specialty { font-size: 0.8rem; color: var(--color-gray); margin-bottom: 20px; line-height: 1.6; flex: 1; }
.team-btn { font-size: 0.72rem; padding: 10px 18px; min-height: 44px; align-self: flex-start; }
@media (max-width: 640px) {
  .team-section { padding: 80px 0; }
  .member-photo-wrap { aspect-ratio: 3 / 4; }
}
</style>
