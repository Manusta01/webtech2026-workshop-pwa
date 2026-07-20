/**
 * Service-Worker-Gerüst
 * - Aufgabe 2: registrieren (index.html) + Precache prüfen / TODOs
 * - Aufgabe 3: CACHE_NAME erhöhen, tips.json aus APP_SHELL nehmen (optional),
 *   den fetch-Handler unten durch den auskommentierten Block „Aufgabe 3“ ersetzen
 */

const CACHE_NAME = "focusboard-shell-v1";

const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./icons/icon.svg",
  "./data/tips.json",
  // TODO (Aufgabe 2): Manifest / weitere Icons nach Bedarf ergänzen
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(APP_SHELL);
      // Optional: await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
      // Optional: await self.clients.claim();
    })()
  );
});

// --- Aufgabe 2: minimaler fetch (aktiv) ---
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    (async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      return fetch(event.request);
    })()
  );
});


/* 
   Aufgabe 3: diesen Block aktivieren, den fetch-Handler von Aufgabe 2 entfernen 
   Zusätzlich: CACHE_NAME z. B. auf "focusboard-shell-v2" setzen
   und "./data/tips.json" ggf. aus APP_SHELL entfernen.
*/

/*
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (url.pathname.endsWith("/data/tips.json")) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(cacheFirst(request));
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const fresh = await fetch(request);
    cache.put(request, fresh.clone());
    return fresh;
  } catch {
    const cached = await cache.match(request);
    return cached || Response.error();
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const fresh = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, fresh.clone());
    return fresh;
  } catch {
    if (request.mode === "navigate") {
      return (await caches.match("./index.html")) || Response.error();
    }
    return Response.error();
  }
}
*/
