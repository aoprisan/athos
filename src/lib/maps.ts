import { Capacitor } from '@capacitor/core';

/** Open the platform's default mapping app at the given coordinates.
    - iOS: Apple Maps universal link
    - Android: geo: URI, which triggers the system's map-app chooser
    - Web: Google Maps */
export function openInMaps(lat: number, lng: number, label: string): void {
  const platform = Capacitor.getPlatform();
  const q = encodeURIComponent(label);

  if (platform === 'ios') {
    const url = `https://maps.apple.com/?q=${q}&ll=${lat},${lng}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    return;
  }

  if (platform === 'android') {
    // geo: URI is intercepted by Capacitor's WebView and dispatched as an
    // Intent, letting the user pick among installed map apps.
    const url = `geo:${lat},${lng}?q=${lat},${lng}(${q})`;
    window.open(url, '_blank', 'noopener,noreferrer');
    return;
  }

  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
