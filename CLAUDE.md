# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A read-mostly pilgrim guide to Mount Athos (Orthodox monasteries): interactive maps, walking paths, ferry/transport info, saints, an Orthodox fasting/feast calendar, the monastic horarium, and optional client-side trip planning. React 18 + TypeScript + Vite, shipped both as a web PWA (GitHub Pages under `/athos/`) and as native iOS/Android via Capacitor. No backend — all content is static TypeScript data and all user state lives in `localStorage`.

## Commands

```bash
npm run dev              # Vite dev server
npm run build            # tsc -b && vite build (web, base=/athos/)
npm run build:mobile     # same, with MOBILE=1 (base=./ for Capacitor filesystem loads)
npm run preview          # serve the production build
npm run typecheck        # tsc -b --noEmit

npm run test             # vitest run (one-shot)
npm run test:watch       # vitest watch
npm run test -- src/lib/fasts.test.ts   # run a single test file
npm run test:watch -- -t "pascha"       # run tests matching a name

# Mobile (Capacitor 8). build:mobile runs first where needed.
npm run cap:sync         # build:mobile + cap sync
npm run cap:run:ios / :android
npm run build:android[:release|:bundle]   # wraps scripts/build-android.sh
npm run build:ios[:simulator|:archive]    # wraps scripts/build-ios.sh
```

There is **no linter or formatter** configured (no ESLint/Prettier/Tailwind/PostCSS). TypeScript runs in strict mode — `npm run typecheck` is the only static gate. Package manager is npm (`package-lock.json`).

## Architecture

**Boot sequence** (`src/main.tsx`): calls `reportDataIssues()` then `registerServiceWorker()` before mounting `<I18nProvider><App/></I18nProvider>`.

**Routing is hash-based and hand-rolled** — no router library. `src/lib/router.ts` has `parseHash()`/`viewToHash()`; `App.tsx` listens to `hashchange` and dispatches to view components. This is deliberate so it works on GitHub Pages (no server routes) and Capacitor (`file://`). When adding a view, wire it through `router.ts` and `App.tsx`, not a route table.

**Content is static data, English-canonical with a Romanian overlay.** Source-of-truth lives in `src/data/*.ts` (`monasteries.ts`, `settlements.ts`, `saints.ts`, `paths.ts`, `transport.ts`, `suggested-itineraries.ts`), keyed by slug. Romanian translations are a *separate overlay* in `src/i18n/data-ro.ts` (`MONASTERIES_RO`, `SAINTS_RO`, …) keyed by the same slug; missing fields fall back to English. Never duplicate the full record in Romanian — add only the overridden fields.

**i18n** (`src/i18n/`): `useI18n()` is the only access path. `t(key, vars?)` looks up UI strings in `strings.ts`; `tr(en, ro)` picks the localized content variant with EN fallback. Language is detected from localStorage → `navigator.language` → EN.

**Boot-time data validation** (`src/lib/assertData.ts`): checks duplicate slugs, broken `dependsOn` references, unparseable feast strings, and walking-path edges pointing at unknown slugs. Loud `console.group` in dev, single `console.warn` in prod. **If you edit `src/data/*.ts`, run the app or tests and watch for validator warnings** — invalid feast strings parse to nothing silently otherwise.

**Feast/fasting calendar** is computed, not stored:
- `src/lib/fasts.ts` — Orthodox Pascha via Gauss's algorithm (Julian-computed, ≠ Western Easter), Julian↔Gregorian offset (+13 days for 1900–2099), and the fast periods (Great Lent, Holy/Bright Week, Apostles', Dormition, Nativity, Christmastide).
- `src/lib/feasts.ts` — parses feast-day strings of the form `"Title (D_old / D_new Month)"` (Julian / Gregorian) found on monastery/saint records. Keep that exact format when editing data.

**Two map renderers**, toggled in the UI and persisted to localStorage:
- `src/components/MedievalMap.tsx` — inline SVG, no tiles, fixed viewport (no pan/zoom by design). Byzantine-fresco aesthetic with a custom `project(lng,lat)` WGS84→canvas projection. **Design constraint: keep the painted Byzantine-fresco style — no European-portolano / nautical-chart ornament.**
- `src/components/ModernMap.tsx` — Leaflet + OSM tiles, **lazy-loaded** via `React.lazy`/`Suspense` from `MapView` so the ~130KB Leaflet bundle only loads when the user opens it.

**State** is plain React hooks + `localStorage` (keys are `athos:*`, e.g. `athos:lang`, `athos:map-mode`). No Redux/Zustand/Context beyond i18n. Trips (`src/lib/trips.ts`) are saved locally and shared via compressed payload in the URL hash (`src/lib/tripShare.ts`) — there is no cloud sync.

**PWA vs. native**: `src/lib/pwa.ts` registers a hand-rolled service worker (`public/sw.js`, app-shell stale-while-revalidate + cache-first for remote OSM/Wikimedia assets, tuned for patchy Athos connectivity). Registration is **skipped inside Capacitor** since the native shell runs offline from bundled assets. Capacitor config is `capacitor.config.ts` (app id `org.athos.pilgrim`).
