import cloneFile from "./lib/cloneFile";
import path from "path";
import Logger from "./classes/Logger";
import ProcessManager from "./classes/ProcessManager";
import ScraperManager from "./classes/ScraperManager";

var axios_request = { current: 0 };

const cloneRemoteUrls = async (
  numberOfUrls: number,
  processManager: ProcessManager
) => {
  const nexts = await processManager.findNext(numberOfUrls);
  if (nexts.length === 0) return false;

  const cloning = nexts.map(
    async ({ link, popularity }) => await cloneFile(link, processManager)
  );

  await Promise.all(cloning);
  return true;
};

const start = async (
  target_url: string[],
  destDirectory: string,
  maxRequestPerSecond: number = 5
) => {
  const dbPath = path.join(__dirname, ".default_scraper.db");

  const processManager = await new ProcessManager(destDirectory, {
    maxRequestPerSecond: maxRequestPerSecond,
  }).init({
    dbPath,
    scraperRootUrls: target_url,
  });

  process.on("SIGINT", async () => {
    await processManager.cleanExit();
    process.exit();
  });

  while (true) {
    // 250 was arbitrary chosen to signify the number of request to boot at the same time,
    // the process manager internally takes care of scheduling the request to not overwhelm servers;

    const pursue = await cloneRemoteUrls(250, processManager);
    if (!pursue) break;
  }

  await processManager.cleanExit();

  return;
};

export default { start };
