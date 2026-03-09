<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-inner">
      <a href="/" class="nav-logo">
        <img src="/images/logo/logo-white.webp" alt="Lion's Lounge Barbershop" class="logo-img" />
      </a>
      <ul class="nav-links">
        <li><a href="#home">HOME</a></li>
        <li class="nav-sep">|</li>
        <li><a href="#services" @click="track('Services', '#services', 'nav')">SERVICES</a></li>
        <li class="nav-sep">|</li>
        <li><a href="#memberships" @click="track('Memberships', '#memberships', 'nav')">MEMBERSHIPS</a></li>
        <li class="nav-sep">|</li>
        <li><a href="#gallery" @click="track('Gallery', '#gallery', 'nav')">GALLERY</a></li>
        <li class="nav-sep">|</li>
        <li><a href="#team" @click="track('Team', '#team', 'nav')">TEAM</a></li>
        <li class="nav-sep">|</li>
        <li><a href="#about" @click="track('About', '#about', 'nav')">ABOUT</a></li>
        <li class="nav-sep">|</li>
        <li><a href="#reviews" @click="track('Reviews', '#reviews', 'nav')">REVIEWS</a></li>
        <li class="nav-sep">|</li>
        <li><a href="#booking" @click="track('Booking', '#booking', 'nav')">BOOKING</a></li>
        <li class="nav-sep">|</li>
        <li><a href="#faq" @click="track('FAQ', '#faq', 'nav')">FAQ</a></li>
      </ul>
      <a href="/login" class="nav-login">LOGIN</a>
      <a href="/login" class="nav-login-mobile">LOGIN</a>
      <button class="hamburger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen" aria-label="Menu">
        <span /><span /><span />
      </button>
    </div>
    <div class="mobile-menu" :class="{ open: menuOpen }">
      <a href="#home" @click="menuOpen = false">HOME</a>
      <a href="#services" @click="menuOpen = false">SERVICES</a>
      <a href="#memberships" @click="menuOpen = false">MEMBERSHIPS</a>
      <a href="#gallery" @click="menuOpen = false">GALLERY</a>
      <a href="#team" @click="menuOpen = false">TEAM</a>
      <a href="#about" @click="menuOpen = false">ABOUT</a>
      <a href="#reviews" @click="menuOpen = false">REVIEWS</a>
      <a href="#booking" @click="menuOpen = false">BOOKING</a>
      <a href="#faq" @click="menuOpen = false">FAQ</a>
      <a href="https://vagaro.com/lionsloungebarbershop" target="_blank" class="btn-gold mobile-book"
        @click="trackIntent('Book Now - Mobile Nav', 'https://vagaro.com/lionsloungebarbershop')">
        BOOK NOW
      </a>
      <a href="/login" class="mobile-login">LOGIN</a>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTracker } from '../../composables/useTracker.js'

const { trackClick, trackBookingIntent } = useTracker()
const isScrolled = ref(false)
const menuOpen = ref(false)

function track(label, href, section) { trackClick(label, href, section) }
function trackIntent(label, url) { trackBookingIntent(label, url) }

function onScroll() { isScrolled.value = window.scrollY > 60 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 20px 0;
  transition: background 0.3s ease, padding 0.3s ease;
}
.navbar.scrolled {
  background: rgba(10,10,10,0.97);
  backdrop-filter: blur(10px);
  padding: 12px 0;
  border-bottom: 1px solid rgba(201,168,76,0.2);
}
.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 40px;
}
.nav-logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.logo-img {
  height: 36px;
  width: auto;
  object-fit: contain;
  transition: opacity 0.3s;
}
.logo-img:hover { opacity: 0.85; }
.nav-links {
  display: flex;
  list-style: none;
  align-items: center;
  gap: 20px;
  flex: 1;
  justify-content: center;
}
.nav-links a {
  font-family: var(--font-display);
  font-size: 0.68rem;
  letter-spacing: 1.5px;
  color: var(--color-white);
  transition: color 0.3s;
}
.nav-links a:hover { color: var(--color-gold); }
.nav-sep {
  color: rgba(255,255,255,0.35);
  font-size: 0.75rem;
  user-select: none;
}
.nav-login {
  flex-shrink: 0;
  padding: 0.45rem 1.1rem;
  background: #c9a84c;
  color: #ffffff;
  border-radius: 6px;
  font-family: var(--font-display);
  font-size: 0.68rem;
  letter-spacing: 1.5px;
  font-weight: 600;
  transition: background 0.2s, transform 0.1s;
  white-space: nowrap;
}
.nav-login:hover {
  background: #dbb95a;
  color: #ffffff;
}
.nav-login:active { transform: scale(0.97); }
.nav-login-mobile {
  display: none;
}
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  margin-left: auto;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}
.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-white);
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: center;
}
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
.mobile-menu {
  display: none;
  flex-direction: column;
  gap: 16px;
  padding: 20px 24px;
  background: var(--color-dark);
  border-top: 1px solid rgba(201,168,76,0.2);
}
.mobile-menu.open { display: flex; }
.mobile-menu a {
  font-family: var(--font-display);
  font-size: 0.9rem;
  letter-spacing: 2px;
  color: var(--color-white);
  min-height: 44px;
  display: flex;
  align-items: center;
}
.mobile-book {
  justify-content: center;
  text-align: center;
  min-height: 48px;
  border-radius: 6px;
  font-size: 0.78rem;
}
.mobile-login {
  justify-content: center;
  text-align: center;
  min-height: 48px;
  border-radius: 6px;
  font-size: 0.78rem;
  background: #c9a84c;
  color: #ffffff !important;
  font-weight: 600;
  letter-spacing: 1.5px;
}
.mobile-login:hover { background: #dbb95a; color: #ffffff !important; }
@media (max-width: 768px) {
  .nav-links { display: none; }
  .nav-login { display: none; }
  .nav-login-mobile {
    display: flex;
    align-items: center;
    margin-left: auto;
    padding: 0.4rem 0.9rem;
    background: #c9a84c;
    color: #ffffff;
    border-radius: 6px;
    font-family: var(--font-display);
    font-size: 0.65rem;
    letter-spacing: 1.5px;
    font-weight: 600;
    white-space: nowrap;
  }
  .hamburger { display: flex; }
}
</style>
