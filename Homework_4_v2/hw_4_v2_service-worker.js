var CACHE_VERSION = 'myapp-v2';
var CACHE_FILES = [
    'images_v2/lightblue_v2.jpg',
    'images_v2/lightgold_v2.jpg',
    'images_v2/icon_v2_1-192.png',
    'images_v2/icon_v2_1-512.png',
    'hw_4_v2_app.js',
    'hw_4_v2_stylesheet.css',
    'hw_4_v2_index.html',
    'hw_4_v2_about_assignment.html'
];

//install service worker
self.addEventListener('install', event => {
    console.log('SW installed');
    event.waitUntil(
        caches
        .open(CACHE_VERSION)
        .then(cache => {
            console.log('SW caching files');
            cache.addAll(CACHE_FILES)
        })
        .then(() => self.skipWaiting())
    );
});

// activate service worker with event
self.addEventListener('activate', event => {
    console.log('SW activated');
    event.waitUntil(
        caches.keys().then(keyNames => {
            return Promise.all(
                keyNames.map(key => {
                    if(key !== CACHE_VERSION) {
                        console.log('SW clearing old caches');
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

//fetch event
self.addEventListener('fetch', event => {
    console.log('SW fetching');
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});