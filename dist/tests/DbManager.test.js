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
const MySql_1 = __importDefault(require("../classes/MySql"));
const SqLite_1 = __importDefault(require("../classes/SqLite"));
const sql_1 = require("../utils/sql");
const LINK_TEST = [
    "https://komlankodoh.com",
    "https://dummylink.com",
    "https://thirdlikn.com",
    "https://fourlink.com",
    "https://sixthlink.com",
    "https://lastlink.com",
];
jest.setTimeout(10000);
for (const db of [new SqLite_1.default, new MySql_1.default]) {
    describe(`Testing implementation of databases : ${db.name}`, () => {
        const db = new MySql_1.default();
        it("Should initialized successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            yield db.init("https://komlankodoh.com", "https://dummylink.com");
            yield new Promise((resolve) => {
                db.db.all((0, sql_1.sql) `select * from link`, (error, rows) => {
                    expect(rows[0]).toEqual({
                        link: "https://komlankodoh.com",
                        popularity: 7,
                        seen: 0,
                    });
                    expect(rows[1]).toEqual({
                        link: "https://dummylink.com",
                        popularity: 6,
                        seen: 0,
                    });
                    resolve();
                });
            });
        }));
        it("Should successfully ad links", () => __awaiter(void 0, void 0, void 0, function* () {
            yield db.add(LINK_TEST);
            yield new Promise((resolve) => {
                db.db.all((0, sql_1.sql) `select * from link Where link="${LINK_TEST[2]}"`, (error, rows) => {
                    if (error) {
                        console.error(error);
                    }
                    expect(rows[0]).toEqual({
                        link: LINK_TEST[2],
                        popularity: 1,
                        seen: 0,
                    });
                    resolve();
                });
            });
        }));
        it("Should Increment on duplicate", () => __awaiter(void 0, void 0, void 0, function* () {
            yield db.add(LINK_TEST);
            yield new Promise((resolve) => {
                db.db.all((0, sql_1.sql) `select * from link Where link="${LINK_TEST[2]}"`, (error, rows) => {
                    expect(rows[0]).toEqual({
                        link: LINK_TEST[2],
                        popularity: 2,
                        seen: 0,
                    });
                    resolve();
                });
            });
        }));
        it("Should see links successfully ", () => __awaiter(void 0, void 0, void 0, function* () {
            yield db.see(LINK_TEST[2]);
            yield new Promise((resolve) => {
                db.db.all((0, sql_1.sql) `select * from link Where link="${LINK_TEST[2]}"`, (error, rows) => {
                    expect(rows[0]).toEqual({
                        link: LINK_TEST[2],
                        popularity: 2,
                        seen: 1,
                    });
                    resolve();
                });
            });
        }));
        it("Should find next five link successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const next = yield db.find_next(5);
            let seen_link_is_present = false;
            next.forEach((link) => {
                if (link.link == LINK_TEST[2])
                    seen_link_is_present = true;
            });
            expect(seen_link_is_present).toBe(false);
        }));
    });
}
//# sourceMappingURL=DbManager.test.js.map