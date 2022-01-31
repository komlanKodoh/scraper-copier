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
const utils_1 = require("../utils");
const sql_1 = require("../utils/sql");
const path = require("path");
class ScraperManager {
    constructor(db) {
        /**
         * Delete link from mysql database
         *
         * @param link A link that will be deleted from the mysql database
         * @returns A promise
         */
        this.delete = (link) => {
            return new Promise((resolve, reject) => {
                this.db.run(`
              DELETE FROM link WHERE link="${link}";
              `, () => {
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
        this.findNext = (limit) => {
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
          `, (_, rows) => {
                    if (!rows) {
                        return resolve([]);
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
        this.init = (links) => __awaiter(this, void 0, void 0, function* () {
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
                    resolve();
                });
            });
            return this;
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
          `, () => {
                    resolve();
                });
            });
        });
        this.db = db;
        this.name = "sqlite";
    }
    cleanExit() { }
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
        });
    }
}
exports.default = ScraperManager;
//# sourceMappingURL=ScraperManager.js.map