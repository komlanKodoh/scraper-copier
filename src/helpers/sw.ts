self.addEventListener("install", () => {
  console.log(
    "I am the service worker, just here to say that I have been successfully installed"
  );
});

self.addEventListener("fetch", function (event: any) {

  const url = event.request.url;

  if (
    !/^https*:\/\/localhost:[0-9]/.test(url) ||
    /^https*:\/\/localhost:[0-9]+\/(helpers|\?url)/.test(url)
  ) {
    // console.log("these request were served normally", url);
    return 
  }

  const handler = async () => {
    const encodedURL = encodeURIComponent(url);
    const response = await fetch(`/?url=${encodedURL}`);
    return response;
  };

  event.respondWith(handler());
});
