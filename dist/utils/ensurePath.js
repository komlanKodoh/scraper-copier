"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensurePath = void 0;
const fs = require("fs");
const ensurePath = (web_path) => {
    return new Promise((resolve, reject) => {
        try {
            if (!fs.existsSync(web_path))
                fs.mkdirSync(web_path, { recursive: true });
            resolve(true);
        }
        catch (err) {
            return resolve(false);
        }
    });
};
exports.ensurePath = ensurePath;
//# sourceMappingURL=ensurePath.js.map