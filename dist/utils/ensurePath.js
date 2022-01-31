"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensurePath = void 0;
const fs = require("fs");
const ensurePath = (localPath, cb) => {
    return new Promise((resolve, reject) => {
        try {
            if (!fs.existsSync(localPath))
                fs.mkdirSync(localPath, { recursive: true });
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
//# sourceMappingURL=ensurePath.js.map