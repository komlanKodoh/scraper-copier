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
const node_url_1 = require("node:url");
const connect_1 = require("./connect");
const counter_1 = __importDefault(require("./utils/counter"));
const connect_2 = __importDefault(require("./connect"));
const sql_1 = require("./utils/sql");
const cloneFile_1 = __importDefault(require("./lib/cloneFile"));
const BASE_URL = "https://www.google.com/";
const ROOT = "./" + new node_url_1.URL(BASE_URL).hostname;
const initialize = (...init_links) => {
    connect_1.connection.query((0, sql_1.sql) `DROP TABLE link`);
    connect_1.connection.query((0, sql_1.sql) `CREATE TABLE IF NOT EXISTS link ( link VARCHAR(200), popularity INT, seen boolean )`);
    connect_1.connection.query((0, sql_1.sql) `truncate table link;`);
    let init_link_table = [];
    let popularity = 5000;
    init_links.forEach((init_link) => init_link_table.push(`("${init_link}" , ${(popularity -= 10)} , false ) `));
    if (!init_links.length)
        throw new Error("Initializing links must be provided");
    connect_1.connection.query(`insert into link (link, popularity, seen) values ${init_link_table.join(",")}; `);
};
var axios_request = { current: 0 };
const clone_n_path = (n) => __awaiter(void 0, void 0, void 0, function* () {
    const nexts = yield connect_2.default.find_next(5);
    if (nexts.length == 0) {
        return false;
    }
    const cloning = nexts.map(({ link, popularity }) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, cloneFile_1.default)(link, axios_request); }));
    yield Promise.all(cloning);
    return true;
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    initialize("https://commerce-behemoth11.vercel.app");
    const MAX_RUN_TIME = 10;
    const counter = new counter_1.default();
    for (let i = 0; i <= 5000000000; i++) {
        const pursue = yield clone_n_path(5);
        if (!pursue || counter.minutes >= MAX_RUN_TIME)
            break;
    }
    console.log(`total axios request : ${axios_request.current}`);
    console.log("++++++++++++++++++++program closing---------------------");
    connect_1.connection.query("select * from link", (err, doc) => {
        console.log(doc.map((data) => data.link));
    });
});
connect_1.connection.connect((err) => {
    if (err) {
        return console.error("error: ", err);
    }
    console.log("connected to the MySQL server.\n");
    start();
});
//# sourceMappingURL=index.js.map