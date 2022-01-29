import path from "path";
import getPathAndFileName from "../lib/getPathAndFileName";

const R = global._target_directory;

const tests = [
  {
    description: "should return normalized path and file name",
    input: "https://test.com/daniel",
    output: [path.join(process.cwd(), "test.com/daniel"), "index.html", "html"],
  },
  {
    description: "should return index.html if at website root",
    input: "https://test.gov",
    output: [path.join(process.cwd(), "test.gov"), "index.html", "html"],
  },
  {
    description: "should ignore # link position",
    input: "https://jonny.me#about",
    output: [path.join(process.cwd(), "jonny.me"), "index.html", "html"],
  },
  {
    description: "should ignore url query",
    input: "https://cool.me/daniel?number=different",
    output: [
      path.join(process.cwd(), "cool.me/daniel"),
      "index?number=different.html",
      "html",
    ],

  },

  {
    description: "should return correct result",
    input: "https://komlankodoh.com/#Home",
    output: [path.join(process.cwd(), "komlankodoh.com"), "index.html", "html"],
  },
  {
    description: "should return normalized path and file name",
    input: "https://test.com/daniel/root?person=randomized#home",
    output: [
      path.join(process.cwd(), "test.com/daniel/root"),
      "index?person=randomized.html",
      "html",
    ],
  },
  {
    description: "should ignore both query and location.hash",
    input: "https://test.com/daniel/root/?person=randomized#home",
    output: [
      path.join(process.cwd(), "test.com/daniel/root"),
      "index?person=randomized.html",
      "html",
    ],
  },
  {
    description: "should only consider last .[any letters] as file extension",
    input: "https://test.com/daniel/root/styles.min.css",
    output: [
      path.join(process.cwd(), "test.com/daniel/root"),
      "styles.min.css",
      "css",
    ],
  },
];

describe("Obtain destination path and file name", () => {
  tests.forEach((test) => {
    it(test.description, () => {
      const result = getPathAndFileName(new URL(test.input), path.join(process.cwd(), global._target_directory || ""));
      expect(result).toEqual(test.output);
    });
  });
});
