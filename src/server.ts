import path from "path";
import Logger from "./classes/Logger";
import getPathAndFileName from "./lib/getPathAndFileName";
import fs from "fs";
import express from "express";
import ProcessManager from "./classes/ProcessManager";
const app = express();

(async () => {
  const dbPath = path.join(__dirname, ".default_scraper.db");

  const processManager = new ProcessManager();
  await processManager.initDb(dbPath);
  const domainTracker = await processManager.initDomainTracker();

  // app.get("/proxy", (req, res) => {
  //   let url;
  //   try {
  //     const rawUrl = req.query.url as string;
  //     url = new URL(rawUrl);
  //   }catch(e){
  //     res.status(400).send("The URL passed is invalid")
  //     return;
  //   }

  //   const resourcePath = domainTracker.getPath(url.host);
    
  // });


  app.get("/helpers/html", (req, res) => {
    console.log(Logger.color("I was requested malicious", "FgBlue"));
    res.sendFile(path.join(__dirname, "malicious/html.js"));
  });


  app.get("*", async (req, res) => {
    if (/\.\.\//.test(req.url))
      console.log(
        Logger.color("\t request failure : non existing directory", "FgRed")
      );
    // await processManager.initDb(dbPath);
    // console.log(await domainTracker.getPath("komlankodoh.com"))
    const url = "https:/" + path.join(global._public_dir, req.url);
    const [directory, fileName] = getPathAndFileName(new URL(url), "/");
    const filePath = path.join(directory, fileName);
    fs.access(filePath, (error) => {
      if (!error) {
        res.sendFile(filePath),
          console.log(
            "requested file send : ",
            Logger.color(`${filePath}`, "FgGreen")
          );
      } else {
        console.log(
          "requested file  NoFound: ",
          Logger.color(`${filePath}`, "FgRed")
        );
        res.sendStatus(404);
      }
    });
  });
})();

class ServerAPI {
  constructor() {}

  static start(port: number) {
    app.listen(port, () => {
      console.log(`App listening on port ${Logger.color(port, "FgGreen")}`);
    });
  }
}

export default ServerAPI;
