# Setup

## Dashboard (Vue.js)

**Requirements:** Node.js 18+

```bash
git clone https://github.com/ser500/lions-barbershop-dashboard.git
cd lions-barbershop-dashboard
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Mobile App (Flutter)

**Requirements:** Flutter 3.x, Dart 3.x

```bash
git clone https://github.com/ser500/lions-barbershop-flutter.git
cd lions-barbershop-flutter
flutter pub get
flutter run
```

Select a target device when prompted (iOS simulator, Android emulator, or physical device).

## Environment Variables

Each project has its own `.env` file. Copy `.env.example` to `.env` and fill in the values.

| Variable | Used By | Description |
|---|---|---|
| `VITE_API_URL` | Dashboard | Backend API base URL |
| `API_URL` | Flutter | Backend API base URL |
