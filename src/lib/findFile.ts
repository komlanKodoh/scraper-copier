import fs from "fs";
import path from "path";
import getPathAndFileName from "./getPathAndFileName";


/**
 * Given a list of root directories, and a remote url. This function returns
 *  the local equivalent of the remote file.
 * 
 * @param rootDirectories directories containing domainDirectory mocks of the forme komlankodoh.com
 * @param url 
 * @returns 
 */
export async function findFile(rootDirectories: string[], url: string) {
  const [fileDirectory, fileName] = getPathAndFileName(new URL(url));

  const rawFilePath = path.join(fileDirectory, fileName);

  for (let i = 0; i < rootDirectories.length; i++) {
    const destDirectory = rootDirectories[i];
    const filePath = path.join(destDirectory, rawFilePath);

    const pathIsValid = await new Promise((resolve) => {
      fs.access(filePath, (error) => {
        if (!error) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });

    if (pathIsValid) return filePath;
  }

  return null;
}
