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
    lookAtFile(url, localDirectory) {
        if (this.lookUp(url))
            return;
        this.domainInMemory[url.hostname] =
            localDirectory.split(url.hostname)[0] + url.hostname;
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
            const newDomain = Object.keys(this.domainInMemory)
                .map((domain) => `("${domain}", "${this.domainInMemory[domain]}")`)
                .join(",");
            return new Promise((resolve) => {
                this.db.run(`INSERT INTO domainTracker (hostname, directory)
        VALUES ${newDomain};
        `, () => {
                    resolve();
                });
            });
        });
    }
    getPath(hostname) {
        return new Promise((resolve) => {
            this.db.all(`SELECT * FROM domainTracker;`, (_, rows) => {
                resolve(rows === null || rows === void 0 ? void 0 : rows.map((record) => record.directory));
            });
        });
    }
}
exports.default = DomainTracker;
//# sourceMappingURL=DomainTracker.js.map