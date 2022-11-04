self.addEventListener("install", (e) => {
  // console.log("installing");
  e.waitUntil(
    (async () => {
      const cache = await caches.open("v1");
      await cache.addAll([
        ".",
        "./app.webmanifest",
        "./assets/cashewkern_intro.wav",
        "./assets/cashewkern_no.wav",
        "./assets/cashewkern_yes.wav",
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

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const cached = await caches.match(e.request);
      if (cached) {
        // console.log(`${e.request.url}: returning from cache`);
        return cached;
      } else {
        // console.log(`${e.request.url}: not cached, fetching`);
        return fetch(e.request);
      }
    })()
  );
});
