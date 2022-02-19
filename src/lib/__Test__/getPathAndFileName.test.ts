import path from "path";
import { runTest } from "../../utils/runTest";
import getPathAndFileName from "../getPathAndFileName";

const getPathAndFileNameTestFunction = (url: string, root?: string) => {
  return getPathAndFileName(new URL(url), root);
};

const getBase64 = (str: string) => {
  return Buffer.from(str).toString('base64')
} 
describe("Obtain destination path and file name", () => {
  runTest(
    [
      {
        description: "should return normalized path and file name",
        input: ["https://test.com/daniel"],
        expectedOutput: ["test.com/daniel", "index.html", "html"],
      },
      {
        description: "should return index.html if at website root",
        input: ["https://test.gov"],
        expectedOutput: ["test.gov", "index.html", "html"],
      },
      {
        description: "should ignore # link position",
        input: ["https://jonny.me#about"],
        expectedOutput: ["jonny.me", "index.html", "html"],
      },
      {
        description: "should ignore url query",
        input: ["https://cool.me/daniel?number=different"],
        expectedOutput: [
          "cool.me/daniel",
          "index" + getBase64("?number=different") + ".html",
          "html",
        ],
      },

      {
        description: "should return correct result",
        input: ["https://komlankodoh.com/#Home"],
        expectedOutput: ["komlankodoh.com", "index.html", "html"],
      },
      {
        description: "should return normalized path and file name",
        input: ["https://test.com/daniel/root?person=randomized#home"],
        expectedOutput: [
          "test.com/daniel/root",
          "index" + getBase64("?person=randomized") + ".html",
          "html",
        ],
      },
      {
        description: "should ignore both query and location.hash",
        input: ["https://test.com/daniel/root/?person=randomized#home"],
        expectedOutput: [
          "test.com/daniel/root",
          "index" + getBase64("?person=randomized") + ".html",
          "html",
        ],
      },
      {
        description:
          "should only consider last .[any letters] as file extension",
        input: ["https://test.com/daniel/root/styles.min.css", ""],
        expectedOutput: ["test.com/daniel/root", "styles.min.css", "css"],
      },
    ],
    getPathAndFileNameTestFunction
  );
});
