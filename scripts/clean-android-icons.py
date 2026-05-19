#!/usr/bin/env python3
"""
Inverse of scripts/generate-android-icons.py — remove every file the
generator wrote, leaving the source SVG kit in playstore/ untouched.

After this runs, the next `npm run build:android` will fail to find launcher
resources until you re-run `generate-android-icons.py` (or until
`npx cap sync android` restores Capacitor's default icons).

Flags:
  --all        Also remove the playstore/png/ rendered output from
               playstore/export.sh.
  --dry-run    Print what would be removed without deleting.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
RES = REPO / "android" / "app" / "src" / "main" / "res"
BUILD_OUT = REPO / "build" / "icons"
KIT_PNG = REPO / "playstore" / "png"

# Mirror of the density tables in generate-android-icons.py.
ADAPTIVE_FOLDERS = [
    "mipmap-mdpi", "mipmap-hdpi", "mipmap-xhdpi",
    "mipmap-xxhdpi", "mipmap-xxxhdpi",
]
ADAPTIVE_FILES = [
    "ic_launcher_foreground.png",
    "ic_launcher_background.png",
    "ic_launcher_monochrome.png",
    "ic_launcher.png",
    "ic_launcher_round.png",
]

ANYDPI_FOLDER = "mipmap-anydpi-v26"
ANYDPI_FILES = ["ic_launcher.xml", "ic_launcher_round.xml"]

SPLASH_FOLDERS = [
    "drawable",
    "drawable-port-mdpi", "drawable-port-hdpi", "drawable-port-xhdpi",
    "drawable-port-xxhdpi", "drawable-port-xxxhdpi",
    "drawable-land-mdpi", "drawable-land-hdpi", "drawable-land-xhdpi",
    "drawable-land-xxhdpi", "drawable-land-xxxhdpi",
]

NOTIFY_FOLDERS = [
    "drawable-mdpi", "drawable-hdpi", "drawable-xhdpi",
    "drawable-xxhdpi", "drawable-xxxhdpi",
]

BUILD_OUT_FILES = [
    "ic_launcher_play_store_1024.png",
    "ic_launcher_play_store_512.png",
]


def remove(path: Path, dry_run: bool, removed: list[Path]):
    if not path.exists():
        return
    if dry_run:
        print(f"  would remove  {path.relative_to(REPO)}")
        removed.append(path)
        return
    if path.is_dir():
        # Only remove a directory when it's a render-output dir, never the
        # Android res/ directory itself.
        import shutil
        shutil.rmtree(path)
    else:
        path.unlink()
    print(f"  removed       {path.relative_to(REPO)}")
    removed.append(path)


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--all", action="store_true",
                   help="Also remove playstore/png/ (rendered output from export.sh).")
    p.add_argument("--dry-run", action="store_true",
                   help="Print actions without removing anything.")
    args = p.parse_args()

    if not RES.exists() and not BUILD_OUT.exists() and not KIT_PNG.exists():
        print("Nothing to clean — no android/, build/icons/, or playstore/png/ found.")
        sys.exit(0)

    removed: list[Path] = []

    if RES.exists():
        print("==> Adaptive + legacy launcher icons")
        for folder in ADAPTIVE_FOLDERS:
            for name in ADAPTIVE_FILES:
                remove(RES / folder / name, args.dry_run, removed)

        print("==> Adaptive-icon XML (v26+)")
        for name in ANYDPI_FILES:
            remove(RES / ANYDPI_FOLDER / name, args.dry_run, removed)

        print("==> Splash drawables")
        for folder in SPLASH_FOLDERS:
            remove(RES / folder / "splash.png", args.dry_run, removed)

        print("==> Notification glyphs")
        for folder in NOTIFY_FOLDERS:
            remove(RES / folder / "ic_stat_notify.png", args.dry_run, removed)
    else:
        print(f"(skipping res/ — {RES.relative_to(REPO)} does not exist)")

    if BUILD_OUT.exists():
        print("==> Reference renders (build/icons/)")
        for name in BUILD_OUT_FILES:
            remove(BUILD_OUT / name, args.dry_run, removed)
        # Remove the build/icons/ dir itself if now empty.
        if not args.dry_run and BUILD_OUT.exists() and not any(BUILD_OUT.iterdir()):
            BUILD_OUT.rmdir()
            print(f"  removed       {BUILD_OUT.relative_to(REPO)}/  (empty)")

    if args.all and KIT_PNG.exists():
        print("==> playstore/png/ rendered output (--all)")
        remove(KIT_PNG, args.dry_run, removed)

    print()
    verb = "would remove" if args.dry_run else "removed"
    print(f"{verb} {len(removed)} item(s).")
    if not args.dry_run and removed:
        print("Re-run scripts/generate-android-icons.py to reinstall.")


if __name__ == "__main__":
    main()
