const CACHE_NAME = 'petrovalvulas-v1';
// Liste EXATAMENTE os nomes dos arquivos que você tem no GitHub
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './Petrovalvula2026.png'
];

// Instala o Service Worker e guarda os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Ativa o Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Responde mesmo quando estiver sem internet (Offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
