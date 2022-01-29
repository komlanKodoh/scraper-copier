#!/usr/bin/env node

import { setGlobal } from "./utils/index";

import scrapper from "./scrapper";
import cli_args from "./cli_args";
import { castArray } from "./utils";
import server from "./server";
import path from "path";
import Logger from "./classes/Logger";

switch (cli_args._[0]) {
  case "load":
    const startingUrls = [cli_args.url].concat(cli_args.roots || []) || [];

    setGlobal("_target_directory", cli_args.dest);

    setGlobal(
      "_authorized_domain",
      []
        .concat(
          cli_args["authorized-domain"] || [],
          startingUrls.map((url) => new URL(url).hostname)
        )
        .map((domain) => new RegExp(domain, "i"))
    );

    scrapper.start(startingUrls);
    break;

  case "serve":
    setGlobal("_public_dir", path.join(process.cwd(), cli_args.public));
    server.start(5000);

  default:
    console.log(
      "Welcome to scraper-copier, type ",
      Logger.color("--help ", "FgYellow"),
      " to get a list of available command :)."
    );
}
