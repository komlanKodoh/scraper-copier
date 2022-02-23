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
const utils_1 = require("../../utils");
const createSqliteDb_1 = __importDefault(require("../../utils/createSqliteDb"));
const ScraperManager_1 = __importDefault(require("../ScraperManager"));
// Generate random list of string to use as url
const LINK_TESTS = new Array(10).fill(undefined).map(_ => (0, utils_1.randomString)(20));
describe("Testing the scrapperManager", () => {
    let db;
    let scraperManager;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        db = yield (0, createSqliteDb_1.default)(path_1.default.join(__dirname, "./testdB"));
        scraperManager = new ScraperManager_1.default(db, "randomNameShit");
    }));
    it("Should init successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        yield scraperManager.init([LINK_TESTS[0]], true);
        const linkRow = yield scraperManager.find(LINK_TESTS[0]);
        expect(linkRow).toBeTruthy();
        expect(linkRow === null || linkRow === void 0 ? void 0 : linkRow.link).toEqual(LINK_TESTS[0]);
    }));
    it("should change Link Visibility", () => __awaiter(void 0, void 0, void 0, function* () {
        yield scraperManager.init([LINK_TESTS[0]]);
        yield scraperManager.see(LINK_TESTS[0]);
        const linkRow = yield scraperManager.find(LINK_TESTS[0]);
        expect(linkRow === null || linkRow === void 0 ? void 0 : linkRow.seen).toEqual(1);
    }));
    it("Should add link to database", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (yield scraperManager.init([], true)).add(LINK_TESTS.slice(0, 5));
        const allLink = yield scraperManager.findNext(600000);
        expect(allLink.map(linkRow => linkRow.link)).toEqual(LINK_TESTS.slice(0, 5));
    }));
});
