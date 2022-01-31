#!/usr/bin/env node

import { setGlobal } from "./utils/index";
import scrapper from "./scrapper";
import cli_args from "./cli_args";
import server from "./server";
import path from "path";
import Logger from "./classes/Logger";

if (process.platform === "win32") {
  var rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("SIGINT", function () {
    //@ts-ignore
    process.emit("SIGINT");
  });
}

switch (cli_args._[0]) {
  case "load":
    const startingUrls = ([cli_args.url].concat(cli_args.roots || []) ||
      []) as string[];

    setGlobal("_target_directory", cli_args.dest);


    const emptyArray: string[] = [];
    setGlobal(
      "_authorized_domain",
      emptyArray
        .concat(
          cli_args["authorized-domain"] || [],
          startingUrls.map((url: string) => new URL(url).hostname as string)
        )
        .map((domain) => new RegExp(domain, "i")) as RegExp[]
    );

    scrapper.start(startingUrls);
    break;

  case "serve":
    setGlobal("_public_dir", path.join(process.cwd(), cli_args.public));
    server.start(parseInt(cli_args.port));
    break;

  default:
    console.log(
      "Welcome to scraper-copier, type ",
      Logger.color("--help ", "FgYellow"),
      " to get a list of available command :)."
    );
}
