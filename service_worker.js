self.addEventListener("install", (e) => {
  // console.log("installing");
  e.waitUntil(
    (async () => {
      const cache = await caches.open("v1");
      await cache.addAll([
        ".",
        "./index.html",
        "./icon.png",
        "./icon_maskable.png",
        "./app.webmanifest",
        "./icon.svg",
        "./icon_maskable.svg",
        "./index.css",
        "./index.js",
        "./never.flac",
        "./cashewkerne.jpg",
        "./cashewkern_intro.wav",
        "./cashewkern_yes.wav",
        "./cashewkern_no.wav",
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
