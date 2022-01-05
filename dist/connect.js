"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SqLite_1 = __importDefault(require("./classes/SqLite"));
let mysql = require("mysql2");
exports.default = new SqLite_1.default();
//# sourceMappingURL=connect.js.map