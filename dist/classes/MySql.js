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
const index_1 = require("./../utils/index");
let mysql = require("mysql2");
const sql_1 = require("../utils/sql");
class default_1 {
    constructor() {
        this.add = (links) => {
            return new Promise((resolve, reject) => {
                if (links.length === 0)
                    return resolve("nothing");
                this.db.query(`
                INSERT INTO link (link, popularity)
                VALUES ${(0, index_1.createInsertValues)(links)}
                ON DUPLICATE KEY UPDATE popularity = popularity + 1;
                `, (error, row) => {
                    // console.log(error, row);
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
        this.find_next = (limit) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db.query(`
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
        });
        this.init = (...links) => __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve) => {
                this.db.connect((err) => {
                    if (err) {
                        return console.error("error : ", err);
                    }
                    console.log("connected to the MySQL server.\n");
                    resolve();
                });
            });
            yield new Promise((resolve, reject) => {
                this.db.query((0, sql_1.sql) `CREATE TABLE IF NOT EXISTS link ( link VARCHAR(200) UNIQUE, popularity INT, seen boolean DEFAULT 0)`, () => resolve());
            });
            yield new Promise((resolve, reject) => {
                this.db.query((0, sql_1.sql) `DELETE FROM link`, () => resolve());
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
                this.db.query(`
                INSERT INTO link (link, popularity)
                VALUES ${values}
                ON DUPLICATE KEY UPDATE popularity = popularity + 1;
                `, (error) => {
                    if (error) {
                        console.error(error);
                    }
                    // console.log(error);
                    resolve();
                });
            });
            return;
        });
        this.see = (location) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db.query(`
            UPDATE link
            SET seen = 1
            WHERE link = "${location}";
          `, (err, rows) => {
                    resolve();
                });
            });
        });
        this.name = "mysql;";
        this.db = mysql.createConnection({
            user: "root",
            database: "server_copy",
            password: "example",
            port: "3307",
        });
        // For testing purposes
        this.db.all = this.db.query;
        this.db.run = this.db.query;
    }
}
exports.default = default_1;
//# sourceMappingURL=MySql.js.map