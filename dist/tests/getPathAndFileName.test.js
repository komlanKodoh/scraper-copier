"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const getPathAndFileName_1 = __importDefault(require("../lib/getPathAndFileName"));
require("dotenv").config();
const R = global._target_directory;
const tests = [
    {
        description: "should return normalized path and file name",
        input: "https://test.com/daniel",
        output: [path_1.default.join(process.cwd(), "test.com"), "daniel.html", "html"],
    },
    {
        description: "should return index.html if at website root",
        input: "https://test.gov",
        output: [path_1.default.join(process.cwd(), "test.gov"), "index.html", "html"],
    },
    {
        description: "should ignore # link position",
        input: "https://jonny.me#about",
        output: [path_1.default.join(process.cwd(), "jonny.me"), "index.html", "html"]
    },
    {
        description: "should ignore url query",
        input: "https://cool.me/daniel?number=different",
        output: [path_1.default.join(process.cwd(), "cool.me"), "daniel.html", "html"]
    },
    {
        description: "should return correct result",
        input: "https://komlankodoh.com/#Home",
        output: [path_1.default.join(process.cwd(), "komlankodoh.com"), "index.html", "html"]
    }
];
describe("Obtain destination path and file name", () => {
    tests.forEach((test) => {
        it(test.description, () => {
            const result = (0, getPathAndFileName_1.default)(test.input);
            expect(result).toEqual(test.output);
        });
    });
});
//# sourceMappingURL=getPathAndFileName.test.js.map