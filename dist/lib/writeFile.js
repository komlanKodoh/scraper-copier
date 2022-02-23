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
exports.processHTML = void 0;
const path_1 = __importDefault(require("path"));
const fs = require("fs");
const Logger_1 = __importDefault(require("../classes/Logger"));
const utils_1 = require("../utils");
/**
 * Processes html before write to local path
 *
 * @param data string content of html document
 * @returns processed html string
 */
function processHTML(HTML, file) {
    const scriptToInject = `<script src='/helpers/main.js'></script>
     <script>
        window.__current__domain__name = "${file.remoteURL.hostname}";
     </script>`;
    const matched = HTML.match(/<[^(<|>)]*?head[^(<|>)]*?>/);
    if (!(matched === null || matched === void 0 ? void 0 : matched.index)) {
        throw new Error("Head is not found.");
    }
    const insertIndex = matched.index + matched[0].length;
    return (0, utils_1.insertIn)(HTML, insertIndex, scriptToInject);
}
exports.processHTML = processHTML;
/**
 * Write data string or json object to given directory under given fileName
 *
 * @param data data string to write in file
 * @param localDirectory directory where to write the file
 * @param fileName name of the file to write
 */
const writeFile = (data, file, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const destination = path_1.default.join(file.directory, file.name + file.extension);
    if (typeof data === "object") {
        try {
            data = JSON.stringify(data);
        }
        catch (err) {
            console.log("The error", err);
            callback({ message: "could not convert object file to json" });
            return;
        }
    }
    else if (file.extension === "html") {
        try {
            data = processHTML(data, file);
        }
        catch (err) {
            console.log(Logger_1.default.color("- File : Could not inject js " + destination + "\n", "FgRed"));
        }
    }
    yield fs.writeFile(destination, data, (err) => {
        if (err) {
            console.log(err);
            callback({ message: `Unable to write file on path ${destination}` });
        }
        else {
            callback(null);
        }
    });
});
exports.default = writeFile;
