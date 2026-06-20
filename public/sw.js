const CACHE = "wobic-v1";
const STATIC = "wobic-static-v1";
const IMAGES = "wobic-images-v1";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      c.addAll(["/", "/manifest.json", "/icons/icon-192.png", "/icons/icon-512.png"])
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE && k !== STATIC && k !== IMAGES).map(caches.delete))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  if (url.pathname.startsWith("/_next/static/")) {
    e.respondWith(cacheFirst(e.request, STATIC));
  } else if (/\.(png|jpg|jpeg|gif|svg|webp|avif|ico|woff2?)$/.test(url.pathname)) {
    e.respondWith(cacheFirst(e.request, IMAGES));
  } else if (e.request.mode === "navigate") {
    e.respondWith(networkFirst(e.request, "/"));
  } else {
    e.respondWith(networkFirst(e.request));
  }
});

async function cacheFirst(req, cacheName) {
  const hit = await caches.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) {
    const cache = await caches.open(cacheName);
    cache.put(req, res.clone());
  }
  return res;
}

async function networkFirst(req, fallbackUrl) {
  try {
    const res = await fetch(req);
    if (res.ok) {
      const cache = await caches.open(CACHE);
      cache.put(req, res.clone());
    }
    return res;
  } catch {
    const cached = await caches.match(req);
    if (cached) return cached;
    if (fallbackUrl) return caches.match(fallbackUrl);
    return new Response("Offline", { status: 503 });
  }
}
