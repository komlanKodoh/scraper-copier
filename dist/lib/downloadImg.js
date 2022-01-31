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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const request = require("request");
/**
 * Downloads image from remote url to local path
 *
 * NOTE: Nested directory must be created in advance; That could be achieved using the ensurePath utilityFunction.
 *
 * @param uri remote url location of image
 * @param localDirectory path  where to write the image
 * @param callback
 * @returns
 */
const downloadImg = function (uri, localDirectory, file, callback) {
    return new Promise((resolve) => request.head(uri, function () {
        return __awaiter(this, void 0, void 0, function* () {
            request(uri)
                .pipe(fs_1.default.createWriteStream(localDirectory))
                .on("close", () => {
                callback(null);
                resolve();
            });
        });
    }));
};
exports.default = downloadImg;
//# sourceMappingURL=downloadImg.js.map