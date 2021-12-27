const fs = require("fs");
const request = require("request");

export default function (
  uri: string,
  filename: string,
  callback: (arg: any) => void
) {
  return new Promise((resolve, refect) =>
    request.head(uri, async function (err, res, body) {
      request(uri)
        .pipe(fs.createWriteStream(filename))
        .on("close", (arg) => {
          callback(arg);
          resolve("cool");
        });
    })
  );
}
