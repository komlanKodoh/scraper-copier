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
class default_1 {
    constructor(db) {
        this.add = (links) => {
            return new Promise((resolve, reject) => {
                let values = "";
                const len = links.length;
                if (len == 0)
                    return resolve("nothing");
                for (let i = 0; i < len - 1; i++) {
                    values += `("${links[i]}", 1),`;
                }
                values += `("${links[len - 1]}",1)`;
                this.db.query(`
                INSERT INTO link (link, popularity)
                VALUES ${values}
                ON DUPLICATE KEY UPDATE popularity = popularity + 1;
                `, (error, row) => {
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
        this.see = (location) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db.query(`
            UPDATE link
            SET seen = 1
            WHERE link = "${location}";
          `, (err, rows) => {
                    resolve(rows);
                });
            });
        });
        this.db = db;
    }
}
exports.default = default_1;
//# sourceMappingURL=DbManager.js.map