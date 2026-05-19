#!/usr/bin/env bash
# Render every SVG in the Play Store art kit to PNG at the correct target size.
#
# Renderer priority:
#   1. rsvg-convert  (librsvg — `brew install librsvg`) — fastest, faithful
#   2. Headless Chrome / Chromium — also faithful; loads Google Fonts so
#                                   Cinzel / Cormorant / Cardo render correctly
#   3. (no fallback to ImageMagick — gradients/patterns mangle.)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT="$ROOT/png"
mkdir -p "$OUT"

CHROME=""
if command -v rsvg-convert >/dev/null 2>&1; then
  RENDER="rsvg"
elif [ -x "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]; then
  RENDER="chrome"
  CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
elif command -v chromium >/dev/null 2>&1; then
  RENDER="chrome"; CHROME="chromium"
elif command -v google-chrome >/dev/null 2>&1; then
  RENDER="chrome"; CHROME="google-chrome"
else
  echo "Install librsvg (\`brew install librsvg\`) or Google Chrome first." >&2
  exit 1
fi

FONTS_LINK='<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cardo:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">'

render() {
  local src="$1" w="$2" h="$3" dst="$4"
  case "$RENDER" in
    rsvg)
      rsvg-convert -w "$w" -h "$h" "$ROOT/$src" -o "$OUT/$dst"
      ;;
    chrome)
      # Inline the SVG content into a wrapper that pre-loads Google Fonts.
      # `<img>` would render the SVG in its own document where fonts don't
      # propagate; inlining the SVG lets it use the page's loaded webfonts.
      # Wrapper lives in $ROOT so any `<image href="...">` inside the SVG
      # resolves relative to the kit directory (e.g. screenshots-raw/*.png).
      local wrap
      wrap="$ROOT/.render-$$-$RANDOM.html"
      {
        printf '<!doctype html><html><head><meta charset="utf-8">%s' "$FONTS_LINK"
        printf '<style>html,body{margin:0;padding:0;background:transparent;width:%dpx;height:%dpx;overflow:hidden}svg{display:block;width:%dpx;height:%dpx}</style>' "$w" "$h" "$w" "$h"
        printf '</head><body>'
        # Strip XML prolog if present, then inline the SVG element.
        sed -e '1{/<?xml/d;}' "$ROOT/$src"
        printf '</body></html>'
      } > "$wrap"

      "$CHROME" --headless --disable-gpu --no-sandbox \
        --default-background-color=00000000 \
        --hide-scrollbars \
        --virtual-time-budget=4000 \
        --window-size="${w},${h}" \
        --screenshot="$OUT/$dst" \
        "file://$wrap" >/dev/null 2>&1
      rm -f "$wrap"
      ;;
  esac
  printf "  %s  →  %s  (%dx%d)\n" "$src" "$dst" "$w" "$h"
}

echo "Rendering Play Store art kit to PNG via $RENDER..."

# Listing assets
render icon-512.svg              512  512  icon-512.png
render feature-graphic.svg       1024 500  feature-graphic.png

# Screenshots — framed marketing crops over the real device captures in
# screenshots-raw/. Five panels, one per primary view of the app.
render screenshot-1-home.svg         1080 1920 screenshot-1.png
render screenshot-2-map.svg          1080 1920 screenshot-2.png
render screenshot-3-pelerinaje.svg   1080 1920 screenshot-3.png
render screenshot-4-cum-ajungi.svg   1080 1920 screenshot-4.png
render screenshot-5-feriboturi.svg   1080 1920 screenshot-5.png

# Adaptive icon layers (108dp = 432px at xxxhdpi)
render adaptive-foreground.svg   432 432  adaptive-foreground.png
render adaptive-background.svg   432 432  adaptive-background.png
render adaptive-monochrome.svg   432 432  adaptive-monochrome.png

# Legacy launcher mipmaps (5 densities)
render icon-512.svg              48   48   ic_launcher-mdpi.png
render icon-512.svg              72   72   ic_launcher-hdpi.png
render icon-512.svg              96   96   ic_launcher-xhdpi.png
render icon-512.svg              144  144  ic_launcher-xxhdpi.png
render icon-512.svg              192  192  ic_launcher-xxxhdpi.png

# Notification glyph (24dp at all densities)
render notification-icon.svg     24   24   ic_stat_notify-mdpi.png
render notification-icon.svg     36   36   ic_stat_notify-hdpi.png
render notification-icon.svg     48   48   ic_stat_notify-xhdpi.png
render notification-icon.svg     72   72   ic_stat_notify-xxhdpi.png
render notification-icon.svg     96   96   ic_stat_notify-xxxhdpi.png

# Splash (single square; Capacitor center-crops)
render splash-background.svg     2732 2732 splash.png

echo "Done. Output in: $OUT"
