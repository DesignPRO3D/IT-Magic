self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('it-magic').then(function(cache) {
      cache.addAll([
        '/',
        '/index.html',
        '/css/style.css',
        '/js/app.js'
      ])
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(res) {
        return res;
      })
  );
});