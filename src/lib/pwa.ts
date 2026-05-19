/* PWA bootstrap. Registers the service worker on browsers, but skips
   registration inside Capacitor where the native shell already runs offline
   from bundled assets. */

declare global {
  interface Window {
    Capacitor?: { isNativePlatform: () => boolean };
  }
}

function isCapacitorNative(): boolean {
  try {
    return Boolean(window.Capacitor?.isNativePlatform?.());
  } catch {
    return false;
  }
}

export function registerServiceWorker(): void {
  if (typeof window === 'undefined') return;
  if (!('serviceWorker' in navigator)) return;
  if (isCapacitorNative()) return;
  if (!window.isSecureContext) return;

  // Resolve `sw.js` relative to the document base. Vite's `base` setting puts
  // assets under `/athos/` on GitHub Pages and under `./` on the mobile build.
  const baseEl = document.querySelector('base');
  const base = baseEl?.getAttribute('href') ?? './';
  const swUrl = new URL('sw.js', new URL(base, window.location.href)).toString();

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(swUrl)
      .catch((err) => {
        console.warn('[athos] service worker registration failed', err);
      });
  });
}
