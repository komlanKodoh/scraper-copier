import getPathAndFileName from "./getPathAndFileName";
import downloadImg from "./downloadImg";
import processLink from "./processLink";
import writeFile from "./writeFile";
import db from "../connect";
import path from "path";
import Logger from "../classes/Logger";
import { ensurePath } from "../utils/ensurePath";

const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

export default async (url: string, axios_request: { current: number }) => {
  try {
    db.see(url);
    const parsedUrl = new URL(url);
    const authorizedDomains = global._authorized_domain;

    const [web_path, fileName, fileExtension] = getPathAndFileName(
      parsedUrl,
      path.join(process.cwd(), global._target_directory || "")
    );

    if (!(await ensurePath(web_path)))
      Logger.error(fileExtension, url, `could not create file ${web_path}`);

    axios_request.current++;
    const response = await axios.get(url).catch((err) => {
      console.log(err)
      Logger.error(fileExtension, url, `Not Found`);
    });

    if (!response) return;

    let link_to_save: string[] = [];

    if (["png", "jpg", "jpeg", "gif", "svg"].includes(fileExtension)) {
      await downloadImg(url, path.join(web_path, fileName), () => {
        Logger.info(fileExtension, url, web_path, fileName);
      });
      return;
    } else if (["html", "htm"].includes(fileExtension)) {
      const $ = cheerio.load(response.data);

      const links: string = $("a");
      const script: string = $("script");
      const meta_links: string = $("link");
      const image_links: string = $("img");

      $(meta_links).each((_, meta_link) => {
        const _meta_link = $(meta_link).attr("href");
        processLink(_meta_link, parsedUrl, link_to_save, authorizedDomains);
      });

      $(script).each((_, script) => {
        const _script = $(script).attr("src");
        processLink(_script, parsedUrl, link_to_save, authorizedDomains);
      });

      $(links).each(function (_, link) {
        const _link = $(link).attr("href");
        processLink(_link, parsedUrl, link_to_save, authorizedDomains);
      });

      $(image_links).each(function (_, image_link) {
        const _image_link = $(image_link).attr("src");
        processLink(_image_link, parsedUrl, link_to_save, authorizedDomains);
      });
    } else if (fileExtension === "css") {
      const myRegexp = /url\(("|')*(.*?)("|')*\)/g;

      let match = myRegexp.exec(response.data);
      while (match != null) {
        console.log
        processLink(match[2], parsedUrl, link_to_save);
        match = myRegexp.exec(response.data);
      }
    }

    await db.add(link_to_save);

    await writeFile(response.data, web_path, fileName);
    Logger.info(fileExtension, url, web_path, fileName);
  } catch (error) {
    switch (error.code) {
      case "ERR_INVALID_URL":
        console.log(
          Logger.error(
            "unknown",
            url,
            "Could not load the file, Url is invalid"
          )
        );
        break;

      default:
        throw error;
    }
  }
};
