# Changelog

All notable changes to this project are documented here.
Format: `[version] — YYYY-MM-DD — description`

---

## [Unreleased] — Phase 5 — Full Platform Build

### Planned
- Supabase backend (schema, auth, RLS, realtime)
- Stripe payments (online + Billing subscriptions + Terminal POS)
- Public booking wizard replacing Vagaro
- Live barber performance data (replaces Google Sheets manual process)
- Marketing attribution (UTM → Supabase → confirmed appointment)
- QueVex AI widget integration (replaces mock responses)
- Meta Ads + Google Ads API integration for ROAS reporting

---

## [0.4.0] — 2026-03-08

### Phase 4 — Multi-Role Business Management Platform

#### Added
- Role Gateway (`/app`) — full-screen entry point with 5 branded role cards and tagline "Innovate. Automate. Elevate."
- SuperAdminLayout, AdminLayout, BarberLayout, ClientLayout — 4 new panel layouts with fixed 240px sidebar, topbar, and live feed ticker
- StaffLayout refactored to `/app/staff` with live feed ticker added
- 7 new Pinia stores: `location`, `membership`, `clients`, `revenue`, `barber`, `liveFeed`, `quevex`
- 6 shared components: `LiveFeedTicker`, `AIInsightsStrip`, `ClientIntelCard`, `RevenueForecastWidget`, `QueVexChat`, `LocationRivalryBoard`
- Super Admin panel: 8 views (overview, locations, analytics, revenue, membership, staff, settings, ai)
- Admin panel: 8 views (overview, schedule, team, clients, revenue, membership, inventory, ai)
- Staff panel: all 5 placeholder views implemented + AI view
- Barber panel: 6 views (overview, schedule, clients, earnings, reviews, ai)
- Client portal: 6 views (dashboard, appointments, history, membership, preferences, ai)
- QueVex AI chat page on every panel with role-specific prompt context
- Multi-location support with location selector in sidebar (non-client panels)
- Subscription membership system: Essential $49 / Premium $89 / VIP $149
- Client Intelligence Cards on all appointment views (tier badge, last visit, notes, upsell)
- Location Rivalry Board on Super Admin overview
- Revenue Forecast widget on Super Admin + Admin overview
- AI Insights strip on all overview pages (role-specific insight text)
- Smart rebooking nudge on Client dashboard ("Based on your 4-week pattern...")
- Auto Staff Scheduler "Generate Schedule" button on Admin → Schedule view

#### Changed
- `/dashboard/staff` routes → replaced by `/app/staff` (layout refactored, routes updated)
- Router updated to add all `/app/*` nested routes
- `docs/progress.md` — Phase 4 section added
- `docs/phases/` — `phase-4-rebrand.md` checklist created

#### Visual Redesign Pass (Phase 4.x)
- Applied app design system to all 39 views and shared components
- Design tokens: `--app-*`, `.app-card`, `.app-stat`, `.app-badge`, `.app-btn`, `.app-enter` animations
- Contrast audit: boosted `--app-text-dim` to 72%, `--app-text-muted` to 50%, `--app-border` to `#253050` for visible input/select outlines
- Global `.app-input`, `.app-select`, `.app-textarea` form element classes
- Custom dropdown arrow SVG on all select elements with option contrast
- Nav section labels, stat labels, table headers all upgraded from 30% to 72% opacity

---

## [0.3.0] — 2026-03-08

### Phase 3.5 — Staff Portal

#### Added
- StaffLayout — sidebar with Daily Ops + Management sections, topbar with New Appt button
- StaffOverviewView — stats cards, schedule timeline, waiting area, services donut, performance table
- StaffScheduleView, StaffQueueView, StaffClientsView, StaffRevenueView, StaffInventoryView — scaffolded
- 8 staff components: StaffSidebar, StaffHeader, StatsCards, ScheduleTimeline, WaitingArea, ServicesDonut, StaffPerformanceTable, NewApptModal
- `staff.js` Pinia store — stats, schedule, waitingArea, servicesBreakdown, staffPerformance
- `theme.js` Pinia store — 8 color themes + 10 font pairs with live injection
- SampleView — theme + font sampler

---

## [0.2.0] — 2026-03-07

### Phase 3 — Dashboard Analytics UI

#### Added
- DashboardLayout — fixed sidebar nav (6 views), topbar with live badge + back-to-site link
- OverviewView — 4 metric tiles, 30-day sessions area chart, traffic source donut, CTA bar list, live activity feed
- TrafficView — source bars, device radial gauge, referrers table
- BehaviorView — section engagement horizontal bar, scroll depth funnel, heatmap grid
- BookingFunnelView — 5-step funnel with drop-off %, plan choice pie, avg time-to-CTA
- ServicesView — core services + add-on horizontal bar charts
- TeamView — barber views bar, booking clicks pie, performance table
- MetricCard shared component
- `dashboard.js` Pinia store with full seeded mock data (overview/traffic/behavior/funnel/services/team)

---

## [0.1.0] — 2026-03-06

### Phase 1 — Vue Website Clone + Phase 1.5 Mobile Optimization + Phase 2 Analytics Tracking

#### Added
- Project scaffold: Vite + Vue 3 + Pinia + Vue Router + Swiper + GSAP + ApexCharts + dayjs
- Global design tokens — CSS custom properties: `--color-black`, `--color-gold`, `--font-display`, etc.
- Router: `/` → SiteHome, `/dashboard/*` → nested dashboard views
- `analytics.js` Pinia store — session ID, UTM capture, GTM dataLayer bridge, 30s event flush
- `useTracker.js` composable — page_view, cta_click, booking_intent, scroll_depth, session_end
- `useScrollReveal.js` composable — IntersectionObserver with `.reveal` / `.is-visible` pattern
- NavBar — sticky, scroll-shrink, pipe-separated links, real logo, mobile hamburger (44px touch targets)
- HeroSection — GSAP stagger entrance, full-viewport, text bottom-left, hero-bg.webp, two CTAs
- ModernCarousel — 6 portrait gallery photos (3/4 ratio), overlaps hero with negative margin
- ServiceCarousel — dual Swiper (7 core + 8 add-ons), real SVG icons, real Vagaro booking links
- AboutSection — story copy, badge row, about-bg.webp real photo
- MembershipSection — BLACK/GOLD/ESSENTIAL tiers with real pricing, membership-banner.webp bg
- ReviewsSection — real reviewer names, real verbatim testimonials, real avatar photos, Google badge
- TeamCarousel — 6 real headshots in circular frames, real bios, per-barber Vagaro booking links
- BookingSection — Vagaro / WhatsApp / Phone / Walk-in, real address (340 Moore Rd, Ocoee), real hours, socials
- FaqAccordion — 7 real questions, accordion animation, `faq_open` analytics tracking
- SiteFooter — real logo, 4-column grid, social links, Staff Dashboard link
- 46 image assets (gallery, team, reviews, backgrounds, services, logo)
- Full mobile optimization (all sections responsive, ≥44px touch targets, Viewport meta)
