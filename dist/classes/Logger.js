"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consoleColorDic = {
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
/**
 * Process array with corresponding styles and returns
 * string with all styles.
 *
 * @param arr array of string with different color styles
 * @returns returns string with all corresponding styles
 */
const getStyle = (arr) => {
    let string = "";
    arr.forEach((style) => (string += consoleColorDic[style]));
    return string;
};
/**
 * Decorates string with given styles
 *
 * @param log string to log to the console
 * @param styles list of styles to decorate the logs
 * @returns decorated strings
 */
const color = (log, ...styles) => {
    return `${getStyle(styles)}${log} ${getStyle(["Reset"])}`;
};
/**
 * Formatted log of file related process
 *
 * @param fileExtension file extension
 * @param url remote url to the file
 * @param data data to be logged to the console
 * @param config config object with main : array styles for first line and info: array styles for second line/info;
 */
const logFileProcess = (fileExtension, url, data, metadata, config) => {
    const mainStyles = getStyle(config.main);
    const infoStyles = getStyle(config.info);
    // (metadata.failedWrite && color(`Failed : ${metadata.}`, "FgRed")) || ""
    console.log(`${color(`${metadata.successfulWrite}/${metadata.allLink}`, "FgCyan")}\t\n${mainStyles}- File (${fileExtension}) : ${url}\n   |_ ${infoStyles}${data}\n`);
};
exports.default = {
    color,
    logFileProcess,
};
//# sourceMappingURL=Logger.js.map