"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const postProcess = (processedLink) => {
    return processedLink.replace(/(\/*#.*|\/$)/g, "");
};
const processLink = (link, url, add_to, authorize = []) => {
    if (!link ||
        link[0] === "#" ||
        link.slice(0, 4) === "tel:" ||
        link.slice(0, 5) === "data:" ||
        link.slice(0, 7) === "mailto:")
        return;
    let processedURL = url;
    if (link.slice(0, 2) === "//")
        link = "https:" + link;
    if (link.slice(0, 5) === "http:" || link.slice(0, 6) === "https:") {
        const linkUrl = new URL(link);
        if (authorize.some((domainRegex) => domainRegex.test(linkUrl.hostname))) {
            link = path_1.default.join(linkUrl.pathname, linkUrl.search);
            processedURL = linkUrl;
        }
        else
            return;
    }
    const href = processedURL.protocol + "//" + processedURL.hostname + processedURL.pathname.replace(/\.[a-zA-Z]+$/g, "");
    if (link.length >= 185)
        return;
    if (link[0] == ".") {
        const _link = href + link.slice(1);
        add_to.push(postProcess(_link));
    }
    else if (link[0] == "/") {
        const _link = processedURL.origin + link;
        add_to.push(postProcess(_link));
    }
    else {
        const _link = href + "/" + link;
        add_to.push(postProcess(_link));
    }
    return;
};
exports.default = processLink;
//# sourceMappingURL=processLink.js.map