"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTest = void 0;
function runGivenTest(tests, fn, getDescription, generator) {
    for (const [index, test] of tests.entries()) {
        let description = "";
        if (test.description) {
            description = test.description;
        }
        if (getDescription) {
            description = getDescription(test.input, test.expectedOutput, test.description, index);
        }
        description =
            description === "" ? "NO description could be determined" : description;
        it(description, () => {
            const result = fn(...test.input);
            expect(result).toEqual(test.expectedOutput);
        });
    }
    return;
}
/**
 *
 * @param tests tests to run of the form {input, output, description}
 * @param fn function to run to verify result
 * @param getDescription
 */
function runTest(tests, fn, getDescription) {
    runGivenTest(tests, fn, getDescription);
}
exports.runTest = runTest;
