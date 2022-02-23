import path from "path";
import express from "express";
import request from "request";
import Logger from "./classes/Logger";
import cloneFile from "./lib/cloneFile";
import { findFile } from "./lib/findFile";
import ProcessManager from "./classes/ProcessManager";
import { domainIsValid } from "./utils/domainIsValid";

const app = express();
const DefaultDirectory = path.join(__dirname, "./dest");

export const config = {
  port: "3000",
  activeDomain: "",
  activeCaching: true,
};

// type d = {[K in keyof request.Response]: string}

function proxy(url: string, res: any) {
  // return console.log("I crashed in here")
  request(url, undefined, (error, response, body) => {
    if (!error) return;

    if (error.code === "EAI_AGAIN") {
      console.log(
        Logger.color(
          `Failed to proxy the request to ${url} Check your internet connection`,
          "FgRed"
        )
      );
    }

    res.sendStatus(404);
  }).pipe(res);
  console.log(
    "File successfully forwarded to " +
      Logger.color("External servers  < -- >  ", "FgCyan") +
      Logger.color(url, "FgGreen")
  );
}

const startServer = async (apiConfig: {
  port: number;
  activeDomain: string;
  activeCaching: boolean;
  domainOfInterest: RegExp[];
}) => {
  // loading configs to the local config object
  Object.assign(config, apiConfig);

  const processManager = new ProcessManager(DefaultDirectory);

  // path to the database to use for the process.
  // the database holds information like a mapping from domain to
  // local Directories is also used to saved link after scrapping remoteURLs;
  const dbPath = path.join(__dirname, ".default_scraper.db");

  await processManager.initDb(dbPath);
  await processManager.initScraperManager([], false);
  const domainTracker = await processManager.initDomainTracker();

  if (!(await domainIsValid(domainTracker, config.activeDomain))) return;

  app.get<{}, {}, {}, { newDomain: "string" }>("/update-domain", (req, res) => {
    config.activeDomain = req.query.newDomain;
  });

  app.use("/helpers", express.static(path.join(__dirname, "helpers")));
  app.get("/myWorker.js", (req, res) =>
    res.sendFile(path.join(__dirname, "./helpers/myWorker.js"))
  );

  app.get<{}, {}, {}, { request: string }>("/proxy", async (req, res) => {
    // get the required from the url query;
    let originalRequest: any;
    const requestTargetURL = Buffer.from(req.query.request, "base64").toString(
      "utf8"
    );

    try {
      originalRequest = JSON.parse(requestTargetURL);
    } catch (err) {
      return console.log(
        Logger.color(`Failed to parse the requested resources:`, "FgRed")
        // Logger.color(`${req.url.slice(50)}`, "FgGreen")
      );
    }

    originalRequest.headers = req.headers;

    if (!originalRequest?.url) return;

    let file = processManager.createFile(
      originalRequest.url.replace(
        `localhost:${config.port}`,
        config.activeDomain
      ),
      ""
    );


    if (!file)
      return res.status(404).send({
        error: "INVALID_URL",
        message: `url ${req.url} is not valid`,
      });

    let domainShouldBeCached =
      config.activeDomain === file.remoteURL.hostname ||
      apiConfig.domainOfInterest.some((domainRegex) =>
        domainRegex.test(file?.remoteURL.hostname as string)
      );

    if (!domainShouldBeCached) return proxy(originalRequest.url, res);
    else {
      const directories = await domainTracker.getRootDirectories(
        config.activeDomain
      );

      // We first find the corresponding file from the local machine, if the
      // file is found we send it as the response;
      const fileSavedInStorage = await findFile(
        directories,
        file.remoteURL.href
      );

      console.log(fileSavedInStorage);

      if (fileSavedInStorage) {
        console.log(
          "File successfully served From  " +
            Logger.color("LocalStorage      < -- >  ", "FgBlue") +
            Logger.color(file.remoteURL.href, "FgGreen")
        );
        res.sendFile(fileSavedInStorage);
        return;
      }

      // if the file is not found in the local storage,
      // we proxy the request to its original destination
      proxy(originalRequest.url, res);

      console.log(
        "File successfully served From  " +
          Logger.color("Remote URL        < -- >  ", "FgBlue") +
          Logger.color(file.remoteURL.href, "FgGreen")
      );

      // We finally clone the file in the background;

      cloneFile(file.remoteURL.href, processManager, {
        destDirectory: directories[0],
      });
      processManager.incrementAllLink(1);
    }

    res.sendStatus(404);
  });

  app.get("/", (_, res) => {
    res.sendFile(path.join(__dirname, "./helpers/index.html"));
  });

  // Starting the server;
  const server = app.listen(config.port, () => {
    console.log(
      `\nApp listening on port ${Logger.color(config.port, "FgGreen")}\n`
    );
  });

  //setting up the error checking;
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

        process.exit();
        break;
    }
  });
};

const ServerAPI = {
  start: startServer,
};

export default ServerAPI;
