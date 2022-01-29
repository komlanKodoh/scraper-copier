import formatLink from "../lib/processLink";

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
  {
    description:
      "should start add '/' if absent from link and treat as relative path",
    input: [
      "https://ww1.animesimple.com/series/2937-angel-links-anime.html",
      new URL("https://test.com/info"),
      [new RegExp("animesimple.com", "i")],
    ],
    output: ["https://ww1.animesimple.com/series/2937-angel-links-anime.html"],
  },
  {
    description:
      "Should retrieve link for resources with authorized domain names",
    input: [
      "./movies/4164-shishunki-bishoujo-gattai-robo-z-mind-anime.html",
      new URL("https://ww1.animesimple.com/browse/genre.html"),
      [new RegExp("animesimple.com", "i")],
    ],
    output: [
      "https://ww1.animesimple.com/browse/genre/movies/4164-shishunki-bishoujo-gattai-robo-z-mind-anime.html",
    ],
  },
  {
    description:
      "Should ignore queries",
    input: [
      "./4164-shishunki-bishoujo-gattai-robo-z-mind-anime.html",
      new URL("https://ww1.animesimple.com/browse/genre.html?name=daniel"),
      [new RegExp("animesimple.com", "i")],
    ],
    output: [
      "https://ww1.animesimple.com/browse/genre/4164-shishunki-bishoujo-gattai-robo-z-mind-anime.html",
    ],
  },
  {
    description:
      "Should ignore queries",
    input: [
      "./public/js",
      new URL("https://ww1.animesimple.com/watch/216711-platinum-end-episode-11-anime.html"),
      [new RegExp("animesimple.com", "i")],
    ],
    output: [
      "https://ww1.animesimple.com/watch/216711-platinum-end-episode-11-anime/public/js",
    ],
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
