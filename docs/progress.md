# Lions Barbershop Dashboard — Progress

Last updated: 2026-03-08

---

## Phase 1 — Vue Website Clone

### ✅ Done
- [x] Project scaffold (Vite + Vue 3 + Pinia + Vue Router + Swiper + GSAP + ApexCharts + dayjs)
- [x] Global design tokens (CSS vars: colors, fonts, spacing)
- [x] Router: `/` → SiteHome, `/dashboard/*` → nested dashboard views
- [x] Pinia stores: `analytics.js`, `dashboard.js` (with full mock data)
- [x] Composables: `useTracker.js`, `useScrollReveal.js`
- [x] NavBar — sticky, scroll-shrink, pipe-separated links, real logo image
- [x] HeroSection — GSAP entrance, full-viewport, text bottom-left, real bg photo, matching CTAs
- [x] ModernCarousel — pure photo cards (no text), portrait 3/4 ratio, bleeds into hero
- [x] ServiceCarousel — dual Swiper (7 core + 8 add-ons), real SVG icons, real Vagaro links
- [x] AboutSection — story copy, badges
- [x] MembershipSection + PlanCard — BLACK/GOLD/ESSENTIAL tiers with real pricing
- [x] ReviewsSection — real reviewer names, real testimonial text, real avatars
- [x] TeamCarousel — real headshots, real bios
- [x] BookingSection — Vagaro, WhatsApp, phone, walk-in, real address, hours, socials
- [x] FaqAccordion — 7 real questions with analytics tracking
- [x] SiteFooter — real logo, social links, staff dashboard link
- [x] All 46 image assets downloaded and wired (gallery, team, reviews, backgrounds, services, logo)

### 🔧 In Progress
- [ ] Pixel-perfect hero alignment (source comparison ongoing)
- [ ] Services section card background images
- [ ] Membership section background image
- [ ] About section real photo

### ⬜ Remaining
- [ ] Mobile optimization (Phase 1.5)
- [ ] Cross-browser QA

---

## Phase 1.5 — Mobile Optimization

### ⬜ To Do
- [ ] NavBar hamburger menu polish
- [ ] HeroSection — font scale, text block full-width on mobile
- [ ] ModernCarousel — 1.1 slides-per-view, reduced padding
- [ ] ServiceCarousel — 1.2 slides
- [ ] TeamCarousel — 1.2 slides
- [ ] MembershipSection — single column plan cards
- [ ] BookingSection — single column booking options
- [ ] HoursSection — single column
- [ ] ReviewsSection — single column
- [ ] AboutSection — hide visual box
- [ ] Footer — stacked layout
- [ ] Touch targets: all buttons ≥ 44px
- [ ] Viewport meta confirmed

---

## Phase 2 — Analytics Tracking Layer

### ✅ Done
- [x] `useTracker.js` — page_view, cta_click, booking_intent, scroll_depth, session_end
- [x] `analytics.js` Pinia store — session ID (sessionStorage UUID), UTM capture, GTM dataLayer bridge
- [x] Flush to `/api/events` every 30s + on session end
- [x] FAQ accordion tracks `faq_open` event

### ⬜ Remaining
- [ ] Backend `/api/events` endpoint (or Supabase edge function)
- [ ] Service card view tracking (IntersectionObserver per card)
- [ ] Plan card view tracking
- [ ] Barber view tracking from team carousel slide change

---

## Phase 3 — Dashboard Analytics UI

### ✅ Done
- [x] DashboardLayout — sidebar nav, topbar, live badge, back-to-site link
- [x] OverviewView — metric tiles, sessions area chart, traffic donut, CTA bar list, live feed
- [x] TrafficView — source bars, device radial, referrers table
- [x] BehaviorView — section engagement bar, scroll depth funnel, heatmap grid
- [x] BookingFunnelView — step funnel with drop-off %, plan pie, avg time-to-CTA
- [x] ServicesView — horizontal bars (core + add-ons)
- [x] TeamView — barber views bar, booking clicks pie, performance table
- [x] MetricCard component
- [x] All views wired to mock data in `dashboard.js` store

### ⬜ Remaining
- [ ] Wire to real `/api/analytics` backend
- [ ] Date range picker
- [ ] Auto-refresh on overview (10s live feed)
- [ ] Export CSV per view

---

## Known Issues / Tech Debt

| Issue | Priority | Status |
|---|---|---|
| Hero text `white-space: nowrap` may overflow at <768px | High | open |
| ApexCharts bundle ~517KB gzipped — consider dynamic import | Medium | open |
| `/api/events` fetch fails silently (no backend yet) — events re-queued in store | Low | expected |
| `bg-10.webp` is only 4KB — likely wrong image fetched | Low | open |
