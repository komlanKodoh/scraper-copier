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
Object.defineProperty(exports, "__esModule", { value: true });
exports.domainIsValid = void 0;
const domainIsValid = (domainTracker, domain) => __awaiter(void 0, void 0, void 0, function* () {
    // const directories = await domainTracker.getRootDirectories(
    //   domain
    // );
    // if (directories.length > 1)
    //   return true;
    //   console.log("The part bellow the thing ran and it is interesting")
    // if (!(await hostNameExists(domain))) {
    //   console.log(
    //     Logger.color(
    //       `\n Domain provided is not recognized as a valid domain: ${domain}`,
    //       "FgRed"
    //     )
    //   );
    // }
    // if (directories.length < 1 && !domain) {
    //   console.log(
    //     Logger.color(
    //       `\n Domain provided has never been fetched : ${domain}`,
    //       "FgRed"
    //     ),
    //     '\n to serve non-saved domain turn the caching flag "-c" on .'
    //   );
    //   return false;
    // }
    return true;
});
exports.domainIsValid = domainIsValid;
//# sourceMappingURL=domainIsValid.js.map