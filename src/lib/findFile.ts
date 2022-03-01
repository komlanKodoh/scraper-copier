import { ScrapperFile } from './../classes/ScrapperFile';
import fs from "fs";
import path from "path";



/**
 * Given a list of root directories, and a remote url. This function returns
 *  the local equivalent of the remote file.
 * 
 * @param rootDirectories directories containing domainDirectory mocks of the forme komlankodoh.com
 * @param url 
 * @returns 
 */
export async function findFile(rootDirectories: string[], file: ScrapperFile) {

  const rawFilePath = path.join(file.directory, file.name + file.extension);

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
