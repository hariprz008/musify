/*
 * Mucify Service Worker
 * Provides offline caching, lightning-fast app launching, and native-grade PWA support.
 */

const CACHE_NAME = 'mucify-cache-v1.0.1';

const PRECACHE_ASSETS = [
    './',
    './index.html',
    './styles.css',
    './app2.js',
    './manifest.webmanifest',
    './manifest.json',
    './assets/icons/icon-192.png',
    './assets/icons/icon-512.png',
    './assets/icons/icon-512-maskable.png',
    './assets/icons/apple-touch-icon.png',
    './assets/icons/favicon-32.png'
];

// Install: precache core shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(PRECACHE_ASSETS).catch((err) => {
                console.warn('[SW] Precache asset fetch issue:', err);
            });
        }).then(() => self.skipWaiting())
    );
});

// Activate: clean up outdated caches & claim clients
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // 1. Audio and Range requests: bypass cache or pass through to preserve native media streaming
    if (request.headers.get('range') ||
        url.pathname.endsWith('.mp3') ||
        url.pathname.endsWith('.m4a') ||
        url.pathname.endsWith('.wav') ||
        url.pathname.includes('/songs/')) {
        return; // Handled directly by native browser streaming
    }

    // 2. Navigation requests (HTML documents): Network-first with cache fallback
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const copy = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                    }
                    return networkResponse;
                })
                .catch(() => {
                    return caches.match('./index.html') || caches.match(request);
                })
        );
        return;
    }

    // 3. Static assets (JS, CSS, fonts, images, icons): Stale-while-revalidate
    if (request.method === 'GET' && (
        url.origin === self.location.origin ||
        url.hostname.includes('fonts.googleapis.com') ||
        url.hostname.includes('fonts.gstatic.com') ||
        url.hostname.includes('unpkg.com')
    )) {
        event.respondWith(
            caches.match(request).then((cachedResponse) => {
                const fetchPromise = fetch(request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const copy = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                    }
                    return networkResponse;
                }).catch(() => cachedResponse);

                return cachedResponse || fetchPromise;
            })
        );
    }
});
