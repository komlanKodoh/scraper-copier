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
const counter_1 = __importDefault(require("./utils/counter"));
const connect_1 = __importDefault(require("./connect"));
const cloneFile_1 = __importDefault(require("./lib/cloneFile"));
const path_1 = __importDefault(require("path"));
var axios_request = { current: 0 };
const clone_n_path = (n) => __awaiter(void 0, void 0, void 0, function* () {
    const nexts = yield connect_1.default.find_next(n);
    if (nexts.length === 0) {
        return false;
    }
    const cloning = nexts.map(({ link, popularity }) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, cloneFile_1.default)(link, axios_request); }));
    yield Promise.all(cloning);
    return true;
});
const start = (target_url, MAX_RUN_TIME) => __awaiter(void 0, void 0, void 0, function* () {
    yield connect_1.default.init(target_url, path_1.default.join(__dirname, ".default_scraper.db"));
    const counter = new counter_1.default();
    while (true) {
        const pursue = yield clone_n_path(200);
        if (!pursue || (MAX_RUN_TIME && counter.minutes >= MAX_RUN_TIME))
            break;
    }
    console.log("\x1b[37m\nProcess Completed");
    console.log(`Total axios request : ${axios_request.current} \n`);
});
exports.default = { start };
//# sourceMappingURL=scrapper.js.map