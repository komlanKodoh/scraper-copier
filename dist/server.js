"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const Logger_1 = __importDefault(require("./classes/Logger"));
const getPathAndFileName_1 = __importDefault(require("./lib/getPathAndFileName"));
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const ProcessManager_1 = __importDefault(require("./classes/ProcessManager"));
const app = (0, express_1.default)();
const processManager = new ProcessManager_1.default();
const dbPath = path_1.default.join(__dirname, ".default_scraper.db");
app.get("/helpers/html", (req, res) => {
    console.log(Logger_1.default.color("I was requested malicious", "FgBlue"));
    res.sendFile(path_1.default.join(__dirname, "malicious/html.js"));
});
app.get("*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (/\.\.\//.test(req.url))
        console.log(Logger_1.default.color("\t request failure : non existing directory", "FgRed"));
    // await processManager.initDb(dbPath);
    // const domainTracker = await processManager.initDomainTracker();
    // console.log(await domainTracker.getPath("komlankodoh.com"))
    const url = "https:/" + path_1.default.join(global._public_dir, req.url);
    const [directory, fileName] = (0, getPathAndFileName_1.default)(new URL(url), "/");
    const filePath = path_1.default.join(directory, fileName);
    fs_1.default.access(filePath, (error) => {
        if (!error) {
            res.sendFile(filePath),
                console.log("requested file send : ", Logger_1.default.color(`${filePath}`, "FgGreen"));
        }
        else {
            console.log("requested file  NoFound: ", Logger_1.default.color(`${filePath}`, "FgRed"));
            res.sendStatus(404);
        }
    });
}));
class ServerAPI {
    constructor() { }
    static start(port) {
        app.listen(port, () => {
            console.log(`App listening on port ${Logger_1.default.color(port, "FgGreen")}`);
        });
    }
}
exports.default = ServerAPI;
//# sourceMappingURL=server.js.map