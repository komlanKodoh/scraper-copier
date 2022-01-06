import formatLink from "../lib/formatLink";

const R = process.env.ROOT;

const tests = [
  {
    description: "should start from domain name if root",
    input: ["/daniel", new URL("https://test.com/info")],
    output: ["https://test.com/daniel"],
  },
  {
    description: "should start from current location if relative path",
    input: ["./daniel", new URL("https://test.com/info")],
    output: ["https://test.com/info/daniel"],
  },
  {
    description:
      "should start add '/' if absent from link and treat as relative path",
    input: ["daniel", new URL("https://test.com/info")],
    output: ["https://test.com/info/daniel"],
  },
];

describe("formatLink should format link in usabble format in the dabase", () => {
  tests.forEach((test) => {
    it(test.description, () => {
      const new_link = [];

      formatLink(test.input[0] as string, test.input[1] as URL, new_link);
      expect(new_link).toEqual(test.output);
    });
  });
});
