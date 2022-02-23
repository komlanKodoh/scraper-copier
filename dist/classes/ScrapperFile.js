"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapperFile = void 0;
const getPathAndFileName_1 = __importDefault(require("../lib/getPathAndFileName"));
class ScrapperFile {
    constructor(url, rootDirectory) {
        this.remoteURL = new URL(url);
        const [localDirectory, filename, fileExtension] = (0, getPathAndFileName_1.default)(this.remoteURL, rootDirectory);
        this.name = filename;
        this.extension = fileExtension;
        this.directory = localDirectory;
    }
}
exports.ScrapperFile = ScrapperFile;
