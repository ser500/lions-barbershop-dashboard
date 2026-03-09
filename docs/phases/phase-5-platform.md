# Phase 5 — Full Platform Build

**Goal:** Replace Vagaro entirely. Own booking, payments, CRM, membership, and analytics.
**Stack:** Vue 3 + Vite → Supabase (Postgres + Auth + Realtime + Edge Functions) → Stripe

---

## 5.1 — Supabase Foundation

### Schema Migration ✓

- [x] `supabase/migrations/001_initial_schema.sql` — all 14 tables
- [x] `supabase/migrations/002_rls_policies.sql` — full RLS for all 5 roles
- [x] `supabase/migrations/003_user_management.sql` — enriched profiles, auto-create trigger, avatars bucket

**Profiles (source of truth for all roles):** display_name, avatar_url, phone, email, location_id, is_active, updated_at
**Barbers:** display_name + photo_url removed (now on profiles)
**Triggers:** on_auth_user_created, on_auth_user_email_updated, profiles_updated_at
**Storage:** `avatars` bucket — public read, owner-only write, 2MB / jpeg+png+webp+gif

### Supabase Client ✓

- [x] `src/lib/supabase.js` — init with VITE_SUPABASE_URL + VITE_SUPABASE_PUBLISHABLE_KEY
- [x] `@` alias added to vite.config.js

### Auth Integration ✓

- [x] `src/composables/useAuth.js` — signIn, signOut, initAuth, role → route redirect
- [x] Router auth guard — blocks unauthenticated, redirects wrong-role to correct panel
- [x] `src/views/auth/LoginView.vue`
- [x] `main.js` — initAuth() called at app startup

### Replace Mock Stores

- [ ] `src/stores/clients.js` → `supabase.from('clients').select(...)`
- [ ] `src/stores/barber.js` → barber appointments + earnings queries
- [ ] `src/stores/membership.js` → subscriptions table
- [ ] `src/stores/revenue.js` → payments + appointments aggregation
- [ ] `src/stores/liveFeed.js` → Supabase Realtime on `appointments` table
- [ ] `src/stores/location.js` → `supabase.from('locations').select(...)`

### Verification
- `supabase db push` succeeds with zero errors
- All 5 roles can log in and land on the correct panel
- RLS: a client cannot query another client's appointments

---

## 5.2 — Booking System

### Public Booking Wizard

- [ ] `src/views/booking/BookingWizard.vue` — wrapper with step router
- [ ] Step 1: `BookingStep1Service.vue` — service grid, select service
- [ ] Step 2: `BookingStep2Barber.vue` — barber cards filtered by service availability
- [ ] Step 3: `BookingStep3Time.vue` — time slot grid from availability engine
- [ ] Step 4: `BookingStep4Contact.vue` — enter name/email/phone or login
- [ ] Step 5: `BookingStep5Payment.vue` — Stripe Payment Element
- [ ] Step 6: `BookingStep6Confirmation.vue` — confirmation card + add to calendar link

### Availability Engine

- [ ] `src/composables/useAvailability.js`
  - [ ] Query `availability` for barber's weekly blocks
  - [ ] Query `time_off` for date-range blocks
  - [ ] Query `appointments` for existing bookings on that day
  - [ ] Return available 30-min slots for selected date
- [ ] Timezone handling: all times stored as UTC, display in location's local timezone

### Appointment CRUD

- [ ] `create` — on booking confirmation (status = 'pending')
- [ ] `confirm` — after Stripe payment success (status = 'confirmed')
- [ ] `cancel` — client or admin action (status = 'cancelled'), trigger refund if paid
- [ ] `complete` — staff marks done (status = 'completed'), earnings calculated
- [ ] `no_show` — staff marks no-show (status = 'no_show')

### Barber Availability Manager

- [ ] `src/views/app/barber/AvailabilityView.vue` (new route)
  - [ ] Weekly schedule grid — CRUD for `availability`
  - [ ] Time-off picker — CRUD for `time_off`

### Verification
- End-to-end: book appointment → Stripe test payment → appointment appears in admin schedule
- Availability engine: booked slots are hidden; time-off blocks entire day

---

## 5.3 — Stripe Payments

### Online Payments

