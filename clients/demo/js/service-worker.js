const CACHE_NAME = 'resort-guide-v2';
const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';
const OFFLINE_PAGE = '/offline.html';

// Assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/css/guide-pages.min.css',
    '/js/image-optimizer.js',
    '/js/image-loader.js',
    '/js/modal.js',
    OFFLINE_PAGE,
    '/css/guide-pages.css'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE)
                .then(cache => cache.addAll(STATIC_ASSETS)),
            caches.open(DYNAMIC_CACHE)
        ])
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => {
                    return !([STATIC_CACHE, DYNAMIC_CACHE].includes(key));
                }).map(key => caches.delete(key))
            );
        })
    );
});

// Fetch event with network-first strategy for images
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Handle image requests
    if (request.destination === 'image') {
        event.respondWith(handleImageRequest(request));
        return;
    }

    // Handle other requests
    event.respondWith(
        caches.match(request)
            .then(cachedResponse => {
                return cachedResponse || fetch(request).then(response => {
                    return caches.open(DYNAMIC_CACHE).then(cache => {
                        cache.put(request, response.clone());
                        return response;
                    });
                });
            })
            .catch(() => {
                if (request.mode === 'navigate') {
                    return caches.match(OFFLINE_PAGE);
                }
            })
    );
});

async function handleImageRequest(request) {
    try {
        // Try network first
        const networkResponse = await fetch(request);
        const cache = await caches.open(DYNAMIC_CACHE);
        cache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (error) {
        // Fall back to cache
        const cachedResponse = await caches.match(request);
        return cachedResponse || new Response('Image not available', { status: 404 });
    }
} 