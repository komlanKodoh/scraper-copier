"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.castArray = exports.createInsertValues = exports.getFileExtension = void 0;
const getFileExtension = (fileName, if_none) => {
    const temp_arr = fileName.split(".");
    if (temp_arr.length >= 2)
        return temp_arr.pop();
    else
        return if_none !== null && if_none !== void 0 ? if_none : null;
};
exports.getFileExtension = getFileExtension;
const createInsertValues = (links) => {
    let values = "";
    const len = links.length;
    for (let i = 0; i < len - 1; i++) {
        values += `("${links[i]}", 1),`;
    }
    values += `("${links[len - 1]}",1)`;
    return values;
};
exports.createInsertValues = createInsertValues;
const castArray = (arg) => {
    return Array.isArray(arg) ? arg : [arg];
};
exports.castArray = castArray;
//# sourceMappingURL=index.js.map