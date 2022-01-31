import path from "path";
const fs = require("fs");
import Logger from "../classes/Logger";
import { insertIn } from "../utils";

/**
 * Processes html before write to local path
 *
 * @param data string content of html document
 * @returns processed html string
 */
function processHTML(HTML: string): string {
  const scriptToInject =
    `<script src='/helpers/html'></script>`;

  const matched = HTML.match(/<[^(<|>)]*?head[^(<|>)]*?>/);

  if (!matched?.index) {
    throw new Error("Head is not found.");
  }

  const insertIndex = matched.index + matched[0].length;

  return insertIn(HTML, insertIndex, scriptToInject);
}

/**
 * Write data string or json object to given directory under given fileName
 *
 * @param data data string to write in file
 * @param localDirectory directory where to write the file
 * @param fileName name of the file to write
 */
const writeFile = async (
  data: string,
  localDirectory: string,
  file: FileObject,
  callback: (error: CustomError | null) => void
) => {
  const destination = path.join(localDirectory, file.name);

  if (typeof data === "object") {
    try {
      data = JSON.stringify(data);
    } catch (err) {
      callback({ message: "could not convert object file to json" });
      return;
    }
  } else if (file.extension === "html") {
    try {
      data = processHTML(data);
    } catch (err) {
      console.log(
        Logger.color(
          "- File : Could not inject js " + destination + "\n",
          "FgRed"
        )
      );
    }
  }

  await fs.writeFile(destination, data, (err: Error) => {
    if (err) {
      callback({ message: `Unable to write file on path ${destination}` });
    } else {
      callback(null);
    }
  });
};

export default writeFile;
