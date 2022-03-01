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
exports.findFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Given a list of root directories, and a remote url. This function returns
 *  the local equivalent of the remote file.
 *
 * @param rootDirectories directories containing domainDirectory mocks of the forme komlankodoh.com
 * @param url
 * @returns
 */
function findFile(rootDirectories, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const rawFilePath = path_1.default.join(file.directory, file.name + file.extension);
        for (let i = 0; i < rootDirectories.length; i++) {
            const destDirectory = rootDirectories[i];
            const filePath = path_1.default.join(destDirectory, rawFilePath);
            const pathIsValid = yield new Promise((resolve) => {
                fs_1.default.access(filePath, (error) => {
                    if (!error) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                });
            });
            if (pathIsValid)
                return filePath;
        }
        return null;
    });
}
exports.findFile = findFile;
