#!/usr/bin/env node

import { setGlobal } from "./utils/index";
import scrapper from "./scrapper";
import cli_args from "./cli_args";
import server from "./server";
import path from "path";
import Logger from "./classes/Logger";
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
    setGlobal("_target_directory", cli_args.dest);

    setGlobal(
      "_authorized_domain",
      // adding domain from which the initial urls are fetched from;
      cli_args["authorized-domain"].concat(
        cli_args.roots.map(
          (url: string) => new RegExp(new URL(url).hostname as string, "i")
        )
      )
    );

    const dataBasePath = cli_args.database
      ? path.join(process.cwd(), cli_args.database[0] || "")
      : undefined;

    scrapper.start({
      dataBasePath,
      startingURls: cli_args.roots,
      resetLink: cli_args["reset-history"],
      destDirectory: path.join(process.cwd(), cli_args.dest || ""),
      maxRequestPerSecond: parseInt(cli_args["max-request-per-second"] || "5"),
    });

    break;

  case "serve":
    server.start({
      port: parseInt(cli_args.port),
      activeDomain: cli_args["domain"],
      activeCaching: cli_args["active-caching"],
      domainOfInterest: cli_args["authorized-domain"],
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



