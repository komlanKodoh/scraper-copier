import formatLink from "../lib/processLink";

const R = process.env.ROOT;

const tests = [
  {
    description: "should extends from root if starts with '/'",
    input: ["/daniel", new URL("https://test.com/info")],
    output: ["https://test.com/daniel"],
  },
  {
    description: "should extends from current parent folder if relative path",
    input: ["./daniel", new URL("https://test.com/info")],
    output: ["https://test.com/daniel"],
  },
  {
    description: "should extends from root if no path indicator is specified",
    input: ["daniel", new URL("https://test.com/info")],
    output: ["https://test.com/daniel"],
  },
  {
    description:
      "should root to parent folder when link string starts with '../' ",
    input: [
      "../fonts/roboto-italic.woff",
      new URL(
        "https://static.snyk.io/prod/static-assets/style/build/styles/app.min.a6b970f63ea57cbed92ff9b98db4b6db.md5.css"
      ),
    ],
    output: [
      "https://static.snyk.io/prod/static-assets/style/build/fonts/roboto-italic.woff",
    ],
  },
  {
    description:
      "should not validate https link if no authorized domain is passed",
    input: [
      "https://www.somedomain.com/daniel",
      new URL("https://test.com/info"),
      [],
    ],
    output: [],
  },
  {
    description:
      "should not validate https link not included in authorized domain",
    input: [
      "https://www.somedomain.com/daniel",
      new URL("https://test.com/info"),
      [/www.someDifferentDomain.com/],
    ],
    output: [],
  },
  {
    description:
      "should validate external url if domain passed as authorized domain",
    input: [
      "https://ww1.animesimple.com/series/2937-angel-links-anime.html",
      new URL("https://test.com/info"),
      [new RegExp("animesimple.com", "i")],
    ],
    output: ["https://ww1.animesimple.com/series/2937-angel-links-anime.html"],
  },

  {
    description: "Should ignore queries in origin url",
    input: [
      "./randomText.html",
      new URL("https://ww1.animesimple.com/browse/genre.html?name=daniel"),
    ],
    output: ["https://ww1.animesimple.com/browse/randomText.html"],
  },
  {
    description: "Should ignore location.hash in origin url",
    input: [
      "./randomText.html",
      new URL("https://ww1.animesimple.com/browse/genre.html#subject"),
    ],
    output: ["https://ww1.animesimple.com/browse/randomText.html"],
  },
  {
    description:
      "Should ignore location.hash and queries when present simultaneously in origin url",
    input: [
      "./randomText.html",
      new URL(
        "https://ww1.animesimple.com/browse/genre.html?query1=one&query2=two#subject"
      ),
    ],
    output: ["https://ww1.animesimple.com/browse/randomText.html"],
  },
  {
    description: "Should include queries from retrieved links",
    input: [
      "./randomText.html?query1=one",
      new URL("https://ww1.animesimple.com/browse/genre.html"),
    ],
    output: ["https://ww1.animesimple.com/browse/randomText.html?query1=one"],
  },
  {
    description: "Should not include include location hash from retrieved link",
    input: [
      "./randomText.html#subject",
      new URL("https://ww1.animesimple.com/browse/genre.html"),
    ],
    output: ["https://ww1.animesimple.com/browse/randomText.html"],
  },
  {
    description: "Should include queries but live out the location.hash from retrieved links",
    input: [
      "./randomText.html?query1=one#random subjects",
      new URL("https://ww1.animesimple.com/browse/genre.html"),
    ],
    output: ["https://ww1.animesimple.com/browse/randomText.html?query1=one"],
  },
];

describe("formatLink should format link in usabble format in the dabase", () => {
  tests.forEach((test) => {
    it(test.description, () => {
      const new_link = [];

      formatLink(
        test.input[0] as string,
        test.input[1] as URL,
        new_link,
        test.input[2] as RegExp[]
      );
      expect(new_link).toEqual(test.output);
    });
  });
});
