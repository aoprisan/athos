/* Athos Pilgrim service worker — hand-rolled, no Workbox.

   The Holy Mountain has patchy cell coverage. The aim of this worker is that
   once the app has been opened on a device with network, it keeps working as
   the pilgrim moves out of coverage. Strategies:

     - App shell (HTML, JS, CSS, images served from our own origin):
       stale-while-revalidate. We serve cache first for speed and refresh in
       the background. The navigation request falls back to the cached
       index.html when no network is available.

     - Wikimedia icon images and OpenStreetMap tiles: cache-first. These are
       not under our control and don't change; once cached, keep using the
       cached copy.

   Cache versioning: bump CACHE_VERSION when the SW or strategies change.
   Old caches are evicted on `activate`. */

const CACHE_VERSION = 'v2';
const APP_CACHE = `athos-app-${CACHE_VERSION}`;
const REMOTE_CACHE = `athos-remote-${CACHE_VERSION}`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(APP_CACHE);
      // Pre-cache the app shell entry point. Hashed bundle assets are picked
      // up opportunistically by the fetch handler.
      try {
        await cache.add('./');
      } catch {
        /* offline at install time — fetch handler will fill the cache later */
      }
      self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== APP_CACHE && key !== REMOTE_CACHE)
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

function isRemoteAsset(url) {
  return (
    url.hostname.endsWith('wikimedia.org') ||
    url.hostname.endsWith('tile.openstreetmap.org') ||
    url.hostname.endsWith('opentopomap.org') ||
    url.hostname.endsWith('tile.opentopomap.org')
  );
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(APP_CACHE);
  const cached = await cache.match(request);
  const networkFetch = fetch(request)
    .then((response) => {
      if (response && response.ok && request.method === 'GET') {
        cache.put(request, response.clone()).catch(() => {});
      }
      return response;
    })
    .catch(() => null);
  return cached || (await networkFetch) || Response.error();
}

async function cacheFirstRemote(request) {
  const cache = await caches.open(REMOTE_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    // Inherit the request's own mode — Leaflet fetches tiles via <img>
    // elements as no-cors, and overriding to cors strips the response the
    // image element expects, leaving the canvas blank. Opaque responses
    // are still fine to cache and re-serve as images.
    const response = await fetch(request);
    if (response && (response.ok || response.type === 'opaque')) {
      cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  } catch {
    return Response.error();
  }
}

async function navigationFallback(request) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(APP_CACHE);
      cache.put('./', response.clone()).catch(() => {});
    }
    return response;
  } catch {
    const cache = await caches.open(APP_CACHE);
    const cached = await cache.match('./');
    return cached || Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  if (request.mode === 'navigate') {
    event.respondWith(navigationFallback(request));
    return;
  }

  const url = new URL(request.url);

  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  if (isRemoteAsset(url)) {
    event.respondWith(cacheFirstRemote(request));
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
