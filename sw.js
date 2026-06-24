/* ============================================
   CRUST & CHILLY — SERVICE WORKER
   Cache-first for assets, network-first for HTML
   ============================================ */

const CACHE_VERSION = 'cc-v4.0';
const CACHE_NAME = CACHE_VERSION;

const ASSETS = [
  '/',
  '/index.html',
  '/menu.html',
  '/css/shared.css',
  '/css/home.css',
  '/css/menu.css',
  '/js/data.js',
  '/js/shared.js',
  '/js/home.js',
  '/js/menu.js',
  '/manifest.json'
];

// Install — precache
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(()=>{}))
  );
});

// Activate — clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch strategy
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Skip cross-origin (Google Maps, Fonts, WhatsApp etc.)
  if (url.origin !== location.origin) return;

  // HTML — network first
  if (req.mode === 'navigate' || req.destination === 'document') {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match('/index.html')))
    );
    return;
  }

  // CSS/JS/images — cache first
  e.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (!res || res.status !== 200) return res;
        const copy = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(req, copy));
        return res;
      });
    })
  );
});

// Message handler — force update from page
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});