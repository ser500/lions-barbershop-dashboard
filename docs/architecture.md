# Architecture

## Overview

Lion's Barbershop is a full-stack platform built to replace Vagaro entirely.
It owns appointments, payments, client CRM, membership billing, barber performance,
and marketing attribution in a single system.

```
Vue 3 + Vite (Web Dashboard + Public Site)
Flutter (Mobile App — client-facing, iOS/Android)
    ↕ Supabase JS client / REST / Realtime
Supabase (Postgres + Auth + Realtime + Edge Functions + Storage)
    ↕ Stripe SDK / webhooks
Stripe (Payments + Billing + Terminal)
    ↕ QueVex widget init context
QueVex API (AI assistant — embeddable widget, role-aware)
```

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Web frontend | Vue 3 + Vite | Dashboard (all 5 panels) + public site |
| Mobile | Flutter | Client booking app (iOS + Android) |
| Database | Supabase (Postgres) | All persistent data |
| Auth | Supabase Auth | Multi-role login (5 roles) |
| Realtime | Supabase Realtime | Live feed ticker, queue updates |
| Edge Functions | Supabase Edge Functions (Deno) | Stripe webhooks, business logic |
| File storage | Supabase Storage | Barber photos, client style photos |
| Payments | Stripe | Online checkout + subscriptions + Terminal POS |
| AI | QueVex API | Embeddable widget, role-scoped context |
| Analytics | Custom (useTracker.js → Supabase) | UTM capture, booking attribution |
| Ads | Meta Ads API + Google Ads API | Campaign spend + ROAS reporting |

## Auth & Roles

Supabase Auth handles login. A `profiles` table extends `auth.users` with a `role` field.
On login, the app reads `profiles.role` and redirects to the correct panel:

| Role | Panel | Access scope |
|------|-------|-------------|
| super_admin | /app/super-admin | All locations, all data |
| admin | /app/admin | Single location |
| staff | /app/staff | Single location, ops only |
| barber | /app/barber | Own appointments + clients |
| client | /app/client | Own history + membership |

RLS policies enforce the same access rules at the database level.

## Database (Postgres via Supabase)

Core tables: `profiles`, `locations`, `barbers`, `services`, `availability`, `time_off`,
`clients`, `appointments`, `reviews`, `membership_plans`, `subscriptions`, `payments`,
`inventory`, `ad_sessions`

See: [docs/phases/phase-5-platform.md](./phases/phase-5-platform.md) for full schema.

## Payment Architecture (Stripe)

- Online booking payments: Stripe Payment Element (embedded in booking wizard)
- Membership subscriptions: Stripe Billing (recurring, auto-retry on failure)
- In-shop fallback POS: Stripe Terminal (BBPOS WisePOS E)
- Webhook handler: Supabase Edge Function `stripe-webhook`
  - `checkout.session.completed` → confirm appointment
  - `invoice.payment_failed` → flag subscription at-risk
  - `invoice.paid` → reset monthly cut count (Essential plan)
  - `customer.subscription.deleted` → deactivate membership

## QueVex AI Integration

QueVex provides an embeddable widget mounted on each panel's `/ai` route.
Context is injected at mount time via `useQueVexContext.js` composable,
which fetches role-scoped data from Supabase and serializes it.

Data scope per role:
- **barber:** own appointments, earnings, clients, reviews
- **staff:** today's schedule, queue depth, check-ins
- **admin:** full location — schedule, revenue, subscribers, at-risk
- **super_admin:** cross-location KPIs, MRR, top/bottom performers
- **client:** own history, next appointment, membership status

## Flutter Mobile App

Separate repository: `lions-barbershop-flutter`
Shares the same Supabase backend and auth.
Handles client-facing booking, history, and membership management.
