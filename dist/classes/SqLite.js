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
const sqlite3 = require("sqlite3").verbose();
const utils_1 = require("../utils");
const ensurePath_1 = require("../utils/ensurePath");
const sql_1 = require("../utils/sql");
const Logger_1 = __importDefault(require("./Logger"));
const path = require("path");
/**
 * @class SqLite DataAccessObject ;
 */
class SqLite {
    constructor() {
        /**
         * Delete link from mysql database
         *
         * @param link A link that will be deleted from the mysql database
         * @returns A promise
         */
        this.delete = (link) => {
            return new Promise((resolve, reject) => {
                this.db.query(`
              DELETE FROM link WHERE link="${link}";
              `, (error, row) => {
                    resolve();
                });
            });
        };
        /**
         * Find next n = limit link that can be scrapped
         *
         * @param limit maximum number of link to get;
         * @returns a promise with link object
         */
        this.find_next = (limit) => {
            let query = `
    SELECT  *
    FROM link 
    WHERE seen = 0
    ORDER BY popularity DESC
    `;
            if (limit)
                query += `LIMIT ${limit}`;
            return new Promise((resolve, reject) => {
                this.db.all(`
              SELECT  *
              FROM link 
              WHERE seen = 0
              ORDER BY popularity DESC
              LIMIT ${limit}
          `, (err, rows) => {
                    if (!rows) {
                        return resolve([]);
                    }
                    if (rows.length > 0) {
                        Logger_1.default.incrementTotalLink(rows.length);
                    }
                    resolve(rows);
                });
            });
        };
        /**
         * Initializes the database by performing basic actions;
         *
         * @param links Initial links of the first pages that will be scrapped at the once the process starts;
         * @returns A promise;
         */
        this.init = (links, dbPath) => __awaiter(this, void 0, void 0, function* () {
            if (!(yield (0, ensurePath_1.ensurePath)(path.dirname(dbPath))))
                console.log(Logger_1.default.color(`Could not create directory at path ${dbPath}`, "FgRed"));
            console.log(links);
            yield new Promise((resolve) => {
                this.db = new sqlite3.Database(dbPath, (err) => {
                    if (err) {
                        console.error(err);
                    }
                    console.log("Successful connection to sqlite database\n");
                    resolve();
                });
            });
            // creation of a table
            yield new Promise((resolve, reject) => {
                this.db.run((0, sql_1.sql) `CREATE TABLE IF NOT EXISTS link ( link VARCHAR(200) UNIQUE, popularity INT, seen boolean DEFAULT 0)`, () => resolve());
            });
            // emptying the table
            yield new Promise((resolve) => {
                this.db.run((0, sql_1.sql) `DELETE from link`, () => resolve());
            });
            // adding default link to table before booting the process
            yield new Promise((resolve, reject) => {
                let values = "";
                const len = links.length;
                if (len == 0)
                    return resolve();
                for (let i = 0; i < len - 1; i++) {
                    values += `("${links[i]}", ${5 + len - i}),`;
                }
                values += `("${links[len - 1]}",${6})`;
                this.db.run(`
                INSERT INTO link (link, popularity)
                VALUES ${values}
                ON CONFLICT(link) DO UPDATE SET popularity = popularity + 1;
                `, (error) => {
                    console.log(error);
                    resolve();
                });
            });
            return;
        });
        /**
         * Change the visibility of link in the database and sets it as seen.
         *
         * @param link {String} to set as seen
         * @returns Promise
         */
        this.see = (link) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db.run(`
            UPDATE link
            SET seen = 1
            WHERE link = "${link}";
          `, (err, rows) => {
                    resolve();
                });
            });
        });
        this.db = {};
        this.name = "sqlite";
    }
    /**
     * A list of links that will be added to the database;
     *
     * @param links links to add to database
     * @returns a promise;
     */
    add(links) {
        return __awaiter(this, void 0, void 0, function* () {
            const maxChunkLength = 500;
            const linkChunk = links.slice(0, maxChunkLength);
            if (links.length > linkChunk.length)
                this.add(links.slice(maxChunkLength));
            return new Promise((resolve, reject) => {
                if (links.length === 0)
                    return resolve();
                this.db.run(`
                INSERT INTO link (link, popularity)
                VALUES ${(0, utils_1.createInsertValues)(links)}
                ON CONFLICT(link) DO UPDATE SET popularity = popularity + 1;
                `, (error) => {
                    if (error) {
                        console.error(error);
                    }
                    resolve();
                });
            });
            return;
        });
    }
}
exports.default = SqLite;
//# sourceMappingURL=SqLite.js.map