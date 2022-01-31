import { array } from "yargs";

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
          description: "give database to start the process from",
        })
        .option("roots", {
          alias: "r",
          type: "string",
          description: "supplemental root element to start the process from",
        })
        .option("authorize-domain", {
          alias: "d",
          type: "array",
          description:
            "a list of authorized domain that the scrapper can extends to",
        });
    }
  )
  .command(
    "serve <public>",
    "Serve the cloned website in local machine",
    (yargs) => {
      yargs
        .positional("public", {
          description: "public directory to static files create by server load",
          type: "string",
        })
        .option("port", {
          alias: "p",
          type: "number",
          default: "3000",
          description: "port to which start the server on",
        });
    }
  )
  .option("light", {
    alias: "l",
    description:
      "reduce logging to essential information (under developments )",
    type: "boolean",
  })

  .help()
  .alias("help", "h").argv;

type cli_args = typeof cli_args & {"authorized-domain": string[], "public": string, "port": string};

export default cli_args as cli_args;
