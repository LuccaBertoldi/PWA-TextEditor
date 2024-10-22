const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

// Page caching strategy
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
    }),
  ],
});

// Warm the cache for essential pages
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Cache HTML pages
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Asset caching strategy
const assetCache = new StaleWhileRevalidate({
  cacheName: 'asset-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxEntries: 50, // Limit cache to 50 items
      maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
    }),
  ],
});

// Register route for caching assets
registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style' || request.destination === 'image',
  assetCache
);

// Optionally, implement offline fallback for specific requests
// Uncomment and modify if you want to add offline fallback
// offlineFallback({
//   pageFallback: '/offline.html',
// });
