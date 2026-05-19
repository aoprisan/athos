# Athos Pilgrim — Play Store art kit

Every asset required to publish *Athos Pilgrim* on Google Play, drawn in the
Athonite iconographic register (gold leaf on lapis lazuli, painted plaster,
oxblood, vellum) — the same visual lineage as the in-app fresco map.

Open `preview.html` for the full visual brief. Run `bash export.sh` to render
all PNGs.

## Source files

| File | Size | Purpose |
| ---- | ---- | ------- |
| `icon-512.svg` | 512×512 | Play Store listing icon · legacy launcher source |
| `adaptive-foreground.svg` | 432×432 | Android adaptive icon foreground (108dp, 66% safe zone) |
| `adaptive-background.svg` | 432×432 | Android adaptive icon background |
| `adaptive-monochrome.svg` | 432×432 | Android 13+ themed-icon variant (white on transparent) |
| `feature-graphic.svg` | 1024×500 | Play Store listing banner — Theotokos + wordmark + landscape |
| `splash-background.svg` | 2732×2732 | Capacitor splash, square center-crop |
| `notification-icon.svg` | 24×24 | Status bar notification glyph (white, system-tinted) |
| `screenshot-1-home.svg` | 1080×1920 | "A Pilgrim's Guide" — home view |
| `screenshot-2-map.svg` | 1080×1920 | "Twenty Monasteries" — topographic map + list |
| `screenshot-3-pelerinaje.svg` | 1080×1920 | "Plan Your Days" — pilgrimage form |
| `screenshot-4-cum-ajungi.svg` | 1080×1920 | "Diamonitirion" — Pilgrim's Bureau info |
| `screenshot-5-feriboturi.svg` | 1080×1920 | "Ferry Timetable" — Ouranoupoli → Daphni |
| `screenshots-raw/0[1-5]-*.png` | 586×~1200 | Source device captures embedded in the framed SVGs above |

## Render to PNG

One-time:

```bash
brew install librsvg     # preferred — faithful SVG rasterizer
# or: brew install imagemagick
```

Then:

```bash
bash playstore/export.sh
# → playstore/png/*.png
```

The script emits Play Store-ready PNGs **and** the per-density Android mipmap
set for the legacy launcher and notification icon.

## Wiring into the Capacitor Android project

After `npm run cap:sync` generates `android/`, drop the rendered PNGs into:

```
android/app/src/main/res/
├─ mipmap-mdpi/    ic_launcher.png          (48×48)
├─ mipmap-hdpi/    ic_launcher.png          (72×72)
├─ mipmap-xhdpi/   ic_launcher.png          (96×96)
├─ mipmap-xxhdpi/  ic_launcher.png          (144×144)
├─ mipmap-xxxhdpi/ ic_launcher.png          (192×192)
├─ mipmap-anydpi-v26/
│  └─ ic_launcher.xml          ← references the three adaptive layers below
├─ drawable-anydpi-v26/
│  ├─ ic_launcher_foreground.xml    (or .png at each density)
│  ├─ ic_launcher_background.xml
│  └─ ic_launcher_monochrome.xml
└─ drawable-*/    splash.png      (Capacitor splash)
```

`ic_launcher.xml` should read:

```xml
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@drawable/ic_launcher_background"/>
    <foreground android:drawable="@drawable/ic_launcher_foreground"/>
    <monochrome android:drawable="@drawable/ic_launcher_monochrome"/>
</adaptive-icon>
```

## Play Console upload

| Console field | File |
| ------------- | ---- |
| App icon | `png/icon-512.png` |
| Feature graphic | `png/feature-graphic.png` |
| Phone screenshots (×5) | `png/screenshot-1.png` … `png/screenshot-5.png` |

Play also asks for 7" and 10" tablet screenshots if you target tablets; the
SVG sources will reflow if re-rendered at `1200×1920` (7") and `1600×2560` (10").

## Design lineage

- **Palette** mirrors `src/styles/tokens.css` — same gold-leaf, lapis-lazuli,
  oxblood, parchment values.
- **Map vignette** in screenshot 1 and the feature graphic uses the same
  Athonite iconographic vocabulary as `src/components/MedievalMap.tsx`:
  Theotokos + angels sky band, painted hills, cypresses, red-roofed
  compounds, galley ship, restyled compass rose. No European-portolano
  ornament (no leviathan, no Boreas-cherubs, no sepia parchment palette).
- **Typography** matches the running app — Cinzel Decorative for display,
  Cinzel for titles, Cormorant Garamond for body, Cardo for Greek.
