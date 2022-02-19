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
Object.defineProperty(exports, "__esModule", { value: true });
class DomainTracker {
    constructor(db) {
        this.hasBeenBackedUp = false;
        this.db = db;
        this.domainInMemory = {};
    }
    /**
     * Ensures that a domain has an associated set in the domain dictionary saved in Memory {this.domainInMemory}
     *
     * @param hostname
     */
    ensureHostname(hostname) {
        if (!this.domainInMemory[hostname])
            this.domainInMemory[hostname] = new Set();
    }
    /**
     * Add a local path to list of path existing for a given host / domain.
     *
     * @param hostname
     * @param path
     */
    addPathToHost(hostname, path) {
        this.ensureHostname(hostname);
        this.domainInMemory[hostname].add(path);
    }
    /**
     * Given an url and a localDirectory, it ensures that the hostname - localDirectory combination has been
     * saved. If not, it saves the combination.
     *
     * @param url
     * @param localDirectory
     * @returns
     */
    lookAtFile(url, localDirectory) {
        if (this.lookUp(url))
            return;
        this.addPathToHost(url.hostname, localDirectory.split(url.hostname)[0] + url.hostname);
    }
    lookUp(url) {
        if (this.domainInMemory[url.hostname]) {
            return this.domainInMemory[url.hostname];
        }
        else if (this.hasBeenBackedUp) {
            console.log("Look into the database");
        }
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // creation of a table
            yield new Promise((resolve, reject) => {
                this.db.run(`CREATE TABLE IF NOT EXISTS domainTracker ( hostname VARCHAR(200), directory VARCHAR(500) UNIQUE )`, () => resolve());
            });
            return this;
        });
    }
    cleanExit() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.backUp();
        });
    }
    backUp() {
        const newDomain = Object.keys(this.domainInMemory)
            .map((domain) => [...this.domainInMemory[domain]].map((domainPath) => `("${domain}", "${domainPath}" )`))
            .join(",");
        return new Promise((resolve) => {
            this.db.run(`INSERT INTO domainTracker (hostname, directory )
        VALUES ${newDomain};
        `, () => {
                resolve();
            });
        });
    }
    getDirectoriesFromDB(hostname) {
        this.ensureHostname(hostname);
        return new Promise((resolve) => {
            this.db.all(`SELECT * FROM domainTracker Where hostname="${hostname}";`, (_, rows) => {
                const directories = rows === null || rows === void 0 ? void 0 : rows.map((record) => record.directory);
                directories === null || directories === void 0 ? void 0 : directories.forEach((directory) => this.domainInMemory[hostname].add(directory));
                resolve(directories || []);
            });
        });
    }
    getDirectories(hostname) {
        if (this.domainInMemory[hostname]) {
            this.getDirectoriesFromDB(hostname);
            return [...this.domainInMemory[hostname]];
        }
        return this.getDirectoriesFromDB(hostname);
    }
    getRootDirectories(hostname) {
        return __awaiter(this, void 0, void 0, function* () {
            const directories = yield yield this.getDirectories(hostname);
            return directories.map((directory) => directory.split(hostname)[0]);
        });
    }
    getAllDomains() {
        return new Promise((resolve) => {
            this.db.all(`SELECT DISTINCT hostname FROM domainTracker;`, (_, rows) => {
                resolve(rows.map(row => row.hostname) || []);
            });
        });
    }
}
exports.default = DomainTracker;
//# sourceMappingURL=DomainTracker.js.map