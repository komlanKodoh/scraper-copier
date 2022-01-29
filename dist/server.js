"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const Logger_1 = __importDefault(require("./classes/Logger"));
const getPathAndFileName_1 = __importDefault(require("./lib/getPathAndFileName"));
const fs = require("fs");
const http = require("http");
const requestListener = function (req, res) {
    res.writeHead(200);
    console.log(req);
    res.end("Hello, World!");
};
const server = http.createServer(requestListener);
const express = require("express");
const app = express();
app.get("*", (req, res) => {
    if (/\.\.\//.test(req.url))
        console.log(Logger_1.default.color("\t request failure : non existing directory", "FgRed"));
    const url = "https:/" + path_1.default.join(global._public_dir, req.url);
    const [directory, fileName] = (0, getPathAndFileName_1.default)(new URL(url), "/");
    const filePath = path_1.default.join(directory, fileName);
    console.log("requested file : ", Logger_1.default.color(`${filePath}`, "FgGreen"));
    fs.exists(filePath, (exists) => {
        if (exists)
            res.sendFile(filePath);
        else
            res.status(404);
    });
});
const start = (port) => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
};
exports.default = {
    start,
};
//# sourceMappingURL=server.js.map