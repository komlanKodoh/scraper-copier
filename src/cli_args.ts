const yargs = require("yargs");

const cli_args = yargs
  .command("load", "Load a page from remote url to your given location", {
    url: {
      description: "url of the website to be scanned",
      alias: "u",
      type: "array",
      required: true,
    },
    dest: {
      description: "folder destination of the content",
      alias: "d",
      type: "string"
    }
  })
  .command("")
  .option("light", {
    alias: "l",
    description: "reduces the amount of information logged to the console",
    type: "boolean",
  })
  .help()
  .alias("help", "h").argv;

export default cli_args;
