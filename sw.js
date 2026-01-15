self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('cashback-cache').then(cache => cache.addAll([
      '/',
      '/index.html',
      '/manifest.json',
      '/app.js'
    ]))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
