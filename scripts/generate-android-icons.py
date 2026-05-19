#!/usr/bin/env python3
"""
Generate Android launcher icons, adaptive-icon layers, splash screens,
and a Play Store reference for the Athos Pilgrim app.

Source artwork: the Play Store SVG kit in playstore/ (icon-512.svg,
adaptive-foreground.svg, adaptive-background.svg, adaptive-monochrome.svg,
splash-background.svg, notification-icon.svg).

Rendering: we don't redraw the art in Python — the SVGs are the canonical
source. We rasterize them at every Android density using rsvg-convert
(preferred, `brew install librsvg`) or headless Chrome (faithful fallback,
loads Google Fonts so Cinzel / Cardo / Cormorant render correctly).
"""

from __future__ import annotations

import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

REPO = Path(__file__).resolve().parents[1]
KIT = REPO / "playstore"
RES = REPO / "android" / "app" / "src" / "main" / "res"
BUILD_OUT = REPO / "build" / "icons"

SVG_ICON = KIT / "icon-512.svg"
SVG_FG = KIT / "adaptive-foreground.svg"
SVG_BG = KIT / "adaptive-background.svg"
SVG_MONO = KIT / "adaptive-monochrome.svg"
SVG_SPLASH = KIT / "splash-background.svg"
SVG_NOTIFY = KIT / "notification-icon.svg"

# ---------------------------------------------------------------------------
# Density tables
# ---------------------------------------------------------------------------

# Adaptive-icon layers (foreground / background / monochrome) are 108dp.
ADAPTIVE_SIZES = {
    "mipmap-mdpi": 108,
    "mipmap-hdpi": 162,
    "mipmap-xhdpi": 216,
    "mipmap-xxhdpi": 324,
    "mipmap-xxxhdpi": 432,
}

# Legacy launcher icons (pre-Android 8) are 48dp.
LEGACY_SIZES = {
    "mipmap-mdpi": 48,
    "mipmap-hdpi": 72,
    "mipmap-xhdpi": 96,
    "mipmap-xxhdpi": 144,
    "mipmap-xxxhdpi": 192,
}

# Splash drawables. Capacitor centers and crops via androidScaleType:
# CENTER_CROP — we render at the larger side so neither orientation under-fills.
SPLASH_SPECS = [
    ("drawable", 480, 320),
    ("drawable-port-mdpi", 320, 480),
    ("drawable-port-hdpi", 480, 800),
    ("drawable-port-xhdpi", 720, 1280),
    ("drawable-port-xxhdpi", 960, 1600),
    ("drawable-port-xxxhdpi", 1280, 1920),
    ("drawable-land-mdpi", 480, 320),
    ("drawable-land-hdpi", 800, 480),
    ("drawable-land-xhdpi", 1280, 720),
    ("drawable-land-xxhdpi", 1600, 960),
    ("drawable-land-xxxhdpi", 1920, 1280),
]

# Notification glyph (system-tinted, white on transparent), 24dp.
NOTIFY_SIZES = {
    "drawable-mdpi": 24,
    "drawable-hdpi": 36,
    "drawable-xhdpi": 48,
    "drawable-xxhdpi": 72,
    "drawable-xxxhdpi": 96,
}

ADAPTIVE_XML = """<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
    <monochrome android:drawable="@mipmap/ic_launcher_monochrome"/>
</adaptive-icon>
"""

# ---------------------------------------------------------------------------
# Renderer
# ---------------------------------------------------------------------------

CHROME_CANDIDATES = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "chromium",
    "google-chrome",
    "google-chrome-stable",
]

FONTS_LINK = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    '<link href="https://fonts.googleapis.com/css2?'
    'family=Cinzel+Decorative:wght@700;900'
    '&family=Cinzel:wght@500;600;700'
    '&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500'
    '&family=Cardo:ital,wght@0,400;0,700;1,400'
    '&display=swap" rel="stylesheet">'
)


def detect_renderer():
    if shutil.which("rsvg-convert"):
        return ("rsvg", "rsvg-convert")
    for c in CHROME_CANDIDATES:
        if os.path.isabs(c):
            if os.access(c, os.X_OK):
                return ("chrome", c)
        else:
            found = shutil.which(c)
            if found:
                return ("chrome", found)
    print(
        "error: install librsvg (`brew install librsvg`) or Google Chrome.",
        file=sys.stderr,
    )
    sys.exit(1)


