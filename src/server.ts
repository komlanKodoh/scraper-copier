import path from "path";
import Logger from "./classes/Logger";
import getPathAndFileName from "./lib/getPathAndFileName";
const fs = require("fs");

const http = require("http");

const requestListener = function (req, res) {
  res.writeHead(200);
  console.log(req);
  res.end("Hello, World!");
};

const server = http.createServer(requestListener);

const express = require("express");
const app = express();

app.get("*", (req, res) => {
  if (/\.\.\//.test(req.url))
    console.log(
      Logger.color("\t request failure : non existing directory", "FgRed")
    );

  const url = "https:/" + path.join(global._public_dir, req.url);

  const [directory, fileName]  = getPathAndFileName(new URL(url), "/");
  const filePath = path.join(directory, fileName)

  console.log("requested file : ",Logger.color(`${filePath}`, "FgGreen"))

  fs.exists(filePath, (exists) => {
    if (exists) res.sendFile(filePath);
    else res.status(404);
  });

});

const start = (port: number) => {
  app.listen(port, () =>{
    console.log(`App listening on port ${port}`)
  });
};

export default {
  start,
};
