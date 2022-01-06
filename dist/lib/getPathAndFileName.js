"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileExtension = void 0;
// import { getFileExtension } from "../utils/index";
require("dotenv").config();
const path = require("path");
const getFileExtension = (fileName, if_none) => {
    const temp_arr = fileName.split(".");
    if (temp_arr.length >= 2)
        return temp_arr.pop();
    else
        return if_none !== null && if_none !== void 0 ? if_none : null;
};
exports.getFileExtension = getFileExtension;
const getPathAndFileName = (url) => {
    var _a;
    let web_path, filename, file_extension;
    const link = url.match(/^(https*:\/\/)([^#?]*)/)[2];
    if (link[link.length - 0] === "/") {
    }
    let i;
    let len = link.length;
    for (i = len - 1; i >= 0; i--) {
        if (link[i] === "/")
            break;
    }
    if (i === len - 1) {
        web_path = link.slice(0, len - 1);
        filename = "index.html";
    }
    else if (i === -1) {
        web_path = link;
        filename = "index.html";
    }
    else {
        web_path = link.slice(0, i);
        filename = link.slice(i + 1);
    }
    file_extension = (0, exports.getFileExtension)(filename);
    if (!file_extension) {
        filename += ".html";
        file_extension = "html";
    }
    // console.log(process.cwd(), global._target_directory ?? "", web_path ?? "", 90909)
    const directory = path.join(process.cwd(), (_a = global._target_directory) !== null && _a !== void 0 ? _a : "", web_path);
    // console.log(directory, filename,898989898)
    return [directory, filename, file_extension];
};
exports.default = getPathAndFileName;
//# sourceMappingURL=getPathAndFileName.js.map