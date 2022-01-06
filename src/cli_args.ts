const yargs = require("yargs");

const cli_args = yargs
  .command(
    "load <url> [dest]",
    "load domain starting from url to given destination",
    (yargs) => {
      yargs
        .positional("url", {
          describe: "URL to fetch content from",
          type: "array",
          default: "http://www.google.com",
        })
        .positional("dest", {
          describe: "destination folder",
          default: "."
        });
    }
  )
  .option("light", {
    alias: "l",
    description: "reduces the amount of information logged to the console",
    type: "boolean",
  })
  .help()
  .alias("help", "h").argv;

export default cli_args;