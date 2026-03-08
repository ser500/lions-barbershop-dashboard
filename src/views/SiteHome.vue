<template>
  <div class="site-home">
    <NavBar />
    <HeroSection />
    <ModernCarousel />
    <ServiceCarousel />
    <AboutSection />
    <MembershipSection />
    <ReviewsSection />
    <TeamCarousel />
    <BookingSection />
    <FaqAccordion />
    <SiteFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import NavBar from '../components/site/NavBar.vue'
import HeroSection from '../components/site/HeroSection.vue'
import ModernCarousel from '../components/site/ModernCarousel.vue'
import ServiceCarousel from '../components/site/ServiceCarousel.vue'
import AboutSection from '../components/site/AboutSection.vue'
import MembershipSection from '../components/site/MembershipSection.vue'
import ReviewsSection from '../components/site/ReviewsSection.vue'
import TeamCarousel from '../components/site/TeamCarousel.vue'
import BookingSection from '../components/site/BookingSection.vue'
import FaqAccordion from '../components/site/FaqAccordion.vue'
import SiteFooter from '../components/site/SiteFooter.vue'
import { useTracker } from '../composables/useTracker.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const { init } = useTracker()
useScrollReveal()

onMounted(() => {
  init()
})
</script>

<style scoped>
.site-home { background: var(--color-black); }
</style>
