/**
 * state-sync.js - Mucify State Persistence & Background Sync Manager
 * 
 * 1. State Persistence: Captures UI state, active inputs, active view, and playback
 *    to localStorage on 'visibilitychange' (hidden) and 'beforeunload'.
 * 2. State Restoration: Restores complete dynamic state on 'DOMContentLoaded'.
 * 3. Background Sync: Queues pending backend requests into IndexedDB and triggers
 *    Service Worker Background Sync with automatic offline fallbacks.
 */

(function () {
    'use strict';

    const STATE_KEY = 'mucify_app_state_v1';
    const SYNC_DB_NAME = 'mucify_sync_db';
    const SYNC_DB_VERSION = 1;
    const SYNC_STORE_NAME = 'pending_requests';
    const SYNC_TAG_NAME = 'sync-pending-requests';

    // ========================================================================
    // 1. STATE PERSISTENCE (localStorage)
    // ========================================================================

    /**
     * Captures dynamic state across the entire app
     */
    function captureAppState() {
        // 1. Capture dynamic form inputs (search bars, filter inputs, toggles)
        const inputsData = {};
        document.querySelectorAll('input, textarea, select').forEach((element) => {
            const key = element.id || element.name;
            if (!key) return;

            if (element.type === 'checkbox' || element.type === 'radio') {
                inputsData[key] = element.checked;
            } else {
                inputsData[key] = element.value;
            }
        });

        // 2. Capture active navigation view & playlist
        let activeViewId = window.currentView || null;
        if (!activeViewId) {
            const activeNav = document.querySelector('.nav-item.active, [data-view].active, .mobile-nav-btn.active');
            activeViewId = activeNav ? (activeNav.getAttribute('data-view') || activeNav.id) : 'home';
        }

        const activePlaylistId = window.activePlaylistId || null;

        // 3. Capture active song / list item
        let activeSongIndex = typeof window.currentSongIndex === 'number' ? window.currentSongIndex : null;
        let activeItemId = null;
        const activeItem = document.querySelector('.song-item.active, .track-row.active, .song-card.active, .list-item.selected');
        if (activeItem) {
            activeItemId = activeItem.getAttribute('data-id') || activeItem.getAttribute('data-song-id') || activeItem.id || null;
        }

        // 4. Capture audio playback parameters
        const audio = document.getElementById('audio-player');
        const audioState = {
            currentTime: (audio && !isNaN(audio.currentTime)) ? audio.currentTime : 0,
            volume: typeof window.volume === 'number' ? window.volume : (audio ? audio.volume : 0.7),
            isMuted: Boolean(window.isMuted),
            isShuffle: Boolean(window.isShuffle),
            repeatMode: window.repeatMode || 'off'
        };

        return {
            timestamp: Date.now(),
            activeViewId: activeViewId,
            activePlaylistId: activePlaylistId,
            activeSongIndex: activeSongIndex,
            activeItemId: activeItemId,
            audioState: audioState,
            scrollPosition: {
                x: window.scrollX || window.pageXOffset || 0,
                y: window.scrollY || window.pageYOffset || 0
            },
            inputs: inputsData
        };
    }

    /**
     * Writes state safely to localStorage
     */
    function saveAppState() {
        try {
            const state = captureAppState();
            localStorage.setItem(STATE_KEY, JSON.stringify(state));
            console.log('[State] App state saved successfully at', new Date(state.timestamp).toLocaleTimeString());
        } catch (err) {
            console.warn('[State] Failed to persist state to localStorage:', err);
        }
    }

    // Modern mobile & PWA standard: visibilitychange when user backgrounds or switches apps
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            saveAppState();
        }
    });

    // Desktop standard: beforeunload when closing window/tab
    window.addEventListener('beforeunload', () => {
        saveAppState();
    });


    // ========================================================================
    // 2. STATE RESTORATION (DOMContentLoaded)
    // ========================================================================

    /**
     * Reads state from localStorage and restores the UI
     */
    function restoreAppState() {
        const raw = localStorage.getItem(STATE_KEY);
        if (!raw) return;

        try {
            const state = JSON.parse(raw);
            console.log('[State] Restoring app state:', state);

            // 1. Restore input values
            if (state.inputs) {
                Object.entries(state.inputs).forEach(([key, val]) => {
                    const el = document.getElementById(key) || document.querySelector(`[name="${key}"]`);
                    if (!el) return;

                    if (el.type === 'checkbox' || el.type === 'radio') {
                        el.checked = Boolean(val);
                    } else {
                        el.value = val;
                    }
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                });
            }

            // 2. Restore active view & playlist navigation
            if (state.activeViewId && state.activeViewId !== 'home') {
                setTimeout(() => {
                    if (typeof window.navigate === 'function') {
                        window.navigate(state.activeViewId, true, state.activePlaylistId || null);
                    } else {
                        const targetNav = document.querySelector(`[data-view="${state.activeViewId}"]`);
                        if (targetNav) targetNav.click();
                    }
                }, 50);
            }

            // 3. Restore audio player & current song
            if (state.audioState) {
                const audio = document.getElementById('audio-player');
                if (typeof state.activeSongIndex === 'number' && Array.isArray(window.songs) && window.songs[state.activeSongIndex]) {
                    setTimeout(() => {
                        if (typeof window.loadSong === 'function') {
                            window.loadSong(window.songs[state.activeSongIndex], false);
                            if (audio && state.audioState.currentTime > 0) {
                                const onMeta = () => {
                                    audio.currentTime = Math.min(state.audioState.currentTime, audio.duration || state.audioState.currentTime);
                                    audio.removeEventListener('loadedmetadata', onMeta);
                                };
                                if (audio.readyState >= 1) {
                                    audio.currentTime = state.audioState.currentTime;
                                } else {
                                    audio.addEventListener('loadedmetadata', onMeta);
                                }
                            }
                        }
                    }, 100);
                }
            }

            // 4. Restore active item highlight
            if (state.activeItemId) {
                setTimeout(() => {
                    const item = document.getElementById(state.activeItemId) ||
                        document.querySelector(`[data-id="${state.activeItemId}"]`) ||
                        document.querySelector(`[data-song-id="${state.activeItemId}"]`);
                    if (item) {
                        document.querySelectorAll('.song-item.active, .track-row.active, .song-card.active, .list-item.selected')
                            .forEach(el => el.classList.remove('active', 'selected'));
                        item.classList.add('active');
                    }
                }, 150);
            }

            // 5. Restore scroll position
            if (state.scrollPosition) {
                requestAnimationFrame(() => {
                    window.scrollTo(state.scrollPosition.x, state.scrollPosition.y);
                });
            }
        } catch (err) {
            console.warn('[State] Error parsing or restoring saved state:', err);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        restoreAppState();
    });


    // ========================================================================
    // 3. BACKGROUND SYNC API & QUEUE (IndexedDB)
    // ========================================================================

    function openSyncDB() {
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

    async function enqueuePendingRequest(url, method = 'POST', data = {}) {
        const db = await openSyncDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(SYNC_STORE_NAME, 'readwrite');
            const store = tx.objectStore(SYNC_STORE_NAME);
            const record = {
                url: url,
                method: method,
                data: data,
                timestamp: Date.now()
            };
            const req = store.add(record);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    async function requestBackgroundSync() {
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
            try {
                const reg = await navigator.serviceWorker.ready;
                await reg.sync.register(SYNC_TAG_NAME);
                console.log(`[Sync] Background sync registered for '${SYNC_TAG_NAME}'.`);
            } catch (err) {
                console.warn('[Sync] Background sync registration failed; using fallback:', err);
                flushSyncQueueDirectly();
            }
        } else {
            // Fallback for browsers without SyncManager (e.g. Safari)
            flushSyncQueueDirectly();
        }
    }

    /**
     * Sends data to backend immediately if online; queues for Background Sync if offline or failed.
     */
    async function syncDataToBackend(url, payload = {}, method = 'POST') {
        if (!navigator.onLine) {
            console.log('[Sync] Offline. Queuing request for Background Sync...');
            await enqueuePendingRequest(url, method, payload);
            await requestBackgroundSync();
            return { queued: true };
        }

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (err) {
            console.warn('[Sync] Network error. Queuing for Background Sync...', err);
            await enqueuePendingRequest(url, method, payload);
            await requestBackgroundSync();
            return { queued: true, error: err.message };
        }
    }

    /**
     * Fallback processor for browsers without native Background Sync
     */
    async function flushSyncQueueDirectly() {
        if (!navigator.onLine) {
            window.addEventListener('online', flushSyncQueueDirectly, { once: true });
            return;
        }

        try {
            const db = await openSyncDB();
            const tx = db.transaction(SYNC_STORE_NAME, 'readonly');
            const store = tx.objectStore(SYNC_STORE_NAME);
            const req = store.getAll();

            req.onsuccess = async () => {
                const items = req.result || [];
                for (const item of items) {
                    try {
                        const res = await fetch(item.url, {
                            method: item.method || 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: typeof item.data === 'string' ? item.data : JSON.stringify(item.data)
                        });
                        if (res.ok) {
                            const delTx = db.transaction(SYNC_STORE_NAME, 'readwrite');
                            delTx.objectStore(SYNC_STORE_NAME).delete(item.id);
                        }
                    } catch (e) {
                        window.addEventListener('online', flushSyncQueueDirectly, { once: true });
                        break;
                    }
                }
            };
        } catch (e) {
            console.warn('[Sync] Fallback sync error:', e);
        }
    }

    // Expose helpers globally for app usage
    window.saveAppState = saveAppState;
    window.restoreAppState = restoreAppState;
    window.syncDataToBackend = syncDataToBackend;

})();
