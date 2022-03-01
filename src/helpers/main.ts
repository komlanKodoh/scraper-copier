// Domain Updater;

declare interface Window {
  __current__domain__name: string;
}

fetch(`/update-domain?newDomain=${window.__current__domain__name}`, {
  method: "GET",
});

fetch("/__domain__of__interest").then((res) =>
  res.json().then((json) => console.log(json))
);
console.log("I am trying to update the current domain");

// Domain Popup Box;

setTimeout(() => {
  const body = document.body;

  const domainShower = document.createElement("div");

  domainShower.innerHTML = `
  <div style="position:fixed; top: 0; left: 0;">
    The current domain is ${window.__current__domain__name}
  </div>
  `;

  console.log(body);
  console.log(domainShower);
  body.appendChild(domainShower);
}, 2000);

//
window.addEventListener("click", (e: any) => {
  if (!e.target.href) return;
  // prevent routing if the element being clicked has a href prop.
  e.preventDefault();

  const currentOrigin = window.__current__domain__name;
  const nextOrigin = new URL(e.target.href).origin;

  const linkClicked = e.target;

  if (new RegExp(currentOrigin, "i").test(nextOrigin)) {
    console.log("same origin ", linkClicked.href);
    window.location.href = `${window.location.origin}${
      new URL(linkClicked.href).pathname
    }`;
    return;
  }

  window.location.href = e.target.href;
});

if ("serviceWorker" in navigator) {
  // Register service worker to act as proxy between request and servers

  navigator.serviceWorker.register("/__my_worker__.js", { scope: "/" }).then(
    function (registration) {
      console.log("Service worker registration succeeded:");
    },
    (error) => {
      console.log("Service worker registration failed:", error);
    }
  );
} else console.log("Service workers are not supported.");

// overwrite of origin pushState to emit locationChange event;
history.pushState = ((originPushState: History["pushState"]) =>
  function pushState(this: History, ...arg: Parameters<History["pushState"]>) {
    var ret = originPushState.apply(this, arg);
    window.dispatchEvent(new Event("pushstate"));
    window.dispatchEvent(new Event("locationChange"));
    return ret;
  })(history.pushState);

// overwrite of origin replaceState to emit locationChange event;
history.replaceState = ((originalReplaceState: History["replaceState"]) =>
  function replaceState(
    this: History,
    ...arg: Parameters<History["replaceState"]>
  ) {
    var ret = originalReplaceState.apply(this, arg);
    window.dispatchEvent(new Event("replacestate"));
    window.dispatchEvent(new Event("locationChange"));
    return ret;
  })(history.replaceState);

// overwrite of origin replaceState to emit locationChange event;
window.addEventListener("popstate", () => {
  window.dispatchEvent(new Event("locationChange"));
});
