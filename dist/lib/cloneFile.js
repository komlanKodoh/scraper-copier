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
const writeFile_1 = __importDefault(require("./writeFile"));
const downloadImg_1 = __importDefault(require("./downloadImg"));
const processLink_1 = __importDefault(require("./processLink"));
const ensurePath_1 = require("../utils/ensurePath");
const contentTypeToFileExtension_1 = __importDefault(require("./contentTypeToFileExtension"));
const cheerio = require("cheerio");
const cloneFile = (url, processManager, overrides) => __awaiter(void 0, void 0, void 0, function* () {
    const urlObject = new URL(url);
    const scraperManager = processManager.scraperManager;
    scraperManager.see(url);
    const file = processManager.createFile(url, overrides === null || overrides === void 0 ? void 0 : overrides.destDirectory);
    if (!file)
        return;
    try {
        // change link visibility to prevent it from being scrapped;
        // a list of domain we are allowed to scrape given, set in the global scope.
        const authorizedDomains = global._authorized_domain;
        if (!(yield (0, ensurePath_1.ensurePath)(file.directory))) {
            processManager.logSuccessfulWrite(file, `could not create file ${file.directory}`);
        }
        const response = yield processManager.getRemoteFile(file);
        if (!response)
            return;
        let link_to_save = [];
        // update of the previously guessed fileExtension to one that matches the response countertype
        const fileContentType = response.headers["content-type"];
        const realFileExtension = (0, contentTypeToFileExtension_1.default)(fileContentType);
        // if (realFileExtension) file.extension = realFileExtension;
        if ([".png", ".jpg", ".jpeg", ".gif", ".svg"].includes(file.extension)) {
            yield (0, downloadImg_1.default)(url, path_1.default.join(file.directory, file.name + file.extension), file, (error) => {
                if (error)
                    processManager.logFailedWrite(file, error.message);
                else
                    processManager.logSuccessfulWrite(file, "");
            });
            return;
        }
        else if ([".html", ".htm"].includes(file.extension)) {
            const $ = cheerio.load(response.data);
            const links = $("a");
            const script = $("script");
            const meta_links = $("link");
            const image_links = $("img");
            $(meta_links).each((_, meta_link) => {
                const _meta_link = $(meta_link).attr("href");
                (0, processLink_1.default)(_meta_link, urlObject, link_to_save, authorizedDomains);
            });
            $(script).each((_, script) => {
                const _script = $(script).attr("src");
                (0, processLink_1.default)(_script, urlObject, link_to_save, authorizedDomains);
            });
            $(links).each(function (_, link) {
                const _link = $(link).attr("href");
                (0, processLink_1.default)(_link, urlObject, link_to_save, authorizedDomains);
            });
            $(image_links).each(function (_, image_link) {
                const _image_link = $(image_link).attr("src");
                (0, processLink_1.default)(_image_link, urlObject, link_to_save, authorizedDomains);
            });
        }
        else if (file.extension === ".css") {
            const myRegexp = /url\(("|')*(.*?)("|')*\)/g;
            let match = myRegexp.exec(response.data);
            while (match !== null) {
                (0, processLink_1.default)(match[2], urlObject, link_to_save);
                match = myRegexp.exec(response.data);
            }
        }
        yield processManager.scraperManager.add(link_to_save);
        yield (0, writeFile_1.default)(response.data, file, (error) => {
            if (error)
                processManager.logFailedWrite(file, error.message);
            else
                processManager.logSuccessfulWrite(file);
        });
    }
    catch (error) {
        switch (error.code) {
            case "ERR_INVALID_URL":
                processManager.logFailedWrite(file, "Could not load the file, Url is invalid");
                break;
            default:
                throw error;
        }
    }
});
exports.default = cloneFile;
