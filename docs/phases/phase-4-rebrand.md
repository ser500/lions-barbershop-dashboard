# Phase 4 Checklist — Multi-Role Business Management Platform

**Theme:** Innovate. Automate. Elevate.
**Scope:** Transform analytics-only dashboard into a full multi-role platform with 5 panels, multi-location support, subscription memberships, and QueVex AI integration.

---

## Phase 4.1 — Foundation Stores

- [ ] `src/stores/location.js` — locations list (Downtown / East Side / North Campus), activeLocationId, switcher
- [ ] `src/stores/membership.js` — Essential $49 / Premium $89 / VIP $149, subscribers, MRR stats
- [ ] `src/stores/clients.js` — CRM profiles, visit history, preferences, barber notes
- [ ] `src/stores/revenue.js` — daily/weekly/monthly financials, by barber + service
- [ ] `src/stores/barber.js` — individual barber earnings, my schedule, my clients, ratings
- [ ] `src/stores/liveFeed.js` — seeded real-time ops events, ticker animation state
- [ ] `src/stores/quevex.js` — AI chat state, role-context messages, mock responses

---

## Phase 4.2 — Router

- [ ] `/app` → RoleGateway.vue
- [ ] `/app/super-admin/*` → 8 child routes (overview, locations, analytics, revenue, membership, staff, settings, ai)
- [ ] `/app/admin/*` → 8 child routes (overview, schedule, team, clients, revenue, membership, inventory, ai)
- [ ] `/app/staff/*` → 7 child routes (overview, schedule, queue, clients, revenue, inventory, ai)
- [ ] `/app/barber/*` → 6 child routes (overview, schedule, clients, earnings, reviews, ai)
- [ ] `/app/client/*` → 6 child routes (dashboard, appointments, history, membership, preferences, ai)
- [ ] `/dashboard/*` remains as Site Analytics

---

## Phase 4.3 — Role Gateway

- [ ] `src/views/app/RoleGateway.vue` — full-screen dark, centered logo + tagline, 5 role cards in cross layout
- [ ] Gold hover border on role cards
- [ ] "← Back to Site" footer link

---

## Phase 4.4 — Shared Components

- [ ] `src/components/app/LiveFeedTicker.vue` — animated news ticker, gold dot events
- [ ] `src/components/app/AIInsightsStrip.vue` — gold left-border, collapsible, role-specific insight text
- [ ] `src/components/app/ClientIntelCard.vue` — tier badge, last visit, notes, QueVex upsell suggestion
- [ ] `src/components/app/RevenueForecastWidget.vue` — progress bar, vs last month, color-coded status
- [ ] `src/components/app/QueVexChat.vue` — chat bubbles, suggested prompt chips, mock AI responses
- [ ] `src/components/app/LocationRivalryBoard.vue` — gamified leaderboard with trophy icons + momentum callout

---

## Phase 4.5 — Panel Layouts (5)

- [ ] `src/views/app/SuperAdminLayout.vue` — 240px sidebar, topbar + live feed, 8-item nav (Chain / Business / Control sections)
- [ ] `src/views/app/AdminLayout.vue` — same pattern, location selector, 8-item nav (My Location / Clients & Revenue / Operations)
- [ ] `src/views/app/StaffLayout.vue` — refined existing, moved to /app/staff, live feed added
- [ ] `src/views/app/BarberLayout.vue` — personal scope, 6-item nav (Overview / Schedule / Clients / Earnings / Reviews / AI)
- [ ] `src/views/app/ClientLayout.vue` — client scope, 6-item nav (Dashboard / Appointments / History / Membership / Preferences / AI)

---

## Phase 4.6 — Super Admin Views (8)

- [ ] `OverviewView.vue` — 6 KPIs, revenue by location grouped bar chart, rivalry board, top barbers table, AI Insights strip, Revenue Forecast
- [ ] `LocationsView.vue` — location cards grid, comparison metrics table, utilization heatmap, Add Location modal
- [ ] `AnalyticsView.vue` — 12-month revenue trend (per location lines), acquisition vs retention stacked bar, peak hours heatmap, top 5 services
- [ ] `RevenueView.vue` — P&L summary (Service / Retail / MRR / Labor / Net), monthly table by location, top services chart
- [ ] `MembershipView.vue` — MRR area trend, plan donut (Essential/Premium/VIP), subscribers by location, churn + upgrade stats, top 10 subscribers
- [ ] `StaffView.vue` — all barbers table (cross-location), top performers spotlight (5 cards), comparison bar chart
- [ ] `SettingsView.vue` — location management cards, plan editor, role assignment
- [ ] `AIView.vue` — QueVex AI chat (Super Admin context: all locations + all revenue)

---

## Phase 4.7 — Admin Views (8)

