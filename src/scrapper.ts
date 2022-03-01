import cloneFile from "./lib/cloneFile";
import path from "path";
import ProcessManager from "./classes/ProcessManager";
import { ensurePath } from "./utils/ensurePath";

/**
 * Clone a specific number of unseen files to local directories.
 *
 * @param numberOfUrls Number of unseen url to clone to local dir
 * @param processManager A instance of the process manager class,
 * @returns True if it found file to load and false if there were no more file to load.
 */
const cloneRemoteUrls = async (
  numberOfUrls: number,
  processManager: ProcessManager
) => {
  const nexts = await processManager.findNext(numberOfUrls);
  if (nexts.length === 0) return false;

  const cloningPromises = nexts.map(
    async ({ link, popularity }) => await cloneFile(link, processManager)
  );

  await Promise.all(cloningPromises);
  return true;
};

type StarterConfig = {
  startingURls: string[];
  destDirectory: string;
  maxRequestPerSecond: number;
  dataBasePath?: string;
  resetLink?: boolean;
};

const start = async ({
  resetLink,
  startingURls,
  dataBasePath,
  destDirectory,
  maxRequestPerSecond,
}: StarterConfig) => {
  const dbPath = dataBasePath || path.join(__dirname, ".default_scraper.db");

  await ensurePath(path.dirname(dbPath));

  const processManager = await new ProcessManager(destDirectory, {
    maxRequestPerSecond,
  }).init({
    dbPath,
    scraperRootUrls: startingURls,
    resetLink,
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
