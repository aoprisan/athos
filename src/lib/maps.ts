import { Capacitor } from '@capacitor/core';

export interface MapPoint {
  lat: number;
  lng: number;
}

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

/** Open a multi-stop directions route in the platform's default mapping app.
    Apple Maps on iOS, Google Maps elsewhere (Google Maps on Android deep-links
    to the installed app via the universal `/maps/dir/` URL). */
export function openItineraryInMaps(points: MapPoint[], label?: string): void {
  // Collapse consecutive duplicates (a monastery visited across two days
  // shouldn't appear as two adjacent waypoints).
  const stops = points.filter(
    (p, i) => i === 0 || p.lat !== points[i - 1].lat || p.lng !== points[i - 1].lng,
  );
  if (stops.length === 0) return;
  if (stops.length === 1) {
    openInMaps(stops[0].lat, stops[0].lng, label ?? '');
    return;
  }

  const platform = Capacitor.getPlatform();
  const fmt = (p: MapPoint) => `${p.lat},${p.lng}`;

  if (platform === 'ios') {
    // Apple Maps supports a chain of stops via daddr=A+to:B+to:C.
    const saddr = fmt(stops[0]);
    const daddr = stops
      .slice(1)
      .map(fmt)
      .join('+to:');
    const url = `https://maps.apple.com/?saddr=${saddr}&daddr=${daddr}&dirflg=d`;
    window.open(url, '_blank', 'noopener,noreferrer');
    return;
  }

  // Google Maps universal directions URL — opens the Google Maps app on
  // Android when installed, the web app otherwise.
  const origin = fmt(stops[0]);
  const destination = fmt(stops[stops.length - 1]);
  const params = new URLSearchParams({
    api: '1',
    origin,
    destination,
    travelmode: 'driving',
  });
  if (stops.length > 2) {
    const waypoints = stops
      .slice(1, -1)
      .map(fmt)
      .join('|');
    params.set('waypoints', waypoints);
  }
  const url = `https://www.google.com/maps/dir/?${params.toString()}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
