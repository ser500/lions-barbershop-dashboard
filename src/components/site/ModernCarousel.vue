<template>
  <section class="modern-section" id="gallery">
    <div class="section-header reveal">
      <h2 class="carousel-heading">Redefining the Modern Barber Experience.</h2>
    </div>
    <Swiper
      :modules="modules"
      :slides-per-view="1.15"
      :space-between="16"
      :loop="true"
      :autoplay="{ delay: 2800, disableOnInteraction: false }"
      :grab-cursor="true"
      :centered-slides="false"
      :breakpoints="{
        640:  { slidesPerView: 2.1, spaceBetween: 20 },
        1024: { slidesPerView: 3.6, spaceBetween: 24 },
        1440: { slidesPerView: 4.2, spaceBetween: 24 }
      }"
      class="photo-swiper"
    >
      <SwiperSlide v-for="src in slides" :key="src">
        <div class="photo-card">
          <img :src="src" alt="Lion's Lounge" class="photo-img" />
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { useScrollReveal } from '../../composables/useScrollReveal.js'

const modules = [Autoplay]
useScrollReveal()

const slides = [
  '/src/assets/images/gallery/gallery-1.webp',
  '/src/assets/images/gallery/gallery-2.webp',
  '/src/assets/images/gallery/gallery-3.webp',
  '/src/assets/images/gallery/gallery-4.webp',
  '/src/assets/images/gallery/gallery-5.webp',
  '/src/assets/images/gallery/gallery-6.webp',
]
</script>

<style scoped>
.modern-section {
  position: relative;
  z-index: 1;
  margin-top: -160px;
  padding: 60px 0 100px;
  background: transparent;
  overflow: hidden;
}

.section-header {
  text-align: center;
  padding: 0 24px;
  padding-top: 120px;
  margin-bottom: 48px;
}

.carousel-heading {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--color-white);
  letter-spacing: 0.5px;
}

.photo-swiper {
  padding-left: 40px !important;
  padding-right: 40px !important;
}

.photo-card {
  border-radius: 18px;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  cursor: grab;
}
.photo-card:active { cursor: grabbing; }

.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}
.photo-card:hover .photo-img { transform: scale(1.04); }
@media (max-width: 640px) {
  .modern-section { padding: 40px 0 80px; }
  .section-header { padding-top: 100px; margin-bottom: 32px; }
  .carousel-heading { font-size: 0.95rem; padding: 0 16px; }
  .photo-swiper { padding-left: 16px !important; padding-right: 16px !important; }
}
</style>
