"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertIn = exports.firstEncounter = exports.setGlobal = exports.castArray = exports.createInsertValues = void 0;
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
const setGlobal = (variableName, value) => {
    // @ts-ignore
    if (!global[variableName]) {
        // @ts-ignore
        global[variableName] = value;
    }
    else {
        throw new Error("Trying to set to existing global variable : " + variableName);
    }
};
exports.setGlobal = setGlobal;
const firstEncounter = (string, target, origin) => {
    if (origin === "l") {
        for (let i = 0; i < string.length; i++) {
            if (string[i] === target)
                return i;
        }
    }
    else if (origin === "r") {
        for (let i = string.length - 1; i >= 0; i--) {
            if (string[i] === target)
                return i;
        }
    }
    return null;
};
exports.firstEncounter = firstEncounter;
const insertIn = (receiver, index, stringToInsert) => receiver.slice(0, index) + stringToInsert + receiver.slice(index);
exports.insertIn = insertIn;
//# sourceMappingURL=index.js.map