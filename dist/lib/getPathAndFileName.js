"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (url) => {
    const ROOT = process.env.ROOT;
    const { hostname, pathname } = url;
    const path_array = [hostname].concat(pathname.split("/"));
    const filename = pathname === "/" ? "index.html" : path_array.slice(-1)[0];
    const filePath = ROOT + path_array.slice(0, -1).join("/");
    return [filePath, filename];
};
//# sourceMappingURL=getPathAndFileName.js.map