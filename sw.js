const CACHE_NAME = 'trjohn-woyz-v53';
const APP_SHELL = [
  './',
  './index.html',
  './user.html',
  './demo.html',
  './firebase-config.js',
  './manifest.webmanifest?v=5',
  './icons/icon-192-v5.png',
  './icons/icon-512-v5.png',
  './icons/maskable-512-v5.png',
  './icons/apple-touch-icon-v5.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith('trjohn-woyz-') && key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    const base = new URL('./', self.location.href);
    const relativePath = url.pathname.slice(base.pathname.length);
    const page = !relativePath || relativePath === 'index' || relativePath === 'index.html'
      ? './index.html'
      : relativePath === 'user' || relativePath === 'user.html'
        ? './user.html'
        : relativePath === 'demo' || relativePath === 'demo.html' ? './demo.html' : null;
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok && page) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(page, copy));
          }
          return response;
        })
        .catch(async () => (page && await caches.match(page)) || Response.error())
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      return response;
    }))
  );
});