def render(svg: Path, width: int, height: int, dst: Path, mode: tuple[str, str]):
    """Rasterize svg at (width, height) into dst."""
    dst.parent.mkdir(parents=True, exist_ok=True)
    kind, bin_path = mode
    if kind == "rsvg":
        subprocess.run(
            [bin_path, "-w", str(width), "-h", str(height), str(svg), "-o", str(dst)],
            check=True,
        )
        return

    # Chrome: inline the SVG into a wrapper that preloads Google Fonts so
    # text in the SVG (Cinzel, Cardo, etc.) renders correctly. The wrapper
    # is written into the kit directory so any <image href="..."> inside the
    # SVG resolves relative to the SVG's neighbours.
    svg_body = svg.read_text(encoding="utf-8")
    if svg_body.startswith("<?xml"):
        svg_body = svg_body.split("?>", 1)[1].lstrip()

    wrapper = (
        f'<!doctype html><html><head><meta charset="utf-8">{FONTS_LINK}'
        f'<style>html,body{{margin:0;padding:0;background:transparent;'
        f'width:{width}px;height:{height}px;overflow:hidden}}'
        f'svg{{display:block;width:{width}px;height:{height}px}}</style>'
        f'</head><body>{svg_body}</body></html>'
    )
    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".html", dir=str(KIT), delete=False, encoding="utf-8"
    ) as f:
        f.write(wrapper)
        wrapper_path = Path(f.name)

    try:
        subprocess.run(
            [
                bin_path,
                "--headless",
                "--disable-gpu",
                "--no-sandbox",
                "--default-background-color=00000000",
                "--hide-scrollbars",
                "--virtual-time-budget=4000",
                f"--window-size={width},{height}",
                f"--screenshot={dst}",
                f"file://{wrapper_path}",
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
    finally:
        wrapper_path.unlink(missing_ok=True)


# ---------------------------------------------------------------------------
# Driver
# ---------------------------------------------------------------------------

def main():
    if not RES.exists():
        print(
            f"error: {RES} not found. Run `npx cap add android` first.",
            file=sys.stderr,
        )
        sys.exit(1)

    for svg in (SVG_ICON, SVG_FG, SVG_BG, SVG_MONO, SVG_SPLASH, SVG_NOTIFY):
        if not svg.exists():
            print(f"error: missing source SVG: {svg}", file=sys.stderr)
            sys.exit(1)

    mode = detect_renderer()
    print(f"renderer: {mode[0]}")
    BUILD_OUT.mkdir(parents=True, exist_ok=True)

    # 1. Reference renders for Play Store + sanity.
    print("==> Reference (Play Store)")
    render(SVG_ICON, 1024, 1024, BUILD_OUT / "ic_launcher_play_store_1024.png", mode)
    render(SVG_ICON, 512, 512, BUILD_OUT / "ic_launcher_play_store_512.png", mode)

    # 2. Adaptive icon layers.
    print("==> Adaptive icon layers")
    for folder, size in ADAPTIVE_SIZES.items():
        print(f"    {folder} @ {size}px")
        render(SVG_FG, size, size, RES / folder / "ic_launcher_foreground.png", mode)
        render(SVG_BG, size, size, RES / folder / "ic_launcher_background.png", mode)
        render(SVG_MONO, size, size, RES / folder / "ic_launcher_monochrome.png", mode)

    # 3. Legacy launcher (square + round). Capacitor scaffolds these.
    print("==> Legacy launcher (square + round)")
    for folder, size in LEGACY_SIZES.items():
        print(f"    {folder} @ {size}px")
        render(SVG_ICON, size, size, RES / folder / "ic_launcher.png", mode)
        render(SVG_ICON, size, size, RES / folder / "ic_launcher_round.png", mode)

    # 4. Adaptive-icon XML (v26+, monochrome on v33+).
    print("==> Adaptive-icon XML")
    (RES / "mipmap-anydpi-v26").mkdir(parents=True, exist_ok=True)
    (RES / "mipmap-anydpi-v26" / "ic_launcher.xml").write_text(ADAPTIVE_XML, encoding="utf-8")
    (RES / "mipmap-anydpi-v26" / "ic_launcher_round.xml").write_text(ADAPTIVE_XML, encoding="utf-8")

    # 5. Splash. Render as a square at max(w, h); Capacitor center-crops.
    print("==> Splash (port + land, all densities)")
    for folder, w, h in SPLASH_SPECS:
        side = max(w, h)
        print(f"    {folder} @ {w}x{h} (rendered {side}²)")
        render(SVG_SPLASH, side, side, RES / folder / "splash.png", mode)

    # 6. Notification glyph (white-on-transparent, system-tinted at runtime).
    print("==> Notification glyph")
    for folder, size in NOTIFY_SIZES.items():
        print(f"    {folder} @ {size}px")
        render(SVG_NOTIFY, size, size, RES / folder / "ic_stat_notify.png", mode)

    print()
    print(f"Done. Resources under {RES.relative_to(REPO)}/")
    print(f"Reference renders under {BUILD_OUT.relative_to(REPO)}/")
    print("Next: npm run build:android   (debug APK in build/android/)")


if __name__ == "__main__":
    main()
