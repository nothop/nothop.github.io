const currentCacheName = "v3";

self.addEventListener("install", (e) => {
  console.log("[sw] installing");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(currentCacheName);
      return cache.addAll([
        ".",
        "./app.webmanifest",
        "./assets/cashewkern_intro.flac",
        "./assets/cashewkern_no.flac",
        "./assets/cashewkern_yes.flac",
        "./assets/cashewkerne.jpg",
        "./assets/icon/icon.png",
        "./assets/icon/icon.svg",
        "./assets/icon/icon_maskable.png",
        "./assets/icon/icon_maskable.svg",
        "./assets/never.flac",
        "./index.css",
        "./index.html",
        "./index.js",
        "./three-dots.css",
      ]);
    })()
  );
});

self.addEventListener("activate", (e) => {
  console.log("[sw] activating");
  e.waitUntil(
    (async () => {
      const names = await caches.keys();
      return Promise.all(
        names.map((name) =>
          name !== currentCacheName ? caches.delete(name) : undefined
        )
      );
    })()
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const cache = await caches.open(currentCacheName);
      const cachedResponse = await cache.match(e.request);
      if (cachedResponse) {
        console.log(`[sw] ${e.request.url}: returning from cache`);
        return cachedResponse;
      }
      console.log(`[sw] ${e.request.url}: not cached, fetching`);
      return fetch(e.request);
    })()
  );
});
