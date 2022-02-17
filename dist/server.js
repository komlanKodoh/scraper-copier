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
const express_1 = __importDefault(require("express"));
const ProcessManager_1 = __importDefault(require("./classes/ProcessManager"));
const axios_1 = __importDefault(require("axios"));
const cloneFile_1 = __importDefault(require("./lib/cloneFile"));
const findFile_1 = require("./lib/findFile");
const writeFile_1 = require("./lib/writeFile");
const app = (0, express_1.default)();
const DefaultDirectory = path_1.default.join(process.cwd(), "./dest");
const config = {
    port: "3000",
    activeDomain: "",
    activeCaching: true,
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    const dbPath = path_1.default.join(__dirname, ".default_scraper.db");
    const processManager = new ProcessManager_1.default(DefaultDirectory);
    yield processManager.initDb(dbPath);
    const domainTracker = yield processManager.initDomainTracker();
    yield processManager.initScraperManager([]);
    const directories = yield domainTracker.getRootDirectories(config.activeDomain);
    if (directories.length < 1 && !config.activeCaching) {
        console.log(Logger_1.default.color(`\n Domain provided has never been fetched : ${config.activeDomain}`, "FgRed"), '\n if this is intended, try running with active caching "-c" on.');
    }
    app.get("/update-domain", (req, res) => {
        config.activeDomain = req.query.newDomain;
    });
    app.get("/myWorker.js", (_, res) => {
        res.sendFile(path_1.default.join(__dirname, "./helpers/sw.js"));
    });
    app.get("/helpers/matchingURL", () => { });
    app.use("/helpers", express_1.default.static(path_1.default.join(__dirname, "helpers")));
    app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let resourceURL = decodeURIComponent(req.query.url);
        let shouldUpdateDomain = req.query.updateDomain;
        if (!resourceURL)
            return;
        const resourceURLObject = new URL(resourceURL);
        if (shouldUpdateDomain === "true") {
            config.activeDomain = resourceURLObject.host;
        }
        const requestURL = resourceURL.replace(/localhost:[0-9]+/, config.activeDomain);
        const directories = yield domainTracker.getRootDirectories(config.activeDomain);
        const file = yield (0, findFile_1.findFile)(directories, requestURL);
        console.log("File successfully served From " +
            Logger_1.default.color("LocalStorage < -- >  ", "FgBlue") +
            Logger_1.default.color(requestURL, "FgGreen"));
        if (file)
            return res.sendFile(file);
        const response = yield axios_1.default.get(requestURL).catch(() => {
            console.log("File " +
                Logger_1.default.color("Not Found  < -- >", "FgRed") +
                Logger_1.default.color(requestURL, "FgGreen"));
        });
        if (response) {
            console.log("File successfully served From " +
                Logger_1.default.color("RemoteURL    < -- > ", "FgYellow") +
                Logger_1.default.color(requestURL, "FgGreen"));
            if (/text\/html/.test(response.headers["content-type"])) {
                try {
                    response.data = (0, writeFile_1.processHTML)(response.data);
                }
                catch (_a) {
                    console.log(Logger_1.default.color("- File : Could not inject js " + requestURL, "FgRed"));
                }
            }
            res.set(response.headers);
            res.send(response.data);
            if (config.activeCaching) {
                (0, cloneFile_1.default)(requestURL, processManager, {
                    destDirectory: directories[0],
                });
            }
            return;
        }
        res.sendStatus(404);
    }));
}))();
class ServerAPI {
    constructor() { }
    static start(apiConfig) {
        Object.assign(config, apiConfig);
        const server = app.listen(config.port, () => {
            console.log(`\nApp listening on port ${Logger_1.default.color(config.port, "FgGreen")}`);
        });
        server.on("error", (error) => __awaiter(this, void 0, void 0, function* () {
            switch (error.code) {
                case "EADDRINUSE":
                    console.log(`\nPort ${Logger_1.default.color(`${config.port} already in use`, "FgRed")} . \nTry finishing the process on port ${Logger_1.default.color(config.port, "FgBlue")} or use option -port ( alias -p ) to choose a different port.\n`);
                    process.exit();
                    break;
            }
        }));
    }
}
exports.default = ServerAPI;
//# sourceMappingURL=server.js.map