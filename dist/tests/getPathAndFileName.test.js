"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getPathAndFileName_1 = __importDefault(require("../lib/getPathAndFileName"));
require("dotenv").config();
const R = process.env.ROOT;
const tests = [
    {
        description: "should return normalized path and file name",
        input: "https://test.com/daniel",
        output: [R + "test.com/", "daniel"],
    },
    {
        description: "should return index.html if at website root",
        input: "https://test.gov",
        output: [R + "test.gov/", "index.html"],
    },
];
describe("Obtain destination path and file name", () => {
    tests.forEach((test) => {
        it(test.description, () => {
            const result = (0, getPathAndFileName_1.default)(new URL(test.input));
            expect(result).toEqual(test.output);
        });
    });
});
//# sourceMappingURL=getPathAndFileName.test.js.map