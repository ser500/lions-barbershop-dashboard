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

### ✅ Done (continued)
- [x] Membership section background image (membership-banner.webp wired with dark overlay)
- [x] About section real photo (about-bg.webp replacing placeholder visual box)

### ⬜ Remaining
- [ ] Services section card background images
- [ ] Cross-browser QA

---

## Phase 1.5 — Mobile Optimization

### ✅ Done
- [x] NavBar hamburger menu polish (X animation, touch target 44px, HOME link added)
- [x] HeroSection — font scale (clamp 2.2rem–2.6rem on mobile), full-width text block, stacked CTAs
- [x] ModernCarousel — reduced padding on mobile, heading font scaled
- [x] ServiceCarousel — touch targets on book buttons (min-height 44px)
- [x] TeamCarousel — touch targets, section padding reduced
- [x] MembershipSection — single column plan cards, single column benefits grid
- [x] BookingSection — single column booking options, touch targets
- [x] ReviewsSection — single column on ≤640px
- [x] AboutSection — hide visual box on ≤640px
- [x] Footer — stacked layout on ≤500px (footer-bottom column)
- [x] Touch targets: all buttons ≥ 44px
- [x] Viewport meta confirmed

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

## Phase 3.5 — Staff Portal (existing /dashboard/staff)

### ✅ Done
- [x] StaffLayout — sidebar (Daily Ops / Management sections), header with New Appt button
- [x] StaffOverviewView — stats cards, schedule timeline, waiting area, services donut, performance table
- [x] StaffScheduleView, StaffQueueView, StaffClientsView, StaffRevenueView, StaffInventoryView — scaffolded
- [x] 8 staff components: StaffSidebar, StaffHeader, StatsCards, ScheduleTimeline, WaitingArea, ServicesDonut, StaffPerformanceTable, NewApptModal
- [x] `staff.js` store — stats, schedule, waitingArea, servicesBreakdown, staffPerformance

---

## Phase 4 — Multi-Role Business Management Platform ✅ Complete

**Theme:** Innovate. Automate. Elevate.
**Completed:** 2026-03-08
**Full checklist:** [phases/phase-4-rebrand.md](./phases/phase-4-rebrand.md)

### Phase 4.1 — Foundation Stores
- [x] `location.js` — 3 locations (Downtown / East Side / North Campus), activeLocationId
- [x] `membership.js` — Essential $49 / Premium $89 / VIP $149, MRR stats
- [x] `clients.js` — CRM profiles, visit history, preferences, notes
- [x] `revenue.js` — daily/weekly/monthly financials by barber + service
- [x] `barber.js` — individual barber earnings, schedule, clients, ratings
- [x] `liveFeed.js` — seeded real-time ops events for ticker
- [x] `quevex.js` — AI chat state, role context, mock responses

### Phase 4.2 — Router + Gateway
- [x] `/app` → RoleGateway.vue (5 role cards, tagline "Innovate. Automate. Elevate.")
- [x] `/app/super-admin/*` → 8 routes
- [x] `/app/admin/*` → 8 routes
- [x] `/app/staff/*` → 7 routes (refactored from /dashboard/staff)
- [x] `/app/barber/*` → 6 routes
- [x] `/app/client/*` → 6 routes

### Phase 4.3 — Shared Components
- [x] `LiveFeedTicker.vue` — animated ops ticker (all topbars)
- [x] `AIInsightsStrip.vue` — gold-border collapsible insight (all overviews)
- [x] `ClientIntelCard.vue` — tier badge, last visit, notes, QueVex upsell
- [x] `RevenueForecastWidget.vue` — progress bar vs last month
- [x] `QueVexChat.vue` — chat UI, prompt chips, mock responses
- [x] `LocationRivalryBoard.vue` — gamified leaderboard with trophies

### Phase 4.4–4.10 — All Panel Views (39 total)
- [x] Super Admin: 8 views (overview / locations / analytics / revenue / membership / staff / settings / ai)
- [x] Admin: 8 views (overview / schedule / team / clients / revenue / membership / inventory / ai)
- [x] Staff: 7 views — fill all placeholders (overview / schedule / queue / clients / revenue / inventory / ai)
- [x] Barber: 6 views (overview / schedule / clients / earnings / reviews / ai)
- [x] Client: 6 views (dashboard / appointments / history / membership / preferences / ai)

