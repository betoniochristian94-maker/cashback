const cacheName = "cashbacker-cache-v1";
const assetsToCache = [
  "./",
  "./index.html",
  "./app.js",
  "./style.css",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// INSTALL
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assetsToCache))
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// FETCH
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(res => res || fetch(event.request).catch(() => caches.match("./index.html")))
  );
});
