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
const DomainTracker_1 = __importDefault(require("./classes/DomainTracker"));
const Logger_1 = __importDefault(require("./classes/Logger"));
const createSqliteDb_1 = __importDefault(require("./utils/createSqliteDb"));
const actionDict = {
    domain_show: (domainTracker) => __awaiter(void 0, void 0, void 0, function* () {
        const scrappedDomains = yield domainTracker.getAllDomains();
        console.log(`\n${scrappedDomains.join("\n")}\n`);
    }),
};
const domainHandler = (cli_args) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, createSqliteDb_1.default)(cli_args.directory || path_1.default.join(__dirname, ".default_scraper.db"), () => 0);
    if (!db)
        return console.log(Logger_1.default.color("could not connect to the database. ", "FgRed"));
    const domainTracker = new DomainTracker_1.default(db);
    const command = cli_args._.join("_");
    if (!actionDict[command])
        console.log(Logger_1.default.color("Invalid command", "FgRed"));
    actionDict[command](domainTracker);
});
exports.default = domainHandler;
//# sourceMappingURL=handleDomainInteraction.js.map