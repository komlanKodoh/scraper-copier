"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
self.addEventListener("install", () => {
    console.log("I am the service worker, just here to say that I have been successfully installed");
});
self.addEventListener("fetch", function (event) {
    const url = event.request.url;
    if (/^https*:\/\/localhost:[0-9]+\/(helpers|\?url)/.test(url)) {
        // console.log("these request were served normally", url);
        return;
    }
    const handler = () => __awaiter(this, void 0, void 0, function* () {
        const encodedURL = encodeURIComponent(url);
        const response = yield fetch(`/?url=${encodedURL}`);
        return response;
    });
    event.respondWith(handler());
});
//# sourceMappingURL=sw.js.map