"use strict";
window.addEventListener("click", (e) => {
    if (!e.target.href)
        return;
    // prevent routing if the element being clicked has a href prop.
    e.preventDefault();
    const linkClicked = e.target;
    if (/^https*:\/\/localhost:[0-9]+/.test(linkClicked.href)) {
        console.log("same origin ", linkClicked.href);
        window.location.href = linkClicked.href;
        return;
    }
    window.location.href = `${window.location.origin}/?url=${linkClicked.href}&updateDomain=true`;
});
if ("serviceWorker" in navigator) {
    // Register service worker to act as proxy between request and servers
    navigator.serviceWorker.register("/myWorker.js", { scope: "/" }).then(function (registration) {
        console.log("Service worker registration succeeded:");
    }, (error) => {
        console.log("Service worker registration failed:", error);
    });
}
else
    console.log("Service workers are not supported.");
// overwrite of origin pushState to emit locationChange event;
history.pushState = ((originPushState) => function pushState(...arg) {
    var ret = originPushState.apply(this, arg);
    window.dispatchEvent(new Event("pushstate"));
    window.dispatchEvent(new Event("locationChange"));
    return ret;
})(history.pushState);
// overwrite of origin replaceState to emit locationChange event;
history.replaceState = ((originalReplaceState) => function replaceState(...arg) {
    var ret = originalReplaceState.apply(this, arg);
    window.dispatchEvent(new Event("replacestate"));
    window.dispatchEvent(new Event("locationChange"));
    return ret;
})(history.replaceState);
// overwrite of origin replaceState to emit locationChange event;
window.addEventListener("popstate", () => {
    window.dispatchEvent(new Event("locationChange"));
});
//# sourceMappingURL=main.js.map