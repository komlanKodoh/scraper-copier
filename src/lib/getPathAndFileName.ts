import { firstEncounter } from "../utils";

const path = require("path");

/**
 *
 * @param fileName name of
 * @param if_none what to return if extension
 * @returns
 */
export const getFileExtension = (fileName: string, if_none?: string) => {
  const temp_arr = fileName.split(/([^\/]\.|\?)/g);

  if (temp_arr.length >= 2) return temp_arr[2];
  else return if_none ?? null;
};

/**
 * Extract directory, fileName, and fileExtension from valid url Object;
 *
 * NOTE: This functions moves the url query to before the file extension so that it can correctly 
 * be parse by operating system and web server;
 * File parsed with this method must be served using this method or a method with same signature.
 *
 * @param url url object
 * @returns Array of the shape [directory, fileName, fileExtension]
 */
const getPathAndFileName: (
  url: URL,
  root?: string
) => [directory: string, fileName: string, fileExtension: string] = (
  url: URL,
  root?: string
) => {
  let fullPath = path.join(url.hostname, url.pathname);

  // at index.html at the end of every path ending with a trailing "/"
  if (fullPath[fullPath.length - 1] === "/") fullPath += "index.html";

  const urlFileName = path.basename(fullPath);

  // get index for the where the first dot from the left is met
  let extensionIndex =
    firstEncounter(urlFileName, ".", "r") || urlFileName.length;

  let fileName_noFileExtension = urlFileName.slice(0, extensionIndex);
  let fileExtension = urlFileName.slice(extensionIndex);

  let directory = path.dirname(fullPath);

  if (!fileExtension) {
    directory = path.join(directory, fileName_noFileExtension);

    fileName_noFileExtension = "index";
    fileExtension = ".html";
  }

  return [
    path.join(root || "", directory),
    fileName_noFileExtension + encodeURIComponent(url.search),
    fileExtension,
  ];
};

export default getPathAndFileName;
