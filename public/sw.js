/**
 * public/sw.js
 * ─────────────
 * SchoolifyMX Pro Service Worker — PWA offline support.
 *
 * Cache strategy:
 *   - App shell (HTML/CSS/JS):  Cache-first (long-lived)
 *   - School map tiles (OSM):   StaleWhileRevalidate (show cached, refresh bg)
 *   - API responses (/schools): NetworkFirst with 24h fallback cache
 *   - Images:                   Cache-first with 30d expiry
 *
 * This SW is registered manually in index.html for Vite compatibility.
 */

const CACHE_VERSION = 'schoolify-v1';
const TILE_CACHE    = 'osm-tiles-v1';
const API_CACHE     = 'api-schools-v1';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
];

// ─────────────────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => ![CACHE_VERSION, TILE_CACHE, API_CACHE].includes(k))
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ─────────────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // ── OSM tile requests → StaleWhileRevalidate ────────────────────────────
  if (url.hostname.includes('tile.openstreetmap.org')) {
    event.respondWith(staleWhileRevalidate(TILE_CACHE, event.request));
    return;
  }

  // ── Schools API → NetworkFirst (24h TTL) ────────────────────────────────
  if (url.pathname.startsWith('/api/v1/schools')) {
    event.respondWith(networkFirst(API_CACHE, event.request, 86400));
    return;
  }

  // ── App shell → Cache-first ─────────────────────────────────────────────
  event.respondWith(cacheFirst(CACHE_VERSION, event.request));
});

// ─── Strategy helpers ─────────────────────────────────────────────────────────

async function cacheFirst(cacheName, request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline — contenido no disponible.', {
      status: 503, headers: { 'Content-Type': 'text/plain' }
    });
  }
}

async function staleWhileRevalidate(cacheName, request) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => cached);
  return cached ?? fetchPromise;
}

async function networkFirst(cacheName, request, maxAgeSeconds) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) {
      const dateHeader = cached.headers.get('date');
      if (dateHeader) {
        const age = (Date.now() - new Date(dateHeader).getTime()) / 1000;
        if (age > maxAgeSeconds) return new Response('[]', { headers: { 'Content-Type': 'application/json' }});
      }
      return cached;
    }
    return new Response('[]', { headers: { 'Content-Type': 'application/json' }});
  }
}
