"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionalProcessLink = void 0;
const postProcess = (processedLink) => {
    // removes trailing "/" and location hash from a url string
    return processedLink.replace(/(\/*#.*|\/$)/g, "");
};
/**
 * Processes links found in remote html page and adds to array add_to passed as third argument
 *
 * @param link link to process
 * @param remoteUrlOrigin url source where the link was found
 * @param add_to array of string where the link must be added
 * @param authorize regular expression list of domains that can be accepted; Note: Relative path are accepted by default
 * @returns a string with processed url
 */
const processLink = (link, remoteUrlOrigin, add_to, authorize = []) => {
    if (!link ||
        link[0] === "#" ||
        link.slice(0, 4) === "tel:" ||
        link.slice(0, 5) === "data:" ||
        link.slice(0, 7) === "mailto:")
        return add_to;
    const allAuthorized = [...authorize, new RegExp(remoteUrlOrigin.hostname)];
    const _link = new URL(link, remoteUrlOrigin.href);
    if (!allAuthorized.some((domainRegex) => domainRegex.test(_link.hostname)))
        return add_to;
    add_to.push(postProcess(_link.href));
    return add_to;
};
/**
 * A modification of ProcessLink function with a more function behavior. No reliance on external array
 * @param link
 * @param remoteUrlOrigin
 * @param authorize
 * @returns
 */
const functionalProcessLink = (link, remoteUrlOrigin, authorize = [/./]) => {
    const add_to = [];
    processLink(link, remoteUrlOrigin, add_to, authorize);
    return add_to[0];
};
exports.functionalProcessLink = functionalProcessLink;
exports.default = processLink;
