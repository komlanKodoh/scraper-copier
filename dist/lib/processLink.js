"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const postProcess = (processedLink) => {
    // removes trailing "/" and location hash from a url string
    return processedLink.replace(/(\/*#.*|\/$)/g, "");
};
/**
 * Processes links found in remote html page and adds to array add_to passed as third argument
 *
 * @param link link to process
 * @param remoteUrl url source where the link was found
 * @param add_to array of string where the link must be added
 * @param authorize regular expression list of domains that can be accepted; Note: Relative path are accepted by default
 * @returns a string with processed url
 */
const processLink = (link, remoteUrl, add_to, authorize = []) => {
    if (!link ||
        link[0] === "#" ||
        link.slice(0, 4) === "tel:" ||
        link.slice(0, 5) === "data:" ||
        link.slice(0, 7) === "mailto:")
        return;
    let processedRemoteURL = remoteUrl;
    if (link.slice(0, 2) === "//")
        link = "https:" + link;
    if (link.slice(0, 5) === "http:" || link.slice(0, 6) === "https:") {
        const linkUrl = new URL(link);
        if (authorize.some((domainRegex) => domainRegex.test(linkUrl.hostname))) {
            // link = linkUrl.pathname + linkUrl.search;
            // processedRemoteURL = linkUrl;
            add_to.push(postProcess(link));
            return;
        }
        else
            return;
    }
    let href = processedRemoteURL.host +
        processedRemoteURL.pathname.replace(/\.[a-zA-Z]+$/g, "");
    if (link[0] == "/") {
        const _link = processedRemoteURL.origin + link;
        add_to.push(postProcess(_link));
    }
    else {
        if (processedRemoteURL.pathname === "/")
            href += "index.html";
        const _link = processedRemoteURL.protocol + "//" + path_1.default.join(href, "../", link);
        add_to.push(postProcess(_link));
    }
    return;
};
exports.default = processLink;
//# sourceMappingURL=processLink.js.map