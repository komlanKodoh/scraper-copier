import path from "path";
const fs = require("fs");
import Logger from "../classes/Logger";
import { ScrapperFile } from "../classes/ScrapperFile";
import { insertIn } from "../utils";
import { ensurePath } from "../utils/ensurePath";

/**
 * Processes html before write to local path
 *
 * @param data string content of html document
 * @returns processed html string
 */
export function processHTML(HTML: string, file: FileObject): string {
  const scriptToInject =
    `<script src='/helpers/main.js'></script>
     <script>
        window.__current__domain__name = "${file.remoteURL.hostname}";
     </script>`;

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
  file: ScrapperFile,
  callback: (error: CustomError | null) => void
) => {
  
  const destination = path.join(file.directory, file.name + file.extension);

  if (typeof data === "object") {
    try {
      data = JSON.stringify(data);
    } catch (err) {
      console.log("The error", err)
      callback({ message: "could not convert object file to json" });
      return;
    }
  } else if (file.extension === "html") {
    try {
      data = processHTML(data, file);
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
      console.log(err)
      callback({ message: `Unable to write file on path ${destination}` });
    } else {
      callback(null);
    }
  });
};

export default writeFile;
