"use strict";
//@ts-ignore
document.addEventListener("DOMContentLoaded", function () {
    const isHttpLink = (link) => {
        return /^https*:\/\//.test(link);
    };
    const routeToLocalhost = () => {
        const links = document.getElementsByTagName("a");
        for (const link of links) {
            link.addEventListener("click", (e) => {
                const target = e.target;
                if (!(target === null || target === void 0 ? void 0 : target.href))
                    return;
                if (!isHttpLink(target.href))
                    return;
                e.preventDefault();
                window.location.href = `//${window.location.host}${new URL(target.href).pathname}`;
            });
            // link.addEventListener = () => console.log("NO one is allowed to change my listener")
        }
    };
    routeToLocalhost();
    const temp = XMLHttpRequest.prototype.open;
    //@ts-ignore
    XMLHttpRequest.prototype.open = function (method, url, boolean) {
        let originalUrl;
        let modifiedUrl;
        if (typeof url === "string")
            originalUrl = url;
        else
            originalUrl = url.href;
        if (isHttpLink(originalUrl))
            modifiedUrl = `//${window.location.hostname}/proxy?url=${url}`;
        else
            modifiedUrl = originalUrl;
        this.timeout = 2000;
        return temp.call(this, method, modifiedUrl, boolean);
    };
    window.addEventListener('locationchange', function () {
        console.log('location changed!, calling the localhost master');
        routeToLocalhost();
    });
    history.pushState = ((f) => function pushState() {
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event("pushstate"));
        window.dispatchEvent(new Event("locationchange"));
        return ret;
    })(history.pushState);
    history.replaceState = ((f) => function replaceState() {
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event("replacestate"));
        window.dispatchEvent(new Event("locationchange"));
        return ret;
    })(history.replaceState);
    window.addEventListener("popstate", () => {
        window.dispatchEvent(new Event("locationchange"));
    });
});
//# sourceMappingURL=html.js.map