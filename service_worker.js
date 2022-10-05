self.addEventListener("install", (e) => {
  // console.log("installing");
  e.waitUntil(
    (async () => {
      const cache = await caches.open("v1");
      await cache.addAll([
        ".",
        "./index.html",
        "./app.webmanifest",
        "./icon.svg",
        "./icon_maskable.svg",
        "./icon_apple.png",
        "./index.css",
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