### Phase 4.x — Visual Design System Pass
- [x] App design system applied to all 39 views and shared components
- [x] Design tokens: `--app-*`, `.app-card`, `.app-stat`, `.app-badge`, `.app-btn`, `.app-enter` animations
- [x] Contrast audit: boosted `--app-text-dim` to 72%, `--app-text-muted` to 50%, `--app-border` to `#253050`
- [x] Global `.app-input`, `.app-select`, `.app-textarea` form element classes
- [x] Custom dropdown arrow SVG on all select elements with option contrast
- [x] Nav section labels, stat labels, table headers all upgraded from 30% to 72% opacity

---

## Phase 5 — Full Platform Build (Supabase + Stripe + Real Data)

**Goal:** Replace Vagaro entirely. Own booking, payments, CRM, membership, and analytics.
**Started:** TBD
**Full checklist:** [phases/phase-5-platform.md](./phases/phase-5-platform.md)

### 5.1 — Supabase Foundation
- [ ] Schema migration (all tables)
- [ ] RLS policies (all tables, all roles)
- [ ] Supabase client init (`src/lib/supabase.js`)
- [ ] Auth integration — login/logout, role detection, panel redirect
- [ ] Replace all Pinia mock stores with real Supabase queries
- [ ] Supabase Realtime → liveFeed store (live ticker, queue updates)

### 5.2 — Booking System
- [ ] Public booking wizard (service → barber → time → payment)
- [ ] Availability engine (blocks from availability + time_off + existing appointments)
- [ ] Barber availability manager (CRUD for availability + time_off)
- [ ] Appointment CRUD (create, confirm, cancel, complete, no-show)
- [ ] Client account creation at booking (Supabase auth)

### 5.3 — Stripe Payments
- [ ] Online payment via Stripe Payment Element in booking wizard
- [ ] Stripe Billing — membership plans (Essential/Premium/VIP)
- [ ] Subscription management (upgrade, downgrade, cancel)
- [ ] Stripe Terminal — in-shop POS from Staff panel
- [ ] Supabase Edge Function: stripe-webhook handler (4 events)
- [ ] Admin: real subscriber list, at-risk alerts from webhook data

### 5.4 — Barber Performance (Live Data)
- [ ] Earnings auto-calculated from payments table
- [ ] Cuts tracked per barber from completed appointments
- [ ] Upsell tracking (upsell_service_id on appointments)
- [ ] Reviews linked to appointments, rating aggregated per barber
- [ ] Manual override — admin can edit appointment price/service
- [ ] Barber panel: all mock data replaced with real queries

### 5.5 — Attribution + Marketing Analytics
- [ ] ad_sessions table captures UTM params at site visit
- [ ] useTracker.js: persist session_id, POST to Supabase
- [ ] Booking completion: link appointment to ad_session
- [ ] BookingFunnelView: real funnel metrics (visit → intent → booked → paid)
- [ ] Meta Ads API integration (campaign spend, CPL, ROAS)
- [ ] Google Ads API integration

### 5.6 — QueVex AI Integration
- [ ] Replace QueVexChat.vue mock responses with QueVex widget
- [ ] useQueVexContext.js composable (role-scoped data fetcher)
- [ ] Widget mounted in all 5 /ai views with correct context
- [ ] Retire quevex.js mock store

---

## Known Issues / Tech Debt

| Issue | Priority | Status |
|---|---|---|
| Hero text `white-space: nowrap` may overflow at <768px | High | open |
| ApexCharts bundle ~517KB gzipped — consider dynamic import | Medium | open |
| `/api/events` fetch fails silently (no backend yet) — events re-queued in store | Low | expected |
| `bg-10.webp` is only 4KB — likely wrong image fetched | Low | open |
| Phase 5 Supabase + Stripe not yet started | High | planned |
