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
const fs = require("fs");
const request = require("request");
function default_1(uri, filename, callback) {
    return new Promise((resolve, refect) => request.head(uri, function (err, res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            request(uri)
                .pipe(fs.createWriteStream(filename))
                .on("close", (arg) => {
                callback(arg);
                resolve("cool");
            });
        });
    }));
}
exports.default = default_1;
//# sourceMappingURL=downloadImg.js.map