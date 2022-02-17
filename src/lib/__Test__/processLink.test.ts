import { runTest } from "../../utils/runTest";
import processLink from "../processLink";

const processLinkTestFunction = (
  link: string,
  sourceUrl: URL,
  authorizedDomain?: RegExp[]
): string[] => {
  const new_link: string[] = [];

  processLink(link, sourceUrl, new_link, authorizedDomain);
  return new_link;
};

describe("ProcessLink test", () => {
  runTest(
    [
      {
        description: "should extends from root if starts with '/'",
        input: ["/daniel", new URL("https://test.com/info")],
        expectedOutput: ["https://test.com/daniel"],
      },
      {
        description:
          "should extends from current parent folder if relative path",
        input: ["./daniel", new URL("https://test.com/info")],
        expectedOutput: ["https://test.com/daniel"],
      },
      {
        description:
          "should extends from root if no path indicator is specified",
        input: ["daniel", new URL("https://test.com/info")],
        expectedOutput: ["https://test.com/daniel"],
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
        expectedOutput: [
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
        expectedOutput: [],
      },
      {
        description:
          "should not validate https link not included in authorized domain",
        input: [
          "https://www.somedomain.com/daniel",
          new URL("https://test.com/info"),
          [/www.someDifferentDomain.com/],
        ],
        expectedOutput: [],
      },
      {
        description:
          "Https link should be kept identical if not having hash location",
        input: [
          "https://github.blog/wp-content/uploads/2022/01/git-2-35-github-highlights.png?resize=1200%2C630",
          new URL("https://github.blog/"),
          [/github\.blog/],
        ],
        expectedOutput: [
          "https://github.blog/wp-content/uploads/2022/01/git-2-35-github-highlights.png?resize=1200%2C630",
        ],
      },
      {
        description:
          "should validate external url if domain passed as authorized domain",
        input: [
          "https://ww1.animesimple.com/series/2937-angel-links-anime.html",
          new URL("https://test.com/info"),
          [new RegExp("animesimple.com", "i")],
        ],
        expectedOutput: [
          "https://ww1.animesimple.com/series/2937-angel-links-anime.html",
        ],
      },

      {
        description: "Should ignore queries in origin url",
        input: [
          "./randomText.html",
          new URL("https://ww1.animesimple.com/browse/genre.html?name=daniel"),
        ],
        expectedOutput: ["https://ww1.animesimple.com/browse/randomText.html"],
      },
      {
        description: "Should ignore location.hash in origin url",
        input: [
          "./randomText.html",
          new URL("https://ww1.animesimple.com/browse/genre.html#subject"),
        ],
        expectedOutput: ["https://ww1.animesimple.com/browse/randomText.html"],
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
        expectedOutput: ["https://ww1.animesimple.com/browse/randomText.html"],
      },
      {
        description: "Should include queries from retrieved links",
        input: [
          "./randomText.html?query1=one",
          new URL("https://ww1.animesimple.com/browse/genre.html"),
        ],
        expectedOutput: [
          "https://ww1.animesimple.com/browse/randomText.html?query1=one",
        ],
      },
      {
        description:
          "Should not include include location hash from retrieved link",
        input: [
          "./randomText.html#subject",
          new URL("https://ww1.animesimple.com/browse/genre.html"),
        ],
        expectedOutput: ["https://ww1.animesimple.com/browse/randomText.html"],
      },
      {
        description:
          "Should not include include location hash from retrieved link",
        input: [
          "static/js/vendor.c87d3841a0183ddd315e.js",
          new URL("https://anvaka.github.io/fieldplay/"),
        ],
        expectedOutput: ["https://anvaka.github.io/fieldplay/static/js/vendor.c87d3841a0183ddd315e.js"],
      },
      {
        description:
          "Should include queries but live out the location.hash from retrieved links",
        input: [
          "./randomText.html?query1=one#random subjects",
          new URL("https://ww1.animesimple.com/browse/genre.html"),
        ],
        expectedOutput: [
          "https://ww1.animesimple.com/browse/randomText.html?query1=one",
        ],
      },
      {
        description: "",
        input: [
          "./lib/fonts/fontawesome.woff2?14663396",
          new URL("https://www.w3schools.com/"),
        ],
        expectedOutput: [
          "https://www.w3schools.com/lib/fonts/fontawesome.woff2?14663396",
        ],
      },
    ],
    processLinkTestFunction
  );
});
