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
const sqlite3 = require("sqlite3").verbose();
const utils_1 = require("../utils");
const sql_1 = require("../utils/sql");
const path = require("path");
class default_1 {
    constructor() {
        this.add = (links) => {
            return new Promise((resolve, reject) => {
                if (links.length === 0)
                    return resolve("nothing");
                this.db.run(`
                INSERT INTO link (link, popularity)
                VALUES ${(0, utils_1.createInsertValues)(links)}
                ON CONFLICT(link) DO UPDATE SET popularity = popularity + 1;
                `, (error) => {
                    if (error) {
                        console.error(error);
                    }
                    resolve("row");
                });
            });
        };
        this.delete = (link) => {
            return new Promise((resolve, reject) => {
                this.db.query(`
              DELETE FROM link WHERE link="${link}";
              `, (error, row) => {
                    resolve(row);
                });
            });
        };
        this.find_next = (limit) => {
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
                    resolve(rows);
                });
            });
        };
        this.init = (...links) => __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve) => {
                this.db = new sqlite3.Database(path.join(process.cwd(), ".sqlite.db"), (err) => {
                    if (err) {
                        console.error(err);
                    }
                    console.log("Successful connection to sqlite database\n");
                    resolve();
                });
            });
            yield new Promise((resolve, reject) => {
                this.db.run((0, sql_1.sql) `CREATE TABLE IF NOT EXISTS link ( link VARCHAR(200) UNIQUE, popularity INT, seen boolean DEFAULT 0)`, () => resolve());
            });
            yield new Promise((resolve) => {
                this.db.run((0, sql_1.sql) `DELETE from link`, () => resolve());
            });
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
            return;
        });
        this.see = (location) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db.run(`
            UPDATE link
            SET seen = 1
            WHERE link = "${location}";
          `, (err, rows) => {
                    resolve();
                });
            });
        });
        this.db = {};
        this.name = "sqlite";
    }
}
exports.default = default_1;
//# sourceMappingURL=SqLite.js.map