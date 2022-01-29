"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const logDic = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",
    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m",
};
const getStyle = (arr) => {
    let string = "";
    arr.forEach((style) => (string += logDic[style]));
    return string;
};
const color = (log, ...styles) => {
    return `${getStyle(styles)}${log} ${getStyle(["Reset"])}`;
};
const log = (fileExtension, url, data, config) => {
    const main = getStyle(config.main);
    const info = getStyle(config.info);
    console.log(`${color(`${linkedScrapped}/${allLink}`, "FgCyan")}\t${(linkedFailed && color(`Failed : ${linkedFailed}`, "FgRed")) || ""}\n${main}- File (${fileExtension}) : ${url}\n   |_ ${info}${data}\n`);
};
const info = (fileExtension, url, web_path, fileName) => {
    incrementLinkedScrapped();
    log(fileExtension, url, path_1.default.join(web_path, fileName), {
        main: ["FgWhite"],
        info: ["FgGreen"],
    });
};
const error = (fileExtension, url, data) => {
    incrementLinkedFailed();
    log(fileExtension, url, data, {
        main: ["FgWhite"],
        info: ["FgRed"],
    });
};
let linkedScrapped = 0;
let allLink = 0;
let linkedFailed = 0;
const incrementLinkedScrapped = () => {
    linkedScrapped++;
};
const incrementLinkedFailed = () => {
    linkedFailed++;
};
const incrementTotalLink = (increment) => {
    allLink += increment;
    console.log(color(`Retrieved : `, "Reset"), color(`${increment} links `, "FgYellow"), `; ${allLink - increment} ==>`, color(allLink.toString(), "FgBlue"));
};
exports.default = {
    info,
    log,
    error,
    color,
    allLink,
    incrementLinkedScrapped,
    incrementTotalLink,
};
//# sourceMappingURL=Logger.js.map