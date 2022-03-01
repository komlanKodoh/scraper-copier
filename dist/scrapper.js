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
const ensurePath_1 = require("./utils/ensurePath");
/**
 * Clone a specific number of unseen files to local directories.
 *
 * @param numberOfUrls Number of unseen url to clone to local dir
 * @param processManager A instance of the process manager class,
 * @returns True if it found file to load and false if there were no more file to load.
 */
const cloneRemoteUrls = (numberOfUrls, processManager) => __awaiter(void 0, void 0, void 0, function* () {
    const nexts = yield processManager.findNext(numberOfUrls);
    if (nexts.length === 0)
        return false;
    const cloningPromises = nexts.map(({ link, popularity }) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, cloneFile_1.default)(link, processManager); }));
    yield Promise.all(cloningPromises);
    return true;
});
const start = ({ resetLink, startingURls, dataBasePath, destDirectory, maxRequestPerSecond, }) => __awaiter(void 0, void 0, void 0, function* () {
    const dbPath = dataBasePath || path_1.default.join(__dirname, ".default_scraper.db");
    yield (0, ensurePath_1.ensurePath)(path_1.default.dirname(dbPath));
    const processManager = yield new ProcessManager_1.default(destDirectory, {
        maxRequestPerSecond,
    }).init({
        dbPath,
        scraperRootUrls: startingURls,
        resetLink,
    });
    process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
        yield processManager.cleanExit();
        process.exit();
    }));
    while (true) {
        // 250 was arbitrary chosen to signify the number of request to boot at the same time,
        // the process manager internally takes care of scheduling the request to not overwhelm servers;
        const pursue = yield cloneRemoteUrls(250, processManager);
        if (!pursue)
            break;
    }
    yield processManager.cleanExit();
    return;
});
exports.default = { start };
