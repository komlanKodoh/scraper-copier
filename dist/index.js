#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scrapper_1 = __importDefault(require("./scrapper"));
const cli_args_1 = __importDefault(require("./cli_args"));
const utils_1 = require("./utils");
if (cli_args_1.default.dest && !global._target_directory) {
    global._target_directory = cli_args_1.default.dest;
}
if (!cli_args_1.default.url) {
    console.log("\nHello, welcome to scraper interface.");
    console.log('\nexecute the command "--help" for more information.');
    process.exit();
}
scrapper_1.default.start((0, utils_1.castArray)(cli_args_1.default.url));
//# sourceMappingURL=index.js.map