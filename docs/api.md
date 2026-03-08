# API Contracts

> This document defines the shared API contracts consumed by both the Dashboard and Mobile App.

## Base URL

```
TBD
```

## Authentication

TBD — likely JWT or session-based auth.

## Endpoints

### Appointments

| Method | Path | Description |
|---|---|---|
| GET | `/appointments` | List all appointments |
| POST | `/appointments` | Create an appointment |
| GET | `/appointments/:id` | Get a single appointment |
| PATCH | `/appointments/:id` | Update an appointment |
| DELETE | `/appointments/:id` | Cancel an appointment |

### Barbers

| Method | Path | Description |
|---|---|---|
| GET | `/barbers` | List all barbers |
| GET | `/barbers/:id` | Get barber profile |

### Clients

| Method | Path | Description |
|---|---|---|
| GET | `/clients` | List all clients |
| GET | `/clients/:id` | Get client profile |

---

> Populate this file as endpoints are implemented.
