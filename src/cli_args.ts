
import yargs from "yargs";

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
          default: [],
          type: "array",
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
    alias: "auth",
    type: "array",
    description: "a list of authorized domain that the scrapper can extends to",
  })

  .help()
  .alias("help", "h").argv;

type ProcessedCliArgs ={
  _: string[];
  port: string;
  dest: string;
  domain: string;
  roots: string[];
  database: string;
  "reset-history": boolean;
  "active-caching": boolean;
  "authorized-domain": RegExp[];
  "max-request-per-second": string;
};

const processedCliArgs = cli_args as unknown as ProcessedCliArgs;

// process of regular expression strings passed for the authorized domains
const emptyArray: any[] = [];
processedCliArgs["authorized-domain"] = emptyArray
.concat(
  cli_args["authorized-domain"] || []
)
.map((domain) => new RegExp(domain, "i")) as RegExp[]


// merge of unique url and array passed as roots (-r parameter);
const uniqueURL = cli_args.url as string;
if (uniqueURL) processedCliArgs.roots.push(uniqueURL);

export default processedCliArgs;

