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
const sqlite3_1 = __importDefault(require("sqlite3"));
const Logger_1 = __importDefault(require("./Logger"));
const ensurePath_1 = require("../utils/ensurePath");
const ScraperManager_1 = __importDefault(require("./ScraperManager"));
const axios_1 = __importDefault(require("axios"));
const DomainTracker_1 = __importDefault(require("./DomainTracker"));
class ProcessManager {
    constructor() {
        this.metadata = {
            allLink: 0,
            httpRequest: 0,
            failedWrite: 0,
            successfulWrite: 0,
        };
        /**
         * Logs file process when failed
         *
         * @param fileExtension file extension
         * @param remoteURl remote url of the file
         * @param data Data string to be logged
         */
        this.logFailedWrite = (remoteURl, file, errorMessage) => {
            this.metadata.failedWrite++;
            Logger_1.default.logFileProcess(file.extension, remoteURl.href, errorMessage, this.metadata, {
                main: ["FgWhite"],
                info: ["FgRed"],
            });
        };
        /**
         * Logs successful file Process;
         *
         * @param remoteURl remote url of the file
         * @param file file Object declared in index.d.ts
         * @param localDirectory path where saved on local machine
         *
         */
        this.logSuccessfulWrite = (remoteURl, file, localDirectory) => {
            this.metadata.successfulWrite++;
            Logger_1.default.logFileProcess(file.extension, remoteURl.href, path_1.default.join(localDirectory, file.name), this.metadata, {
                main: ["FgWhite"],
                info: ["FgGreen"],
            });
            this.domainTracker.lookAtFile(remoteURl, localDirectory);
        };
        this.db = {};
        this.domainTracker = {};
        this.scraperManager = {};
    }
    cleanExit() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\x1b[37m\nProcess Completed");
            console.log(`Total http request : ${Logger_1.default.color(this.metadata.httpRequest, "FgBlue")}  \n`);
            console.log(`Non completed process : ${Logger_1.default.color(this.metadata.httpRequest -
                this.metadata.successfulWrite -
                this.metadata.failedWrite, "FgYellow")}
    `);
            console.log(`Failed write : ${Logger_1.default.color(this.metadata.failedWrite, "FgRed")}`);
            console.log(`Successful write : ${Logger_1.default.color(this.metadata.successfulWrite, "FgBlue")}`);
            console.log("\n");
            yield this.domainTracker.cleanExit();
            yield this.scraperManager.cleanExit();
        });
    }
    /**
     * Initializes basic properties of ProcessManager: [database, scraperManager]
     *
     * @param dbPath path were processManager must initialize its database;
     * @returns process manager object
     */
    init(config) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initDb(config.dbPath);
            yield this.initDomainTracker();
            yield this.initScraperManager(config.scraperRootUrls);
            return this;
        });
    }
    /**
     * Get file from given files
     *
     * @param url remote url
     * @param file file Object
     * @returns axios get request response
     */
    getRemoteFile(remoteURl, file) {
        return __awaiter(this, void 0, void 0, function* () {
            this.metadata.httpRequest += 1;
            const axiosResponse = (yield axios_1.default
                .get(remoteURl.href)
                .catch((error) => null));
            if (!axiosResponse) {
                this.logFailedWrite(remoteURl, file, `Not Found`);
            }
            return axiosResponse;
        });
    }
    incrementAllLink(increment) {
        this.metadata.allLink += increment;
        console.log(Logger_1.default.color(`Retrieved : `, "Reset"), Logger_1.default.color(`${increment} links `, "FgYellow"), `; ${this.metadata.allLink - increment} ==>`, Logger_1.default.color(this.metadata.allLink, "FgBlue"));
    }
    /**
     * Initializes new sqlite database
     *
     * @param dbPath path where the database will be created
     * @returns reference to sqlite database
     */
    initDb(dbPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield (0, ensurePath_1.ensurePath)(path_1.default.dirname(dbPath))))
                console.log(Logger_1.default.color(`Could not create directory at path ${dbPath}`, "FgRed"));
            yield new Promise((resolve) => {
                this.db = new sqlite3_1.default.Database(dbPath, (err) => {
                    if (err) {
                        console.error(err);
                    }
                    console.log("Successful connection to sqlite database\n");
                    resolve();
                });
            });
            return this.db;
        });
    }
    initDomainTracker() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db)
                throw new Error("initDb must be called before scraper initScraperManager");
            this.domainTracker = yield new DomainTracker_1.default(this.db).init();
            return this.domainTracker;
        });
    }
    initScraperManager(rootLinks) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db)
                throw new Error("initDb must be called before scraper initScraperManager");
            this.scraperManager = yield new ScraperManager_1.default(this.db).init(rootLinks);
            return this.scraperManager;
        });
    }
    findNext(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const links = yield this.scraperManager.findNext(limit);
            if (links.length > 0)
                this.incrementAllLink(links.length);
            return links;
        });
    }
}
exports.default = ProcessManager;
//# sourceMappingURL=ProcessManager.js.map