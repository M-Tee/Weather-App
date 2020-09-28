const cacheName = 'cache-v2';

const cacheResources = [
  '/',
  'style.css',
  'Assets/locationMarker.svg',
  'Assets/ei_search.svg',
  'Assets/noto-v1_sun-with-face.svg',
  'android-chrome-192x192.png',
  'android-chrome-384x384.png',
  'apple-touch-icon.png',
  'browserconfig.xml',
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'index.html',
  'mstile-150x150.png',
  'safari-pinned-tab.svg',
  'site.webmanifest',
];

self.addEventListener("install", event => {
  console.log('Installing service worker...');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log("Service Worker caching files...");
        return cache.addAll(cacheResources);
      })
      // .catch(err => console.log(err))
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  console.log('Activating new service worker...');

  const cacheWhitelist = [cacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  // console.log('Sw: fetching');
  // event.respondWith(
    
  //   caches.match(event.request)
  //   .then(cachedResponse => {
  //     if(cachedResponse) {
  //       console.log('Fetching from cache...');
  //       return cachedResponse
  //     }
  //     console.log('Making a Network request..')
  //     return fetch(event.request)

  //     .then(response => {
  //       return caches.open(cacheName).then(cache => {
  //         cache.put(event.request.url, response.clone());
  //         return response;
  //       });
  //     });
  //   }).catch(err => console.log(err))
  // )
})

self.addEventListener('notificationclose', event => {
  const notification = event.notification;
  const primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});

self.addEventListener('notificationclick', event => {

  // TODO 2.8 - change the code to open a custom page

  clients.openWindow('https://google.com');
});
