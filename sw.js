const CACHE_NAME = 'globalfoot-v2';
const API_CACHE_NAME = 'api-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/front-end/style.css',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  // Cache estratégico para APIs
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      caches.open(API_CACHE_NAME).then(cache => {
        return fetch(event.request)
          .then(response => {
            // Armazena apenas respostas válidas
            if (response.status === 200) {
              cache.put(event.request.url, response.clone());
            }
            return response;
          })
          .catch(() => {
            // Fallback para cache quando offline
            return cache.match(event.request);
          });
      })
    );
  } else {
    // Estratégia Cache-First para assets
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => cachedResponse || fetch(event.request))
    );
  }
});

// Limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME && key !== API_CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});