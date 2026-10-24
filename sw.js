/*
 * Mucify Service Worker (sw.js)
 * Provides offline caching, instant app launching, and Background Sync API support.
 */

const CACHE_NAME = 'mucify-cache-v1.1.0';

const PRECACHE_ASSETS = [
    './',
    './index.html',
    './styles.css',
    './app2.js',
    './state-sync.js',
    './manifest.webmanifest',
    './manifest.json',
    './assets/icons/icon-192.png',
    './assets/icons/icon-512.png',
    './assets/icons/icon-512-maskable.png',
    './assets/icons/apple-touch-icon.png',
    './assets/icons/favicon-32.png'
];

// IndexedDB details shared with the client for Background Sync
const SYNC_DB_NAME = 'mucify_sync_db';
const SYNC_DB_VERSION = 1;
const SYNC_STORE_NAME = 'pending_requests';
const SYNC_TAG_NAME = 'sync-pending-requests';

// ============================================================================
// 1. Install Event: Precache core shell assets
// ============================================================================
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(PRECACHE_ASSETS).catch((err) => {
                console.warn('[SW] Precache asset fetch warning:', err);
            });
        }).then(() => self.skipWaiting())
    );
});

// ============================================================================
// 2. Activate Event: Clean up outdated caches & claim clients
// ============================================================================
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        console.log('[SW] Purging outdated cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// ============================================================================
// 3. Fetch Event: Routing & Caching Strategies
// ============================================================================
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // 1. Audio and Range requests: bypass cache to preserve native streaming
    if (request.headers.get('range') ||
        url.pathname.endsWith('.mp3') ||
        url.pathname.endsWith('.m4a') ||
        url.pathname.endsWith('.wav') ||
        url.pathname.includes('/songs/') ||
        url.hostname.includes('cloudinary.com')) {
        return;
    }

    // Never cache mutable API modification requests (POST, PUT, DELETE)
    if (request.method !== 'GET') {
        return;
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

// ============================================================================
// 4. Background Sync API: Replay pending network requests to backend
// ============================================================================
self.addEventListener('sync', (event) => {
    if (event.tag === SYNC_TAG_NAME) {
        console.log('[SW] Background sync event triggered for:', event.tag);
        event.waitUntil(processPendingSyncRequests());
    }
});

/**
 * Reads pending network requests from IndexedDB and re-dispatches them to the Flask backend.
 */
async function processPendingSyncRequests() {
    const db = await openWorkerDatabase();
    const pendingList = await getPendingRequests(db);

    if (!pendingList || pendingList.length === 0) {
        console.log('[SW] No pending sync requests in queue.');
        return;
    }

    console.log(`[SW] Replaying ${pendingList.length} queued network request(s)...`);

    for (const item of pendingList) {
        try {
            const response = await fetch(item.url, {
                method: item.method || 'POST',
                headers: item.headers || {
                    'Content-Type': 'application/json'
                },
                body: typeof item.data === 'string' ? item.data : JSON.stringify(item.data)
            });

            if (response.ok) {
                await deletePendingRequest(db, item.id);
                console.log(`[SW] Successfully synced pending request #${item.id} to ${item.url}`);
            } else {
                console.warn(`[SW] Backend returned ${response.status} for request #${item.id}. Keeping in queue.`);
                throw new Error(`Sync failed with HTTP ${response.status}`);
            }
        } catch (err) {
            console.error(`[SW] Network failure during background sync for #${item.id}:`, err);
            // Re-throw so the browser retries the sync when conditions allow
            throw err;
        }
    }
}

// --- IndexedDB Worker Helpers ---
function openWorkerDatabase() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(SYNC_DB_NAME, SYNC_DB_VERSION);
        req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(SYNC_STORE_NAME)) {
                db.createObjectStore(SYNC_STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

function getPendingRequests(db) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(SYNC_STORE_NAME, 'readonly');
        const store = tx.objectStore(SYNC_STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
    });
}

function deletePendingRequest(db, id) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(SYNC_STORE_NAME, 'readwrite');
        const store = tx.objectStore(SYNC_STORE_NAME);
        const req = store.delete(id);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}
