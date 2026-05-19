# Ideas for further work

A backlog of features beyond the four already shipped (Diamonitirion panel,
sketes layer toggle, suggested itineraries, feast-day-aware trip view).
Grouped by the value they add, with rough implementation notes where useful.

---

## Pilgrim utility (highest practical value)

### Daily akolouthia / typikon times per monastery
Show Vespers, Orthros, Liturgy and trapeza times for each house. Even rough
averages are useful — visitors plan arrivals around services.

- Extend `Monastery` with a `services?: { vespers?: string; orthros?: string;
  liturgy?: string; trapeza?: string; notes?: string }` field.
- Render in `MonasteryDetail` as a small fixed-width "horarium" panel,
  styled like a Byzantine *programma*.
- Times often differ for feast days vs ordinary days — model as
  `services: { ordinary, feast }` or note in a comment.

### Fasting calendar overlay
Show whether trip dates fall in a fast (Great Lent, Apostles', Dormition,
Nativity). Trapeza changes accordingly; pilgrims plan accordingly.

- Static date table for fixed fasts; Pascha-anchored fasts (Great Lent,
  Apostles') need a paschalion. Either ship 30 years of pre-computed
  Pascha dates as a JSON table, or compute Gauss's algorithm in TS.
- In `TripDetail`, add a per-day chip beside the date:
  `Wed, 10 Jun · Apostles' Fast (day 4)`.
- Pair with feast-day banner — feast days inside a fast are still observed
  (e.g. Annunciation always non-fasting even in Great Lent).

### Walking-path graph between monasteries
Distances, elevation gain, typical hours, difficulty for each leg.

- New data file `src/data/paths.ts` with edges:
  `{ from: slug, to: slug, km, ascentM, hours, difficulty: 'easy'|'medium'|'strenuous', notes }`.
- Sources: the classic Athos walking guides — Sotiris Kadas, the
  *Friends of Mount Athos* footpath manual.
- In `TripDetail`, when two consecutive stops are connected by a known path,
  show the walking summary between them: `Iviron → Stavronikita · 4.5 km ·
  1h 30 · easy coastal trail`.
- Optional: render the path on `TripItineraryMap` as a dotted line.

### Offline-first hardening
Cell coverage is patchy on Athos; the app should work fully offline once
opened once.

- Add a service worker (Workbox or a hand-rolled one). Cache the app shell
  + JSON data + Wikimedia icon images on first load.
- Pre-cache OSM tiles for the Athos bounding box (zoom 11–14, ~few thousand
  tiles, well under storage quotas).
- Show an "offline ready" indicator once caching completes.
- Capacitor already handles native install; this matters most for the
  browser PWA path and for tiles inside the Leaflet view.

### Compass + arrival-bearing
When within ~2 km of a monastery, show direction and distance from current
location.

- Capacitor `@capacitor/geolocation` + the device's compass/heading API.
- Render a small painted-compass overlay on `MonasteryDetail` when the
  pilgrim is on-Mountain.
- "1.2 km · NE · 18 min on foot" with an arrow pointing toward the bearing.

---

## Content depth

### Founders & century-founded timeline
A horizontal Byzantine timeline (Athanasius / Great Lavra 963 → 20th-century
revival), with each monastery placed at its foundation date.

- New view `kind: 'timeline'`, navigable from the home view.
- Render as an SVG band styled like a *kataloghion*: gold rule, century
  divisions, each monastery a numbered halo medallion on the band.
- Click a medallion → jump to monastery detail.

### Ecumenical Patriarchs & saints from Athos
Short hagiographies linked from the monasteries each saint is tied to:
Gregory Palamas, Silouan, Paisios, Porphyrios, Maximos Kavsokalyvitis,
Kosmas Aitolos, Nikodemos the Hagiorite, John Koukouzelis…

- New data file `src/data/saints.ts` with `{ slug, name, nameGreek, years,
  feast, monastery?: slug, intro, notes? }`.
- New view `kind: 'saint'` with detail layout mirroring `MonasteryDetail`.
- Cross-link from `MonasteryDetail` ("Saints of this house") and from the
  feast-day banner already in place.

### Relics index
You already have wonder-working icons per monastery. Extend with bodily
relics (Belt of the Theotokos at Vatopedi, head of St Panteleimon, fragment
of the True Cross at multiple houses, head of St John the Baptist at
Dionysiou…).

- Either fold into existing `SacredIcon[]` (rename to `Treasures[]`?) or
  add a parallel `relics?: Treasure[]`.
- Lets pilgrims search "where can I venerate the True Cross" → multiple
  houses listed.

### Sketes & kellia depth
Sketes layer is now toggleable; the underlying data could grow:

- Kellia attached to each ruling monastery (currently sketes only).
- Distinctive idioritmic vs koinobitic sketes — note in detail.
- Kafsokalyvia, Karoulia, Katounakia each deserve fuller treatment of
  their famous elders.

---

## Trip planner upgrades

### Ferry-aware routing
Given a starting date + Ouranoupoli vs Ierissos arrival, compute which
monasteries are reachable that day and which are dead-ends if not visited
in the right order.

- Model `FerryRoute` as a directed graph node-set keyed by arsanas.
- When the user adds a stop, suggest the next stop based on what the
  afternoon boat actually reaches from there.
- Flag impossible jumps ("no direct boat Hilandar → Agiou Pavlou on same
  day") with a soft warning.

### Per-stop reservation status
Most monasteries require advance arrangement by phone. Track that.

- Extend `TripPlace` with `{ reservationStatus?: 'planned' | 'contacted' |
  'confirmed', notes?: string }`.
- Render a small status pip on each stop in `TripDetail`.
- Add a "Phone for guesthouse" link if the monastery's data has one;
  otherwise prompt to copy a generic intro letter.

### Trip export & share
- Export the trip as a printable PDF (single page, Byzantine borders,
  per-day stops with feast info from the existing banner).
- "Send to a fellow pilgrim" → URL with the trip encoded in the hash, so
  the other side imports a copy on open.
- iCal export — one all-day event per stop, with the monastery name and
  feast info in the title.

### Multi-pilgrim view
Right now the trip is single-pilgrim. Two of you might travel together but
have different reservation status. A simple multi-pilgrim flag per stop
would help groups.

---

## Aesthetic / craft (continuing the fresco direction)

### Saint's day "today" banner in the header
A small permanent strip at the top of the app: "Today · 19 May · Holy
Martyr Patrick of Prousa". Use the Julian/civil correspondence already
worked out for the feast-day parser.

- Needs a saints-of-the-day data table. The Pentecostarion + Menaion give
  the full list; for a useful subset, ship just the major commemorations
  + any Athonite saint.

### Hand-lettered Greek labels on the medieval map
Toggle on the portolano view: Greek monastery names rendered in the
hand-painted Athonite style instead of Cinzel.

- Either use a Byzantine Greek webfont (e.g. *Athonite Uncial*) or hand-
  trace the 20 names as inline SVG paths for crisper fresco fidelity.

### Porphyry-seal treatment for monastery detail headers
You already restyled the "Open in Maps" button as a porphyry seal. Extend
the language to the monastery detail page header — the founding date and
patronal feast badge could read as embossed porphyry plaques set into the
parchment.

### Illuminated drop-cap on saint / legend openings
`DropCap` already exists for monastery intro paragraphs. Reuse it as the
opening of each `Legend` story — at the moment legends start with a normal
paragraph.

### Painted decorative borders around monastery images
The Wikimedia icon images currently sit in a plain `<figure>` with a
gold frame. A Byzantine wood-and-gold border (corner medallions, foliate
edge) would lift them visually to match the surrounding parchment.

---

## Internationalisation

### More languages
You already have EN + RO. Easy additions, each largely a data overlay:

- Greek (Ελληνικά) — most natural for the subject, would also let you
  drop the parallel Greek name field and use real i18n.
- Russian (Русский) — large Athonite Russian readership.
- Serbian and Bulgarian — natural for Hilandar / Zographou visitors.

The i18n pattern (`tr(en, ro)`) generalises easily to a record keyed by
lang code.

### Greek transliteration toggle
Some readers prefer "Hagion Oros" over "Άγιον Όρος". Offer a transliteration
toggle that shows the romanised Greek alongside (or in place of) the Greek
font.

---

## Technical infrastructure

### Tests
Currently no test suite. Worth adding a small one specifically for:

- `parseFeastDate` — covers both same-month and cross-month formats and
  the moveable-feast rejection.
- `tripFromTemplate` — date arithmetic, leap-year boundary.
- `regenerateDays` — preserves places when range changes.

Vitest with `--coverage` would be sufficient; no need for a full E2E layer.

### Analytics-free usage signals
Without phoning home, you could surface a "trips on this device" stat on
the home view (it's localStorage). Useful for the user, no privacy cost.

### Data validation at boot
A small `assertData()` that runs at app startup to catch:

- Duplicate slugs across monasteries / settlements.
- `dependsOn` pointing at a non-existent monastery.
- `patronalFeast` strings that fail to parse (unless intentionally
  marked moveable).

Cheap, runs once, catches editorial drift early.
