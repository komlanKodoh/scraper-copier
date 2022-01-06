import path from "path";
import getPathAndFileName from "../lib/getPathAndFileName";

const R = global._target_directory;

const tests = [
  {
    description: "should return normalized path and file name",
    input: "https://test.com/daniel",
    output: [path.join(process.cwd(), "test.com"), "daniel.html", "html"],
  },
  {
    description: "should return index.html if at website root",
    input: "https://test.gov",
    output: [ path.join(process.cwd(), "test.gov") , "index.html", "html"],
  },
  {
    description: "should ignore # link position",
    input: "https://jonny.me#about",
    output: [ path.join(process.cwd(),  "jonny.me"), "index.html", "html"]
  },
  {
    description: "should ignore url query",
    input: "https://cool.me/daniel?number=different",
    output: [ path.join(process.cwd(),  "cool.me"), "daniel.html", "html"]
  },
  {
    description: "should return correct result",
    input : "https://komlankodoh.com/#Home",
    output: [ path.join(process.cwd(), "komlankodoh.com"), "index.html","html"]
  }
];

describe("Obtain destination path and file name", () => {
  tests.forEach((test) => {
    it(test.description, () => {
      const result = getPathAndFileName(test.input);
      expect(result).toEqual(test.output);
    });
  });
});
