const currentCacheName = "v2";

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
      ]);
    })()
  );
});

self.addEventListener("activate", (e) => {
  console.log("[sw] activating");
  e.waitUntil(
    (async () => {
      const names = await caches.keys();
      for (const name of names) {
        if (name !== currentCacheName) {
          caches.delete(name);
        }
      }
    })()
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const cached = await caches.match(e.request);
      if (cached) {
        console.log(`[sw] ${e.request.url}: returning from cache`);
        return cached;
      } else {
        console.log(`[sw] ${e.request.url}: not cached, fetching`);
        return fetch(e.request);
      }
    })()
  );
});
