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
exports.config = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const request_1 = __importDefault(require("request"));
const Logger_1 = __importDefault(require("./classes/Logger"));
const cloneFile_1 = __importDefault(require("./lib/cloneFile"));
const findFile_1 = require("./lib/findFile");
const ProcessManager_1 = __importDefault(require("./classes/ProcessManager"));
const domainIsValid_1 = require("./utils/domainIsValid");
const app = (0, express_1.default)();
const DefaultDirectory = path_1.default.join(__dirname, "./dest");
exports.config = {
    port: "3000",
    activeDomain: "",
    activeCaching: true,
};
// type d = {[K in keyof request.Response]: string}
function proxy(url, res) {
    // return console.log("I crashed in here")
    (0, request_1.default)(url, undefined, (error, response, body) => {
        if ((error.code = "EAI_AGAIN")) {
            console.log(Logger_1.default.color("Failed to retrieve and send the data, Check your internet connection", "FgRed"));
        }
    }).pipe(res);
    console.log("File successfully forwarded to " +
        Logger_1.default.color("External servers  < -- >  ", "FgCyan") +
        Logger_1.default.color(url, "FgGreen"));
}
const startServer = (apiConfig) => __awaiter(void 0, void 0, void 0, function* () {
    // loading configs to the local config object
    Object.assign(exports.config, apiConfig);
    const processManager = new ProcessManager_1.default(DefaultDirectory);
    // path to the database to use for the process.
    // the database holds information like a mapping from domain to
    // local Directories is also used to saved link after scrapping remoteURLs;
    const dbPath = path_1.default.join(__dirname, ".default_scraper.db");
    yield processManager.initDb(dbPath);
    yield processManager.initScraperManager([]);
    const domainTracker = yield processManager.initDomainTracker();
    if (!(yield (0, domainIsValid_1.domainIsValid)(domainTracker, exports.config.activeDomain)))
        return;
    app.get("/update-domain", (req, res) => {
        exports.config.activeDomain = req.query.newDomain;
    });
    app.use("/helpers", express_1.default.static(path_1.default.join(__dirname, "helpers")));
    app.get("/myWorker.js", (req, res) => res.sendFile(path_1.default.join(__dirname, "./helpers/myWorker.js")));
    app.get("/proxy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // get the required from the url query;
        let originalRequest;
        const requestTargetURL = Buffer.from(req.query.request, "base64").toString("utf8");
        try {
            originalRequest = JSON.parse(requestTargetURL);
        }
        catch (err) {
            return console.log(Logger_1.default.color(`Failed to parse the requested resources:`, "FgRed"), Logger_1.default.color(`${req.url.slice(50)}`, "FgGreen"));
        }
        originalRequest.headers = req.headers;
        if (!(originalRequest === null || originalRequest === void 0 ? void 0 : originalRequest.url))
            return;
        let file = processManager.createFile(originalRequest.url.replace(`localhost:${exports.config.port}`, exports.config.activeDomain), "");
        if (!file)
            return res.status(404).send({
                error: "INVALID_URL",
                message: `url ${req.url} is not valid`,
            });
        let domainShouldBeCached = exports.config.activeDomain === file.remoteURL.hostname;
        if (!domainShouldBeCached)
            return proxy(originalRequest.url, res);
        else {
            const directories = yield domainTracker.getRootDirectories(exports.config.activeDomain);
            // We first find the corresponding file from the local machine, if the
            // file is found we send it as the response;
            const fileSavedInStorage = yield (0, findFile_1.findFile)(directories, file.remoteURL.href);
            if (fileSavedInStorage) {
                console.log("File successfully served From  " +
                    Logger_1.default.color("LocalStorage      < -- >  ", "FgBlue") +
                    Logger_1.default.color(file.remoteURL.href, "FgGreen"));
                res.sendFile(fileSavedInStorage);
                return;
            }
            // if the file is not found in the local storage,
            // we proxy the request to its original destination
            proxy(originalRequest.url, res);
            console.log("File successfully served From  " +
                Logger_1.default.color("Remote URL        < -- >  ", "FgBlue") +
                Logger_1.default.color(file.remoteURL.href, "FgGreen"));
            // We finally clone the file in the background;
            (0, cloneFile_1.default)(file.remoteURL.href, processManager, {
                destDirectory: directories[0],
            });
            processManager.incrementAllLink(1);
        }
        res.sendStatus(404);
    }));
    app.get("/", (_, res) => {
        res.sendFile(path_1.default.join(__dirname, "./helpers/index.html"));
    });
    // Starting the server;
    const server = app.listen(exports.config.port, () => {
        console.log(`\nApp listening on port ${Logger_1.default.color(exports.config.port, "FgGreen")}\n`);
    });
    //setting up the error checking;
    server.on("error", (error) => __awaiter(void 0, void 0, void 0, function* () {
        switch (error.code) {
            case "EADDRINUSE":
                console.log(`\nPort ${Logger_1.default.color(`${exports.config.port} already in use`, "FgRed")} . \nTry finishing the process on port ${Logger_1.default.color(exports.config.port, "FgBlue")} or use option -port ( alias -p ) to choose a different port.\n`);
                process.exit();
                break;
        }
    }));
});
const ServerAPI = {
    start: startServer,
};
exports.default = ServerAPI;
//# sourceMappingURL=server.js.map