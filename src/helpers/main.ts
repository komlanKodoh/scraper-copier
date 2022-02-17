window.addEventListener("click", (e: any) => {

  const linksClicked = e.path.filter(
    (element: HTMLElement) => element.nodeName === "A"
  );
  
  if (linksClicked.length > 0) {
    // e.stopImmediatePropagation();

    const currentURL = new URL(window.location.href);
    let clickedLink;

    for (const link of linksClicked) {
      if (link.href) clickedLink = link;
    }

    
    if (/^https*:\/\/localhost:[0-9]+/.test(clickedLink?.href || "")) {
      console.log("same origin ", clickedLink.href)
      window.location.href = clickedLink.href;
      return;
    }
    e.preventDefault()
    console.log("trying to run away ", clickedLink.href )

    window.location.href = `${currentURL.origin}/?url=${clickedLink.href}&updateDomain=true`;
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/myWorker.js", { scope: "/" }).then(
    function (registration) {
      console.log("Service worker registration succeeded:");
    },
    (error) => {
      console.log("Service worker registration failed:", error);
    }
  );
} else {
  console.log("Service workers are not supported.");
}
