import { blob } from "stream/consumers";
import yargs, { boolean } from "yargs";
const cli_args = yargs
  .command(
    "load <url> [dest]",
    "load domain starting from url to given destination",
    (yargs: yargs.Argv) => {
      yargs
        .positional("url", {
          describe: "root element to start the process from",
          type: "string",
        })
        .positional("dest", {
          describe: "destination folder",
          default: ".",
        })
        .option("database", {
          alias: "d",
          type: "string",
          description: "choose the database to start the process from",
        })
        .option("roots", {
          alias: "r",
          type: "string",
          description: "supplemental root element to start the process from",
        })
        .option("max-request-per-second", {
          alias: "m",
          type: "number",
          description: "",
        })
        .option("keep-history", {
          alias: "h",
          type: "boolean",
          description:
            "tells the scrapper if you want to continue using the previous urls.",
        });
    }
  )
  .command(
    "serve <domain>",
    "Serve the cloned website in local machine",
    (yargs) => {
      yargs
        .positional("domain", {
          description: "domain Name without protocol (http / https)",
          type: "string",
        })
        .option("port", {
          alias: "p",
          type: "number",
          default: "3000",
          description: "port to which start the server on",
        })
        .option("active-caching", {
          alias: "c",
          type: "boolean",
          default: true,
          description:
            "Fetches a requested resource if it has not been fetched yet. ",
        })
        .option("reset-history", {
          alias: "r",
          type: "boolean",
          description: "reset the history of previously scrapped link",
        });
    }
  )
  .command("domain", "Interact with scraper cached data", (yargs) => {
    yargs
      .option("database", {
        alias: "d",
        description: "choose the database to start the process from",
      })
      .command("show", "shows all domain previously scrapped")

      .option("port", {
        alias: "p",
        type: "number",
        default: "3000",
        description: "port to which start the server on",
      })
      .option("active-caching", {
        alias: "c",
        type: "boolean",
        default: true,
        description:
          "Fetches a requested resource if it has not been fetched yet. ",
      });
  })
  .option("light", {
    alias: "l",
    description:
      "reduce logging to essential information (under developments )",
    type: "boolean",
  })
  .option("authorized-domain", {
    alias: "d",
    type: "array",
    description: "a list of authorized domain that the scrapper can extends to",
  })

  .help()
  .alias("help", "h").argv;

type cli_args = typeof cli_args & {
  domain: string;
  port: string;
  dest: string;
  database: string;
  "reset-history": boolean;
  "active-caching": boolean;
  "authorized-domain": string[];
  "max-request-per-second": string;
};

export default cli_args as cli_args;

