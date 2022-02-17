import path from "path";
import Logger from "./classes/Logger";
import getPathAndFileName from "./lib/getPathAndFileName";
import fs from "fs";
import express from "express";
import ProcessManager from "./classes/ProcessManager";
import axios from "axios";
import cloneFile from "./lib/cloneFile";
import { findFile } from "./lib/findFile";
import { processHTML } from "./lib/writeFile";
import { setGlobal } from "./utils";

const app = express();
const DefaultDirectory = path.join(process.cwd(), "./dest");

const config = {
  port: "3000",
  activeDomain: "",
  activeCaching: true,
};

(async () => {
  const dbPath = path.join(__dirname, ".default_scraper.db");

  const processManager = new ProcessManager(DefaultDirectory);

  await processManager.initDb(dbPath);

  const domainTracker = await processManager.initDomainTracker();
  await processManager.initScraperManager([]);

  const directories = await domainTracker.getRootDirectories(
    config.activeDomain
  );

  if (directories.length < 1 && !config.activeCaching) {
    console.log(
      Logger.color(
        `\n Domain provided has never been fetched : ${config.activeDomain}`,
        "FgRed"
      ),
      '\n if this is intended, try running with active caching "-c" on.'
    );
  }

  app.get<{}, {}, {}, { newDomain: "string" }>("/update-domain", (req, res) => {
    config.activeDomain = req.query.newDomain;
  });

  app.get("/myWorker.js", (_, res) => {
    res.sendFile(path.join(__dirname, "./helpers/sw.js"));
  });

  app.get("/helpers/matchingURL", () => {});

  app.use("/helpers", express.static(path.join(__dirname, "helpers")));

  app.get<{}, {}, {}, { url: string; updateDomain: string }>(
    "/",
    async (req, res) => {
      let resourceURL = decodeURIComponent(req.query.url);
      let shouldUpdateDomain = req.query.updateDomain;

      if (!resourceURL) return;

      const resourceURLObject = new URL(resourceURL);
      if (shouldUpdateDomain === "true") {
        config.activeDomain = resourceURLObject.host;
      }

      const requestURL = resourceURL.replace(
        /localhost:[0-9]+/,
        config.activeDomain
      );

      const directories = await domainTracker.getRootDirectories(
        config.activeDomain
      );

      const file = await findFile(directories, requestURL);

      console.log(
        "File successfully served From " +
          Logger.color("LocalStorage < -- >  ", "FgBlue") +
          Logger.color(requestURL, "FgGreen")
      );

      if (file) return res.sendFile(file);

      const response = await axios.get<string>(requestURL).catch(() => {
        console.log(
          "File " +
            Logger.color("Not Found  < -- >", "FgRed") +
            Logger.color(requestURL, "FgGreen")
        );
      });

      if (response) {
        console.log(
          "File successfully served From " +
            Logger.color("RemoteURL    < -- >  ", "FgYellow") +
            Logger.color(requestURL, "FgGreen")
        );

        if (/text\/html/.test(response.headers["content-type"])) {
          try {
            response.data = processHTML(response.data);
          } catch {
            console.log(
              Logger.color(
                "- File : Could not inject js " + requestURL,
                "FgRed"
              )
            );
          }
        }

        res.set(response.headers);
        res.send(response.data);

        if (config.activeCaching) {
          cloneFile(requestURL, processManager, {
            destDirectory: directories[0],
          });
        }
        return;
      }

      res.sendStatus(404);
    }
  );
})();

class ServerAPI {
  constructor() {}

  static start(apiConfig: {
    port: number;
    activeDomain: string;
    activeCaching: boolean;
  }) {
    Object.assign(config, apiConfig);

    const server = app.listen(config.port, () => {
      console.log(
        `\nApp listening on port ${Logger.color(config.port, "FgGreen")}`
      );
    });

    server.on("error", async (error: any) => {
      switch (error.code) {
        case "EADDRINUSE":


          console.log(
            `\nPort ${Logger.color(
              `${config.port} already in use`,
              "FgRed"
            )} . \nTry finishing the process on port ${Logger.color(
              config.port,
              "FgBlue"
            )} or use option -port ( alias -p ) to choose a different port.\n`
          );

          process.exit()
          break;
      }
    });
  }
}

export default ServerAPI;