- [ ] Install `@stripe/stripe-js` and `@stripe/vue-stripe-js`
- [ ] `BookingStep5Payment.vue` — mount Payment Element
- [ ] Create PaymentIntent server-side via Supabase Edge Function `create-payment-intent`
  - Input: appointment_id, amount
  - Output: client_secret
- [ ] On success: update appointment status to 'confirmed', create payments row

### Membership / Stripe Billing

- [ ] Create 3 products + prices in Stripe (Essential $49 / Premium $89 / VIP $149)
- [ ] Store `stripe_price_id` in `membership_plans` table
- [ ] `src/views/app/client/MembershipView.vue` — subscription flow
  - [ ] Subscribe: create Stripe Checkout Session → redirect → webhook confirms
  - [ ] Upgrade/downgrade: `stripe.subscriptions.update`
  - [ ] Cancel: `stripe.subscriptions.cancel`
- [ ] Admin view: real subscriber list from `subscriptions` table

### Stripe Terminal (In-Shop POS)

- [ ] Install `@stripe/terminal-js`
- [ ] `src/views/app/staff/StaffPOSView.vue` (new)
  - [ ] Connect to reader (BBPOS WisePOS E)
  - [ ] Collect payment for walk-in or booked appointment
  - [ ] Create payment record in `payments` table

### Webhook Handler

- [ ] Create `supabase/functions/stripe-webhook/index.ts`
  - [ ] Verify Stripe signature with `STRIPE_WEBHOOK_SECRET`
  - [ ] `checkout.session.completed` → confirm appointment, create payment row
  - [ ] `invoice.payment_failed` → set `subscriptions.status = 'at_risk'`
  - [ ] `invoice.paid` → reset `cuts_used_this_month = 0`, update `billing_date`
  - [ ] `customer.subscription.deleted` → set `subscriptions.status = 'inactive'`
- [ ] Deploy and register webhook endpoint in Stripe dashboard

### Verification
- Test payment in booking wizard → appointment confirmed + payment row created
- Subscribe to Essential plan in test mode → webhook fires → subscription active
- Trigger `invoice.payment_failed` in Stripe → subscriber shows at-risk in admin panel
- Terminal: process test payment in staff POS view

---

## 5.4 — Barber Performance (Live Data)

- [ ] Earnings: query `payments` JOIN `appointments` WHERE `barber_id = auth.uid()` GROUP BY month
- [ ] Cuts: `COUNT(appointments)` WHERE `status = 'completed'` AND `barber_id`
- [ ] Upsell rate: `COUNT(appointments WHERE upsell_service_id IS NOT NULL)` / total completed
- [ ] Reviews: average `reviews.rating` per barber; aggregated in real-time via Supabase view
- [ ] Manual override: admin can edit `appointments.price_paid` and `appointments.service_id`
- [ ] Replace all mock data in `src/stores/barber.js` with real Supabase queries
- [ ] Barber panel views use store — no local mock data

### Verification
- Complete a test appointment → earnings and cuts update in barber panel
- Leave a review → barber's average rating updates
- Admin edits appointment price → earnings recalculate

---

## 5.5 — Attribution + Marketing Analytics

### Session Tracking

- [ ] `ad_sessions` table live (from 5.1 schema)
- [ ] `src/composables/useTracker.js` updated:
  - [ ] On page load: generate or retrieve session_id from localStorage
  - [ ] Capture UTM params from URL
  - [ ] POST session to `ad_sessions` table via Supabase
- [ ] On booking completion: update `appointments.session_id` + `ad_sessions.appointment_id`

### Funnel Analytics

- [ ] `src/views/dashboard/BookingFunnelView.vue` wired to real data:
  - [ ] Visit count: `COUNT(ad_sessions)`
  - [ ] Booking intent: `COUNT(ad_sessions WHERE utm_source IS NOT NULL)` (or custom intent event)
  - [ ] Appointment created: `COUNT(appointments WHERE session_id IS NOT NULL)`
  - [ ] Paid: `COUNT(payments WHERE appointment_id IN (...))`
- [ ] Drop-off % calculated between each funnel step

### Ad Platform Integrations

- [ ] Meta Ads API
  - [ ] OAuth setup, access token storage in Supabase secrets
  - [ ] Fetch campaign spend, CPL, ROAS
  - [ ] Display in Super Admin → Analytics view
