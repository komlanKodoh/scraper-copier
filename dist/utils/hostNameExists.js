"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hostNameExists = void 0;
const dns_1 = __importDefault(require("dns"));
function hostNameExists(hostname) {
    return new Promise((resolve) => {
        dns_1.default.lookup(hostname, (error) => resolve(!error));
    });
}
exports.hostNameExists = hostNameExists;
