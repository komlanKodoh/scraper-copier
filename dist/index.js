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
const handleDomainInteraction_1 = __importDefault(require("./handleDomainInteraction"));
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
        (0, index_1.setGlobal)("_target_directory", cli_args_1.default.dest);
        (0, index_1.setGlobal)("_authorized_domain", 
        // adding domain from which the initial urls are fetched from;
        cli_args_1.default["authorized-domain"].concat(cli_args_1.default.roots.map((url) => new RegExp(new URL(url).hostname, "i"))));
        const dataBasePath = cli_args_1.default.database
            ? path_1.default.join(process.cwd(), cli_args_1.default.database[0] || "")
            : undefined;
        scrapper_1.default.start({
            dataBasePath,
            startingURls: cli_args_1.default.roots,
            resetLink: cli_args_1.default["reset-history"],
            destDirectory: path_1.default.join(process.cwd(), cli_args_1.default.dest || ""),
            maxRequestPerSecond: parseInt(cli_args_1.default["max-request-per-second"] || "5"),
        });
        break;
    case "serve":
        server_1.default.start({
            port: parseInt(cli_args_1.default.port),
            activeDomain: cli_args_1.default["domain"],
            activeCaching: cli_args_1.default["active-caching"],
            domainOfInterest: cli_args_1.default["authorized-domain"],
        });
        break;
    case "domain":
        (0, handleDomainInteraction_1.default)(cli_args_1.default);
        break;
    default:
        console.log("\nWelcome to scraper-copier, type ", Logger_1.default.color("--help ", "FgYellow"), " to get a list of available command :).\n");
}
