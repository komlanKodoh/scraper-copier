"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const DbManager_1 = __importDefault(require("./classes/DbManager"));
let mysql = require("mysql2");
exports.connection = mysql.createConnection({
    user: "root",
    database: "server_copy",
    password: "example",
    port: "3307"
});
exports.default = new DbManager_1.default(exports.connection);
//# sourceMappingURL=connect.js.map