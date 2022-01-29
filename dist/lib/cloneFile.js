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
const getPathAndFileName_1 = __importDefault(require("./getPathAndFileName"));
const downloadImg_1 = __importDefault(require("./downloadImg"));
const processLink_1 = __importDefault(require("./processLink"));
const writeFile_1 = __importDefault(require("./writeFile"));
const connect_1 = __importDefault(require("../connect"));
const path_1 = __importDefault(require("path"));
const Logger_1 = __importDefault(require("../classes/Logger"));
const ensurePath_1 = require("../utils/ensurePath");
const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
exports.default = (url, axios_request) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        connect_1.default.see(url);
        const parsedUrl = new URL(url);
        const authorizedDomains = global._authorized_domain;
        const [web_path, fileName, fileExtension] = (0, getPathAndFileName_1.default)(parsedUrl, path_1.default.join(process.cwd(), global._target_directory || ""));
        if (!(yield (0, ensurePath_1.ensurePath)(web_path)))
            Logger_1.default.error(fileExtension, url, `could not create file ${web_path}`);
        axios_request.current++;
        const response = yield axios.get(url).catch((err) => {
            console.log(err);
            Logger_1.default.error(fileExtension, url, `Not Found`);
        });
        if (!response)
            return;
        let link_to_save = [];
        if (["png", "jpg", "jpeg", "gif", "svg"].includes(fileExtension)) {
            yield (0, downloadImg_1.default)(url, path_1.default.join(web_path, fileName), () => {
                Logger_1.default.info(fileExtension, url, web_path, fileName);
            });
            return;
        }
        else if (["html", "htm"].includes(fileExtension)) {
            const $ = cheerio.load(response.data);
            const links = $("a");
            const script = $("script");
            const meta_links = $("link");
            const image_links = $("img");
            $(meta_links).each((_, meta_link) => {
                const _meta_link = $(meta_link).attr("href");
                (0, processLink_1.default)(_meta_link, parsedUrl, link_to_save, authorizedDomains);
            });
            $(script).each((_, script) => {
                const _script = $(script).attr("src");
                (0, processLink_1.default)(_script, parsedUrl, link_to_save, authorizedDomains);
            });
            $(links).each(function (_, link) {
                const _link = $(link).attr("href");
                (0, processLink_1.default)(_link, parsedUrl, link_to_save, authorizedDomains);
            });
            $(image_links).each(function (_, image_link) {
                const _image_link = $(image_link).attr("src");
                (0, processLink_1.default)(_image_link, parsedUrl, link_to_save, authorizedDomains);
            });
        }
        else if (fileExtension === "css") {
            const myRegexp = /url\(("|')*(.*?)("|')*\)/g;
            let match = myRegexp.exec(response.data);
            while (match != null) {
                (0, processLink_1.default)(match[2], parsedUrl, link_to_save);
                match = myRegexp.exec(response.data);
            }
        }
        yield connect_1.default.add(link_to_save);
        yield (0, writeFile_1.default)(response.data, web_path, fileName);
        Logger_1.default.info(fileExtension, url, web_path, fileName);
    }
    catch (error) {
        switch (error.code) {
            case "ERR_INVALID_URL":
                console.log(Logger_1.default.error("unknown", url, "Could not load the file, Url is invalid"));
                break;
            default:
                throw error;
        }
    }
});
//# sourceMappingURL=cloneFile.js.map