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
const path_1 = __importDefault(require("path"));
const Logger_1 = __importDefault(require("../classes/Logger"));
const fs = require("fs");
exports.default = (data, web_path, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof data === "object") {
        data = JSON.stringify(data);
    }
    const destination = path_1.default.join(web_path, fileName);
    yield fs.writeFile(destination, data, (err) => {
        if (err) {
            // console.error(err);
            console.log(Logger_1.default.color("  - File : Not Found : " + destination, "FgRed"));
            return;
        }
    });
});
//# sourceMappingURL=writeFile.js.map