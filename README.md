# Pamushika IN

A mobile marketplace connecting customers in Zimbabwe with local vendors selling fresh produce, indigenous foods, and organic goods. Built with **Expo** and **React Native**.

> Status: UI/prototype phase. All data currently comes from `src/data/mockData.ts` — there is no backend integration yet. The [System design & required APIs](#system-design--required-apis) section below specifies the backend this app is designed against.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Expo SDK 56, React Native 0.85, React 19 |
| Navigation | React Navigation (native-stack) |
| Styling | NativeWind 4 (Tailwind CSS for RN) |
| Icons | lucide-react-native |
| Animations | react-native-reanimated 4 + react-native-worklets |
| Language | TypeScript |

## Prerequisites

- Node.js 20 LTS and npm
- Git
- [Expo Go](https://expo.dev/go) app on a physical device, **or** Android Studio / Xcode for an emulator/simulator
- Watch the Expo docs for the exact SDK version this project targets — **the API surface differs significantly between SDK versions**: https://docs.expo.dev/versions/v56.0.0/

## Getting started (fresh clone)

```bash
git clone <repo-url>
cd pamushika-app
npm install
npx expo-doctor          # sanity-check native module / config compatibility
npm start                # or: npm run android / npm run ios / npm run web
```

If you cloned this repo onto a new machine and see native crashes or red-box errors that don't reproduce in Expo Go, run `npx expo-doctor` first — it catches missing peer dependencies (e.g. `react-native-worklets`, required by `react-native-reanimated`) and SDK/version drift that `npm install` alone won't flag. Then cross-check exact versions with `npx expo install --check`, which aligns dependencies to what SDK 56 expects.

## Available scripts

| Command | Description |
|---|---|
| `npm start` | Start the Metro bundler / Expo dev server |
| `npm run android` | Start and open on a connected Android device/emulator |
| `npm run ios` | Start and open on iOS simulator (macOS only) |
| `npm run web` | Run in a browser |

## Project structure

```
src/
  components/        Shared UI building blocks (Button, Input, Checkbox, BottomNav, ...)
  components/ui/      Low-level form primitives
  data/               Mock data (Product, Vendor types + sample records)
  navigation/         Tab routing helpers (consumer vs vendor tab sets)
  screens/            One file per screen (see below)
```

### Screens

- **Consumer**: Welcome, Login, Register, Home, Search, Favorites, Profile
- **Vendor**: VendorRegister, VendorOnboarding (multi-step), VendorDashboard, VendorProducts, VendorPosts
- **Shared**: Splash (app boot / loading)

## System design & required APIs

The UI is built around two actors — **consumers** and **vendors** — sharing one account system. Below is the backend surface the screens are designed to call once a real API is wired in. Suggested REST shape; adapt to GraphQL if preferred. All endpoints assume `Authorization: Bearer <token>` except where noted public.

### 1. Authentication & accounts
Used by: `Login`, `Register`, `VendorRegister`, `VendorOnboarding`, `Profile`.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/register` | Create a consumer account (name, email, phone, location, password) |
| POST | `/auth/login` | Email/password login → access + refresh token |
| POST | `/auth/refresh` | Exchange refresh token for a new access token |
| POST | `/auth/logout` | Revoke refresh token |
| POST | `/auth/forgot-password` | Trigger reset email/SMS |
| POST | `/auth/reset-password` | Complete password reset |
| GET | `/users/me` | Current user profile (consumer or vendor) |
| PATCH | `/users/me` | Update profile details |

### 2. Vendor onboarding & management
Used by: `VendorRegister`, `VendorOnboarding`, `VendorDashboard`.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/vendors` | Create a vendor profile linked to the authenticated user (business info, national ID, categories) |
| PATCH | `/vendors/:id` | Update business info / location / categories |
| POST | `/vendors/:id/photos` | Upload storefront photos (multipart; returns CDN URLs) |
| GET | `/vendors/:id` | Vendor profile (`name`, `location`, `rating`, `reviewCount`, `categories`, `verified`, `plan`) |
| GET | `/vendors/:id/stats` | Dashboard stats: products count, revenue, rating, views |
| GET | `/vendors/:id/orders?status=` | Orders list for the vendor dashboard |
| GET | `/vendors/:id/performance?range=` | Weekly/monthly sales series for the dashboard chart |
| GET | `/vendors/nearby?lat=&lng=&radiusKm=` | Public — vendors near a location, with computed `distance` |

### 3. Subscription plans & billing
Used by: `VendorOnboarding` (Subscription + Payment steps).

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/plans` | Public — list plans (`Starter`, `Growth`, `Premium`) with price & feature limits |
| POST | `/vendors/:id/subscription` | Subscribe vendor to a plan |
| POST | `/payments/charge` | Initiate payment for the chosen plan |
| GET | `/payments/:id/status` | Poll/confirm payment status (for redirect-based mobile money flows) |

Zimbabwean payment methods referenced in the UI — needs a gateway that supports:
- **EcoCash** (mobile money)
- **OneMoney** (mobile money)
- **Visa/Mastercard** (card)

A common choice for this market is **Paynow** (Zimbabwe), which aggregates EcoCash, OneMoney, and card rails behind one API — confirm against current Paynow API docs before integrating, as terms/endpoints change.

### 4. Products
Used by: `Search`, `Favorites`, `VendorProducts`.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/products?q=&category=&lat=&lng=&radiusKm=` | Public search/filter (matches `Search` screen's query + category logic) |
| GET | `/products/:id` | Product detail (nutrition, benefits, vendor info) |
| POST | `/vendors/:id/products` | Vendor creates a product listing |
| PATCH | `/products/:id` | Vendor edits a listing (price, stock, description) |
| DELETE | `/products/:id` | Remove a listing |
| POST | `/products/:id/photos` | Upload product image(s) |

Product shape mirrors `src/data/mockData.ts`: `name`, `category`, `price`, `unit`, `vendorId`, `rating`, `inStock`, `image`, `description`, `nutrition { vitamins, minerals, protein, fiber }`, `benefits[]`.

### 5. Favorites
Used by: `Favorites`.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/users/me/favorites/products` | Saved products |
| GET | `/users/me/favorites/vendors` | Saved vendors |
| POST | `/favorites/products/:id` | Save a product |
| DELETE | `/favorites/products/:id` | Unsave a product |
| POST | `/favorites/vendors/:id` | Save a vendor |
| DELETE | `/favorites/vendors/:id` | Unsave a vendor |

### 6. Reviews & ratings
Implied by `rating` / `reviewCount` on vendors and products throughout the UI.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/vendors/:id/reviews` | List reviews |
| POST | `/vendors/:id/reviews` | Submit a rating + comment |

### 7. Vendor posts (promotions/updates)
Used by: `VendorPosts`.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/vendors/:id/posts` | List a vendor's posts |
| POST | `/vendors/:id/posts` | Create a post (title, body, linked product, photo) |
| GET | `/feed/posts?lat=&lng=` | Public feed of nearby vendor posts (for a future consumer-facing feed) |

### 8. Content / healthy living
Used by: `HealthyTipsCarousel` on `Home`.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/content/healthy-tips` | Public — daily fruit/vegetable/recipe/tip cards |

### 9. Notifications
Bell icons appear on `Home` and `VendorDashboard` but aren't wired up yet.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/users/me/notifications` | List notifications |
| POST | `/users/me/notifications/:id/read` | Mark as read |
| POST | `/devices` | Register a push token (Expo Notifications) |

### 10. Geolocation & maps
`distance` fields and the "Map view would appear here" placeholder in `VendorOnboarding` imply:
- Device geolocation (`expo-location`) to get the consumer's current position client-side.
- A maps/geocoding provider for: reverse-geocoding a vendor's address during onboarding, rendering a map picker, and server-side distance calculation (e.g. Haversine on stored lat/lng, or Google Maps/Mapbox Distance Matrix).

### Cross-cutting concerns to design for
- **Media storage**: product/vendor/post photos need an object store + CDN (S3-compatible or Cloudinary) — `VendorOnboarding`'s photo step and `VendorProducts`/`VendorPosts` images depend on it.
- **Role-based access**: a single account can be both a consumer and a vendor (`Profile` → "Become a vendor"); the API should authorize by role per-endpoint, not by separate user tables.
- **Pagination**: `/products`, `/vendors/nearby`, `/vendors/:id/posts` should all support cursor or offset pagination — mock data is small but production listings won't be.

## Troubleshooting

- **`Missing peer dependency: react-native-worklets`** — run `npx expo-doctor`; fix with `npx expo install react-native-worklets`. This project's `babel.config.js` already includes the `react-native-reanimated/plugin`, which depends on worklets being present.
- **Dependency/version drift after cloning** — run `npx expo install --check` to align all packages to what's expected for the installed Expo SDK version, rather than trusting `npm install` alone.
- Always check the **versioned** Expo docs for the SDK in `package.json` (`expo: ~56.0.x`) before writing new code: https://docs.expo.dev/versions/v56.0.0/ — APIs change between SDK releases.
