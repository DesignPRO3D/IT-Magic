// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open('it-magic').then(function(cache) {
//       cache.addAll([
//         '/',
//         '/index.html',
//         '/css/style.css',
//         '/js/app.js'
//       ])
//     })
//   );
//   return self.clients.claim();
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(res) {
//         return res;
//       })
//   );
// });

self.addEventListener('install', function(event) {
  console.log('[SW] installing', event);
  event.waitUntil(caches.open('it-static').then(function(cache){
    console.log('[SW] Precatching App Shell');
    // cache.add('/');
    // cache.add('/index.html');
    // cache.add('/js/app.js');
    cache.addAll([
      '/',
      '/index.html',
      '/js/app.js',
      'https://cdn.jsdelivr.net/npm/vue',
      'https://code.jquery.com/jquery-3.4.1.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
      'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0',
      '/css/bootstrap.css',
      '/css/style.css',
      '/icons/favicon.png',
      '/icons/icon-384x384.png',
      '/img/buildpro.png',
      '/img/cnc1.png',
      '/img/cnc2.png',
      '/img/cnc3.png',
      '/img/cnc4.png',
      '/img/panel.png',
      '/img/kite.png',
      '/img/z1.jpg',
      '/img/kmgrantstairs.jpg',
      '/img/scrolls.png',
      '/img/speedindex.png',
      '/img/patternCalculator.jpg'
    ]);
  }));
});

self.addEventListener('activate', function(event) {
  console.log('[SW] activating', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    if (response) {
      return response;
    } else {
      return fetch(event.request)
    }
  }));
});