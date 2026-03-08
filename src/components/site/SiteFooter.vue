<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <img src="/src/assets/images/logo/logo-white.webp" alt="Lion's Lounge" class="footer-logo-img" />
        <p>Orlando's premier barbershop. Est. May 2024.</p>
        <div class="footer-socials">
          <a href="https://instagram.com/lionsloungebarbershop" target="_blank">📸</a>
          <a href="https://facebook.com/lionsloungebarbershop" target="_blank">👍</a>
          <a href="https://wa.me/14075551234" target="_blank">💬</a>
        </div>
      </div>
      <div class="footer-links">
        <h5>QUICK LINKS</h5>
        <a href="#services">Services</a>
        <a href="#memberships">Memberships</a>
        <a href="#team">Team</a>
        <a href="#booking">Book Now</a>
      </div>
      <div class="footer-links">
        <h5>MEMBERSHIPS</h5>
        <a href="#memberships">BLACK Plan</a>
        <a href="#memberships">GOLD Plan</a>
        <a href="#memberships">ESSENTIAL Plan</a>
      </div>
      <div class="footer-contact">
        <h5>CONTACT</h5>
        <p>📍 Orlando, FL</p>
        <p>📞 (407) 555-1234</p>
        <p>💬 WhatsApp Available</p>
        <a href="https://vagaro.com/lionsloungebarbershop" target="_blank" class="btn-gold footer-btn">Book Now</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© {{ new Date().getFullYear() }} Lion's Lounge Barbershop. All rights reserved.</p>
      <a href="/dashboard" class="dashboard-link">Staff Dashboard →</a>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.site-footer {
  background: var(--color-dark-2);
  border-top: 1px solid rgba(201,168,76,0.2);
  padding: 60px 24px 24px;
}
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 40px;
  margin-bottom: 40px;
}
.footer-logo-img {
  height: 32px;
  width: auto;
  object-fit: contain;
  margin-bottom: 12px;
}
.footer-logo {
  display: block;
  font-family: var(--font-display);
  font-size: 1.1rem;
  letter-spacing: 3px;
  color: var(--color-gold);
  margin-bottom: 12px;
}
.footer-brand p { font-size: 0.85rem; color: var(--color-gray-light); margin-bottom: 16px; }
.footer-socials { display: flex; gap: 12px; font-size: 1.3rem; }
.footer-links h5, .footer-contact h5 {
  font-family: var(--font-display);
  font-size: 0.75rem;
  letter-spacing: 3px;
  color: var(--color-gold);
  margin-bottom: 16px;
  text-transform: uppercase;
}
.footer-links { display: flex; flex-direction: column; gap: 10px; }
.footer-links a { font-size: 0.85rem; color: var(--color-gray-light); transition: color 0.3s; }
.footer-links a:hover { color: var(--color-gold); }
.footer-contact p { font-size: 0.85rem; color: var(--color-gray-light); margin-bottom: 8px; }
.footer-btn { font-size: 0.75rem; padding: 10px 20px; margin-top: 12px; }
.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.06);
  font-size: 0.78rem;
  color: var(--color-gray);
}
.dashboard-link { color: var(--color-gold); transition: opacity 0.3s; }
.dashboard-link:hover { opacity: 0.7; }
@media (max-width: 900px) { .footer-inner { grid-template-columns: 1fr 1fr; } }
@media (max-width: 500px) {
  .footer-inner { grid-template-columns: 1fr; }
  .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
}
</style>