- [ ] `OverviewView.vue` — 5 KPIs, Revenue Forecast, today's full schedule (ScheduleTimeline), staff status grid, AI Insights, low stock alert
- [ ] `ScheduleView.vue` — week grid (barbers as columns, hours as rows), color by service, Auto Scheduler "Generate" button
- [ ] `TeamView.vue` — barber cards, 4-week performance chart, shift management form
- [ ] `ClientsView.vue` — client list (plan badge / last visit / spend), search + filter, profile modal with ClientIntelCard, "Inactive 60+ days" tab
- [ ] `RevenueView.vue` — Today/Week/Month/Year KPIs, 30-day daily bar, service breakdown, barber revenue split pie
- [ ] `MembershipView.vue` — subscriber table, at-risk alerts, activity feed (new/upgrades/cancellations)
- [ ] `InventoryView.vue` — products table, low stock highlighted red, sales velocity, Request Reorder
- [ ] `AIView.vue` — QueVex AI chat (Admin context: single location + client data)

---

## Phase 4.8 — Staff Views (7 — fill all placeholders)

- [ ] `StaffOverviewView.vue` — existing + ClientIntelCard on schedule, live feed in topbar
- [ ] `StaffScheduleView.vue` — all-barber day timeline, filter by barber, NewApptModal, status actions
- [ ] `StaffQueueView.vue` — walk-in manager full page, add form, estimated wait calculator, plan badge, mock SMS notify
- [ ] `StaffClientsView.vue` — prominent search, recent check-ins, client card with plan badge + notes, quick check-in
- [ ] `StaffRevenueView.vue` — daily transactions, running total, revenue goal progress bar, payment method breakdown
- [ ] `StaffInventoryView.vue` — low stock list, "Request restock" alert for admin
- [ ] `StaffAIView.vue` — QueVex AI chat (Staff context: schedule + queue + today's activity)

---

## Phase 4.9 — Barber Views (6)

- [ ] `OverviewView.vue` — greeting, today's appointments (my slots), next client intel card, KPIs (appts/revenue/tips/avg ticket), week vs last week
- [ ] `ScheduleView.vue` — week calendar (my slots only), appointment detail modal, mark complete / no-show
- [ ] `ClientsView.vue` — my regulars list, client detail modal, add/edit post-visit notes
- [ ] `EarningsView.vue` — MTD earnings, avg ticket, tip rate, 30-day area chart, services donut, vs shop average
- [ ] `ReviewsView.vue` — avg star rating, recent reviews list, rating trend line chart
- [ ] `AIView.vue` — QueVex AI chat (Barber context: my clients + my appointments)

---

## Phase 4.10 — Client Views (6)

- [ ] `DashboardView.vue` — welcome card (name + plan badge + cuts remaining), next appt card, smart rebooking nudge, quick rebook CTA, recent activity feed
- [ ] `AppointmentsView.vue` — upcoming list (cancel/reschedule), book new wizard (location → service → barber → time), past/cancelled history
- [ ] `HistoryView.vue` — visit timeline cards (date/barber/service/amount/rating), summary stats
- [ ] `MembershipView.vue` — plan card (Essential/Premium/VIP), cuts used progress bar (Essential), perks breakdown, Upgrade CTA, "Refer a friend"
- [ ] `PreferencesView.vue` — contact info, preferred barber + service, style notes, mock photo upload, notification toggles
- [ ] `AIView.vue` — QueVex AI chat (Client context: own history + membership)

---

## Phase 4.11 — Polish Pass

- [ ] Live feed ticker confirmed in all 5 panel topbars
- [ ] AI Insights strip on all overview pages
- [ ] Revenue Forecast on Super Admin + Admin overview
- [ ] ClientIntelCard on Staff, Barber, and Admin schedule views
- [ ] Location rivalry board on Super Admin overview
- [ ] `npm run dev` — zero console errors across all 37 routes

---

## Verification Checklist

- [ ] `/app` → Role Gateway renders 5 cards, each routes correctly
- [ ] Live operations feed ticker visible in every panel topbar
- [ ] Super Admin `/app/super-admin/locations` → rivalry board + location comparison table
- [ ] Admin `/app/admin/clients` → CRM with plan badges, search, profile modal with intel card
- [ ] Admin `/app/admin/schedule` → "Generate Schedule" button populates the week grid
- [ ] Staff placeholders → all 5 fully implemented, no "Coming Soon"
- [ ] Barber `/app/barber/overview` → client intelligence card for next appointment
- [ ] Client `/app/client/membership` → plan card, cuts remaining, upgrade CTA
- [ ] Every panel's `/ai` route → QueVex AI chat with role-specific prompt suggestions
- [ ] `npm run dev` — zero console errors across all routes
