#!/usr/bin/env node

import { setGlobal } from "./utils/index";
import scrapper from "./scrapper";
import cli_args from "./cli_args";
import server from "./server";
import path from "path";
import Logger from "./classes/Logger";
import { showHidden } from "yargs";
import domainHandler from "./handleDomainInteraction";

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

    const dataBasePath = cli_args.database ? path.join(process.cwd(), cli_args.database[0] || "") : undefined

    scrapper.start(
      startingUrls,
      path.join(process.cwd(), cli_args.dest || ""),
      parseInt(cli_args["max-request-per-second"]),
      dataBasePath,
      cli_args["reset-history"]
    );
    break;

  case "serve":

    const _emptyArray: string[] = [];

    const domainOfInterest = _emptyArray
    .concat(
      cli_args["authorized-domain"] || []
    )
    .map( (domain) => new RegExp(domain, "i")) as RegExp[] ;

    server.start({
      port: parseInt(cli_args.port),
      activeDomain: cli_args["domain"],
      activeCaching: cli_args["active-caching"],
      domainOfInterest: domainOfInterest
    });
    break;

  case "domain":
    domainHandler(cli_args);
    break;

  default:
    console.log(
      "\nWelcome to scraper-copier, type ",
      Logger.color("--help ", "FgYellow"),
      " to get a list of available command :).\n"
    );
}
