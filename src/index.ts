#!/usr/bin/env node

import scrapper from "./scrapper";
import cli_args from "./cli_args";
import { castArray } from "./utils";

if (cli_args.dest && !global._target_directory) {
  global._target_directory = cli_args.dest;
}

if (!cli_args.url) {
  console.log("Hello, welcome to scraper interface.");
  console.log('execute the command "scraper --help" for more information.');
  process.exit()
}


scrapper.start(castArray(cli_args.url));
