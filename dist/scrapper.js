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
const cloneFile_1 = __importDefault(require("./lib/cloneFile"));
const path_1 = __importDefault(require("path"));
const ProcessManager_1 = __importDefault(require("./classes/ProcessManager"));
var axios_request = { current: 0 };
const cloneRemoteUrls = (numberOfUrls, processManager) => __awaiter(void 0, void 0, void 0, function* () {
    const nexts = yield processManager.findNext(numberOfUrls);
    if (nexts.length === 0)
        return false;
    const cloning = nexts.map(({ link, popularity }) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, cloneFile_1.default)(link, processManager); }));
    yield Promise.all(cloning);
    return true;
});
const start = (target_url, MAX_RUN_TIME) => __awaiter(void 0, void 0, void 0, function* () {
    const dbPath = path_1.default.join(__dirname, ".default_scraper.db");
    const processManager = yield new ProcessManager_1.default().init({
        dbPath,
        scraperRootUrls: target_url,
    });
    process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
        yield processManager.cleanExit();
        process.exit();
    }));
    while (true) {
        const pursue = yield cloneRemoteUrls(200, processManager);
        if (!pursue)
            break;
    }
    yield processManager.cleanExit();
});
exports.default = { start };
//# sourceMappingURL=scrapper.js.map