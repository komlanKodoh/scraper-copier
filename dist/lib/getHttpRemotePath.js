"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processLink_1 = __importDefault(require("./processLink"));
function getRemoteHttpPath(link, remoteUrlOrigin) {
    return (0, processLink_1.default)(link, remoteUrlOrigin, [], [new RegExp(".")])[0];
}
exports.default = getRemoteHttpPath;
//# sourceMappingURL=getHttpRemotePath.js.map