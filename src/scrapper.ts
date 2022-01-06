import TimeCounter from "./utils/counter";

import db from "./connect";
import cloneFile from "./lib/cloneFile";

var axios_request = { current: 0 };

const clone_n_path = async (n) => {
  const nexts = await db.find_next(5);

  if (nexts.length === 0) {

    return false;
  }

  const cloning = nexts.map(
    async ({ link, popularity }) => await cloneFile(link, axios_request)
  );

  await Promise.all(cloning);

  return true;
};

const start = async (target_url: string[]) => {
  await  db.init(...target_url)

  const MAX_RUN_TIME = 10;
  const counter = new TimeCounter();

  for (let i = 0; i <= 5000000000; i++) {
    const pursue = await clone_n_path(5);
    if (!pursue || counter.minutes >= MAX_RUN_TIME) break;
    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
  }

  console.log("\x1b[37m\nProcess Completed");
  console.log(`Total axios request : ${axios_request.current} \n`);
};

export default { start };