- [ ] Google Ads API
  - [ ] OAuth setup, access token storage
  - [ ] Fetch campaign spend + conversions
  - [ ] Display alongside Meta data

### Verification
- Visit site with UTM params → session appears in `ad_sessions`
- Complete booking → `appointment_id` linked to session
- Funnel view shows real step-by-step drop-off

---

## 5.6 — Internal Messaging

### Schema (migration 004 when ready)

- [ ] `conversations` — id, subject, created_at
- [ ] `conversation_participants` — (conversation_id, profile_id, joined_at) composite PK
- [ ] `messages` — id, conversation_id, sender_id (→ profiles), body, created_at, read_at

### UI

- [ ] `src/views/app/shared/MessagesView.vue` — inbox, thread list
- [ ] Thread view — scrollable message history, reply box
- [ ] Unread badge in nav (Supabase Realtime subscription on `messages`)
- [ ] Role-based who can message whom:
  - Barber ↔ Client (appointment context)
  - Staff / Admin ↔ Barber (ops)
  - Admin ↔ Super Admin

### RLS

- [ ] Participants can read messages in conversations they belong to
- [ ] Participants can insert messages into their conversations
- [ ] No cross-conversation reads

### Verification

- Barber sends message to client → client sees it in their portal
- Unread badge appears; clears on open
- Non-participant cannot read thread (RLS blocks it)

---

## 5.7 — QueVex AI Integration

### Widget Integration

- [ ] `src/composables/useQueVexContext.js`
  - [ ] Accepts `role` param
  - [ ] Fetches role-scoped data from Supabase (see data scope table below)
  - [ ] Serializes to concise context string (not raw JSON dumps)
  - [ ] Refreshes on navigation to `/ai` route

**Data scope per role:**

| Role | Data Fetched |
|------|-------------|
| barber | Own appointments (today + next 7 days), earnings MTD, avg ticket, today's clients (name + service + notes), personal review score |
| staff | Today's full schedule (all barbers), queue depth, current wait time, recent check-ins |
| admin | Full location: today's schedule, revenue today/MTD, subscriber count, at-risk members, staff status |
| super_admin | All locations: cross-location revenue, MRR, top/bottom performers, chain-wide KPIs |
| client | Own history (last 5 visits), next appointment, membership status, days since last visit |

- [ ] Replace `QueVexChat.vue` chat UI with QueVex widget mount point
  - [ ] Mount: `QueVex.mount('#quevex-container', { role, context })`
  - [ ] Unmount on component teardown
- [ ] Update all 5 `/ai` views to use new composable + widget

### Cleanup

- [ ] Retire `src/stores/quevex.js` (mock responses no longer needed)
- [ ] Remove old `QueVexChat.vue` custom chat UI (replaced by widget)

### Verification
- Each role's `/ai` route loads widget with correct context
- Widget receives fresh data on each navigation to `/ai`
- No mock responses returned

---

## Verification Milestones (Full Platform)

1. `supabase db push` — all tables + RLS policies created with zero errors
2. Auth — 5 roles log in and land on their correct panel; wrong-role access rejected by RLS
3. Booking — end-to-end: book → Stripe test payment → appointment in admin schedule
4. Membership — subscribe in test mode → webhook fires → subscription active in dashboard
5. Failed payment — trigger `invoice.payment_failed` → subscriber shows at-risk in admin
6. Live feed — complete appointment → ticker updates within 2 seconds (Realtime)
7. Barber panel — earnings, cuts, reviews all show real data from completed appointments
8. Attribution — click UTM URL → book → session appears in funnel view with correct source
9. Terminal — process test payment via Stripe Terminal SDK in staff POS view
10. `npm run build` — zero errors

---

## API Contracts

### Edge Function: `create-payment-intent`
```
POST /functions/v1/create-payment-intent
Body: { appointment_id: string, amount: number }
Response: { client_secret: string }
Auth: Bearer token required
```

### Edge Function: `stripe-webhook`
```
POST /functions/v1/stripe-webhook
Headers: stripe-signature
Body: Stripe event (raw)
Response: { received: true }
Auth: Stripe signature verification only
```

### Edge Function: `create-checkout-session` (membership)
```
POST /functions/v1/create-checkout-session
Body: { plan_id: string }
Response: { url: string }
Auth: Bearer token required
```
