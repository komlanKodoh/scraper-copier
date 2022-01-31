
import fs from "fs";
const request = require("request");

/**
 * Downloads image from remote url to local path
 * 
 * NOTE: Nested directory must be created in advance; That could be achieved using the ensurePath utilityFunction. 
 * 
 * @param uri remote url location of image
 * @param localDirectory path  where to write the image
 * @param callback 
 * @returns 
 */

const downloadImg =  function (
  uri: string,
  localDirectory: string,
  file: FileObject,
  callback: (error: CustomError | null ) => void
) {
  return new Promise<void>((resolve) =>
    request.head(uri, async function () {
      request(uri)
        .pipe(fs.createWriteStream(localDirectory))
        .on("close", () => {
          callback(null);
          resolve();
        });
    })
  );
}

export default downloadImg;