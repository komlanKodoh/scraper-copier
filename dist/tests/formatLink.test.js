"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formatLink_1 = __importDefault(require("../lib/formatLink"));
require("dotenv").config();
const R = process.env.ROOT;
const tests = [
    {
        description: "should start from domain name if root",
        input: ["/daniel", new URL("https://test.com/info")],
        output: ["https://test.com/daniel"],
    },
    {
        description: "should start from current location if relative path",
        input: ["./daniel", new URL("https://test.com/info")],
        output: ["https://test.com/info/daniel"],
    },
    {
        description: "should start add '/' if absent from link and treat as relative path",
        input: ["daniel", new URL("https://test.com/info")],
        output: ["https://test.com/info/daniel"],
    },
];
describe("formatLink should format link in usabble format in the dabase", () => {
    tests.forEach((test) => {
        it(test.description, () => {
            const new_link = [];
            (0, formatLink_1.default)(test.input[0], test.input[1], new_link);
            expect(new_link).toEqual(test.output);
        });
    });
});
//# sourceMappingURL=formatLink.test.js.map