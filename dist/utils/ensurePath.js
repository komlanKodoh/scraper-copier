"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExists = exports.ensurePath = void 0;
const fs_1 = __importDefault(require("fs"));
const ensurePath = (localPath, cb) => {
    return new Promise((resolve, reject) => {
        try {
            if (!fs_1.default.existsSync(localPath))
                fs_1.default.mkdirSync(localPath, { recursive: true });
            if (cb)
                cb(true);
            resolve(true);
        }
        catch (err) {
            if (cb)
                cb(false);
            return resolve(false);
        }
    });
};
exports.ensurePath = ensurePath;
const fileExists = (path) => {
    return new Promise((resolve, reject) => {
        fs_1.default.access(path, (error) => {
            if (error)
                resolve(false);
            resolve(true);
        });
    });
};
exports.fileExists = fileExists;
//# sourceMappingURL=ensurePath.js.map