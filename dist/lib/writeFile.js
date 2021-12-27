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
exports.default = (data, destination) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof data === "object") {
        data = JSON.stringify(data);
    }
    yield fs.writeFile(destination, data, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        else {
            console.log(`------------file successfully written on path ${destination}.-----------`);
        }
    });
});
//# sourceMappingURL=writeFile.js.map