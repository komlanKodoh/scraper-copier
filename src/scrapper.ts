import TimeCounter from "./utils/counter";

import db from "./connect";
import cloneFile from "./lib/cloneFile";
import path from "path";

var axios_request = { current: 0 };

const clone_n_path = async (n: number) => {
  const nexts = await db.find_next(n);

  if (nexts.length === 0) {
    return false;
  }

  const cloning = nexts.map(
    async ({ link, popularity }) => await cloneFile(link, axios_request)
  );

  await Promise.all(cloning);

  return true;
};

const start = async (target_url: string[], MAX_RUN_TIME?: number) => {
  await db.init(target_url, path.join(__dirname, ".default_scraper.db"));

  const counter = new TimeCounter();

  while (true) {
    const pursue = await clone_n_path(200);

    if (!pursue || (MAX_RUN_TIME && counter.minutes >= MAX_RUN_TIME)) break;
  }

  console.log("\x1b[37m\nProcess Completed");
  console.log(`Total axios request : ${axios_request.current} \n`);
};

export default { start };
