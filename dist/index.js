#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./utils/index");
const scrapper_1 = __importDefault(require("./scrapper"));
const cli_args_1 = __importDefault(require("./cli_args"));
const server_1 = __importDefault(require("./server"));
const path_1 = __importDefault(require("path"));
const Logger_1 = __importDefault(require("./classes/Logger"));
if (process.platform === "win32") {
    var rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.on("SIGINT", function () {
        //@ts-ignore
        process.emit("SIGINT");
    });
}
switch (cli_args_1.default._[0]) {
    case "load":
        const startingUrls = ([cli_args_1.default.url].concat(cli_args_1.default.roots || []) ||
            []);
        (0, index_1.setGlobal)("_target_directory", cli_args_1.default.dest);
        const emptyArray = [];
        (0, index_1.setGlobal)("_authorized_domain", emptyArray
            .concat(cli_args_1.default["authorized-domain"] || [], startingUrls.map((url) => new URL(url).hostname))
            .map((domain) => new RegExp(domain, "i")));
        scrapper_1.default.start(startingUrls, path_1.default.join(process.cwd(), cli_args_1.default.dest || ""));
        break;
    case "serve":
        server_1.default.start({
            port: parseInt(cli_args_1.default.port),
            activeDomain: cli_args_1.default["domain"],
            activeCaching: cli_args_1.default["active-caching"]
        });
        break;
    default:
        console.log("Welcome to scraper-copier, type ", Logger_1.default.color("--help ", "FgYellow"), " to get a list of available command :).");
}
//# sourceMappingURL=index.js.map