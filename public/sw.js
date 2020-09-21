const cacheName = 'cache-v1';

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
  'index.js',
  'mstile-150x150.png',
  'safari-pinned-tab.svg',
  'site.webmanifest',
];

self.addEventListener("install", event => {
  console.log('Service Worker install event');
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      console.log("Service Worker: Caching files");
      return cache.addAll(cacheResources );
    })
    .catch(err => console.log(err))
    // .then(() => self.skipWaiting())
  );
});

self.addEventListener("fetch", event => {
  console.log('Sw: fetching');
  event.respondWith(caches.match(event.request)
  .then(cachedResponse => {
    return cachedResponse || fetch(event.request)
  }))
})

// self.addEventListener("activate", (e) => {
//   console.log('Service Worker: Activated');

//   e.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(cacheNames.map((cache) => {
//           if(cache !== cacheName){
//             console.log("service Worker : clearing old caches");
//             return caches.delete(cache);
//           }
//         })
//       );
//     })
//   );
// });

