"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sql = void 0;
const sql = (strings, ...expr) => strings
    .map((str, index) => str + (expr.length > index ? String(expr[index]) : ""))
    .join("");
exports.sql = sql;
//# sourceMappingURL=sql.js.map