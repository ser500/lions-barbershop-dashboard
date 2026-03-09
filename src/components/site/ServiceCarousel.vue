<template>
  <section class="services-section" id="services">
    <div class="section-header reveal">
      <p class="eyebrow">✂️ WHAT WE OFFER</p>
      <h2 class="section-title">OUR <span>SERVICES</span></h2>
      <div class="gold-line"></div>
    </div>

    <div class="carousel-block reveal">
      <h3 class="carousel-label">Core Services</h3>
      <Swiper
        :modules="modules"
        :slides-per-view="1.2"
        :space-between="20"
        :loop="true"
        :autoplay="{ delay: 3500, disableOnInteraction: false }"
        :grab-cursor="true"
        :breakpoints="{
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.5 }
        }"
      >
        <SwiperSlide v-for="s in coreServices" :key="s.name">
          <div class="service-card">
            <div class="service-icon-wrap">
              <img :src="s.icon" :alt="s.name" class="service-icon" />
            </div>
            <h4 class="service-name">{{ s.name }}</h4>
            <p class="service-desc">{{ s.desc }}</p>
            <a href="https://vagaro.com/lionsloungebarbershop" target="_blank" class="btn-gold service-btn"
              @click="trackIntent(s.name, 'https://vagaro.com/lionsloungebarbershop')">
              Book
            </a>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <div class="carousel-block reveal">
      <h3 class="carousel-label">Add-On Services</h3>
      <Swiper
        :modules="modules"
        :slides-per-view="1.5"
        :space-between="16"
        :loop="true"
        :autoplay="{ delay: 4000, disableOnInteraction: false, reverseDirection: true }"
        :grab-cursor="true"
        :breakpoints="{
          640: { slidesPerView: 2.5 },
          1024: { slidesPerView: 4.5 }
        }"
      >
        <SwiperSlide v-for="s in addOnServices" :key="s.name">
          <div class="service-card addon-card">
            <div class="service-icon-wrap">
              <img :src="s.icon" :alt="s.name" class="service-icon" />
            </div>
            <h4 class="service-name">{{ s.name }}</h4>
            <p class="service-desc">{{ s.desc }}</p>
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

const { trackBookingIntent } = useTracker()
const modules = [Autoplay]

function trackIntent(name, url) { trackBookingIntent(name, url) }

const I = (f) => `/images/services/${f}`

const coreServices = [
  { icon: I('man.svg'),           name: "Men's Haircut",    desc: "Includes consultation, wash, precise cut, professional styling, and daily maintenance tips. (30–40 min)" },
  { icon: I('haircut-1.svg'),     name: "Kid's Haircut",    desc: "Fun, precise haircut with consultation, optional wash, and gentle styling designed for children. (30–40 min)" },
  { icon: I('beard-1.svg'),       name: 'Hair Line up',     desc: "Sharpens edges and cleans the neck for a polished look — no tapers, fades, or wash." },
  { icon: I('bald.svg'),          name: 'Head Shave',       desc: "Smooth head shave with choice of clippers or shaver, complete with wash and refresh. (20 min)" },
  { icon: I('beard.svg'),         name: "Lion's Beard",     desc: "Warm towel prep, precise shave, quality wash, soothing aftershave — ideal for all beard types. (30 min)" },
  { icon: I('beard-trimming.svg'),name: 'Beard Express',    desc: "Practical, quick service using clippers only — ideal for short beards. No scissors or hot towels. (20 min)" },
  { icon: I('man-1.svg'),         name: 'Beard Experience', desc: "Full beard cleaning, shaping, exfoliation, premium wash, relaxing massage, warm towel, aftershave. (45 min)" },
]

const addOnServices = [
  { icon: I('explosion.svg'),      name: 'Brazilian Blowout',    desc: "Smooth, frizz-free locks that shine with a natural healthy glow. (60–90 min)" },
  { icon: I('eyebrow-pencil.svg'), name: 'Eyebrows',             desc: "Straight razor eyebrow shaping — natural, well-groomed look with a sharp finish." },
  { icon: I('ear.svg'),            name: 'Ear Waxing',           desc: "Warm wax ear hair removal — fast, effective, leaving ears clean and smooth." },
  { icon: I('clean.svg'),          name: 'Nose Waxing',          desc: "Warm wax removes nostril hair quickly and effectively with lasting smoothness." },
  { icon: I('creams.svg'),         name: 'Hair Hydration',       desc: "Repairs damage, ozone boosts shine, reduces frizz, and stimulates healthy growth." },
  { icon: I('hair-cutting.svg'),   name: 'Hair Camouflage',      desc: "Subtly blends grays, fades gradually — paraben-free for a natural look." },
  { icon: I('shaving-brush.svg'),  name: 'Beard Camouflage',     desc: "Subtly blends grays naturally — temporary, gradually fades, paraben-free, no dye." },
  { icon: I('haircut.svg'),        name: 'Beard Hydration',      desc: "Nourishes your beard and skin beneath, promoting softness, growth, and confidence." },
]
</script>

<style scoped>
.services-section {
  padding: 72px 0 100px;
  background: var(--color-dark);
}
.section-header {
  text-align: center;
  margin-bottom: 60px;
  padding: 0 24px;
}
.eyebrow {
  font-family: var(--font-display);
  font-size: 0.75rem;
  letter-spacing: 4px;
  color: var(--color-gold);
  text-transform: uppercase;
  margin-bottom: 12px;
}
.carousel-block {
  margin-bottom: 56px;
  padding: 0 24px;
}
.carousel-label {
  font-family: var(--font-display);
  font-size: 0.72rem;
  letter-spacing: 4px;
  color: var(--color-gold);
  text-transform: uppercase;
  margin-bottom: 24px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  gap: 16px;
}
.carousel-label::before,
.carousel-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(201,168,76,0.4));
}
.carousel-label::after {
  background: linear-gradient(to left, transparent, rgba(201,168,76,0.4));
}
.service-card {
  background: var(--color-dark-2);
  border: 1px solid rgba(201,168,76,0.15);
  border-radius: 12px;
  padding: 28px 24px;
  text-align: center;
  transition: border-color 0.3s, transform 0.3s;
  cursor: pointer;
  height: 100%;
}
.service-card:hover {
  border-color: var(--color-gold);
  transform: translateY(-4px);
}
.service-icon-wrap {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  background: rgba(201,168,76,0.08);
  border: 1px solid rgba(201,168,76,0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}
.service-card:hover .service-icon-wrap {
  background: rgba(201,168,76,0.18);
}
.service-icon {
  width: 34px;
  height: 34px;
  filter: invert(1) sepia(1) saturate(2) hue-rotate(5deg) brightness(0.9);
}
.service-name {
  font-family: var(--font-display);
  font-size: 0.95rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 10px;
  color: var(--color-white);
}
.service-desc {
  font-size: 0.82rem;
  color: var(--color-gray-light);
  line-height: 1.6;
  margin-bottom: 20px;
}
.service-btn { font-size: 0.72rem; padding: 9px 20px; min-height: 44px; }
.addon-card { background: rgba(26,26,26,0.6); }
@media (max-width: 640px) {
  .services-section { padding: 80px 0; }
  .carousel-block { padding: 0 12px; margin-bottom: 40px; }
}
</style>
