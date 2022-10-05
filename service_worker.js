self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open("v1")
      .then((cache) =>
        cache.addAll([
          ".",
          "./index.html",
          "./app.webmanifest",
          "./icon.svg",
          "./icon_maskable.svg",
          "./icon_apple.png",
          "./index.js",
          "./service_worker.js",
        ])
      )
  );
});

self.addEventListener("fetch", (e) => {
  caches.match(e.request).then((response) => response || fetch(e.request));
});
