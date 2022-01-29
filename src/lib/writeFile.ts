import path from "path";
import Logger from "../classes/Logger";
import getPathAndFileName from "./getPathAndFileName";

const fs = require("fs");

export default async (data: string, web_path: string, fileName: string) => {
  if (typeof data === "object") {
    data = JSON.stringify(data);
  }
  const destination = path.join(web_path, fileName);

  await fs.writeFile(destination, data, (err) => {
    if (err) {
      // console.error(err);
      console.log(
        Logger.color("  - File : Not Found : " + destination, "FgRed")
      );
      return;
    }
  });
};
