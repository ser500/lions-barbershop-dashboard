# Architecture

## Overview

Lion's Barbershop is composed of two client applications sharing a common backend.

```
┌─────────────────────────┐     ┌─────────────────────────┐
│   Dashboard (Vue.js)    │     │   Mobile App (Flutter)  │
│  lions-barbershop-      │     │  lions-barbershop-      │
│  dashboard              │     │  flutter                │
└────────────┬────────────┘     └────────────┬────────────┘
             │                               │
             └───────────────┬───────────────┘
                             │
                      ┌──────▼──────┐
                      │   Backend   │
                      │   (TBD)     │
                      └─────────────┘
```

## Dashboard (Vue.js)

- Admin/staff-facing web application
- Manages appointments, clients, and barber schedules
- Built with Vite + Vue 3 (Composition API)

## Mobile App (Flutter)

- Client-facing mobile application (iOS & Android)
- Allows clients to book appointments, view barbers, and track history
- Built with Flutter / Dart

## Shared Concerns

- Authentication strategy: TBD
- API contracts: see [api.md](./api.md)
