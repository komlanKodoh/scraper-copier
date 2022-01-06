import getPathAndFileName from "./getPathAndFileName";
import { getFileExtension } from "../utils";
import downloadImg from "./downloadImg";
import formatLink from "./formatLink";
import writeFile from "./writeFile";
import db from "../connect";
import path from "path";
import Logger from "../classes/Logger";

const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

export default async (url: string, axios_request: { current: number }) => {
  db.see(url);

  const parsedUrl = new URL(url);

  const [web_path, fileName] = getPathAndFileName(url);
  const fileExtension = getFileExtension(fileName);

  try {
    if (!fs.existsSync(web_path)) fs.mkdirSync(web_path, { recursive: true });
  } catch (err) {

    Logger.error(fileExtension, url, `could not create file ${web_path}`)
    return;
  }


  axios_request.current++;
  const response = await axios
    .get(url)
    .catch((err) => Logger.error(fileExtension, url, `Not Found`));

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

    $(meta_links).each((i, meta_link) => {
      const _meta_link = $(meta_link).attr("href");
      formatLink(_meta_link, parsedUrl, link_to_save);
    });

    $(script).each((i, script) => {
      const _script = $(script).attr("src");
      formatLink(_script, parsedUrl, link_to_save);
    });

    $(links).each(function (i, link) {
      const _link = $(link).attr("href");
      formatLink(_link, parsedUrl, link_to_save);
    });

    $(image_links).each(function (i, image_link) {
      const _image_link = $(image_link).attr("src");
      formatLink(_image_link, parsedUrl, link_to_save);
    });
  } else if (fileExtension === "css") {
    const myRegexp = /url\(("|')*(.*?)("|')*\)/g;

    let match = myRegexp.exec(response.data);
    while (match != null) {
      formatLink(match[2], parsedUrl, link_to_save);
      match = myRegexp.exec(response.data);
    }
  }

  await db.add(link_to_save.slice(0, 100));
  if (link_to_save.length > 0) {
    // console.log("new links added : ", link_to_save.slice(0, 40));
  }

  await writeFile(response.data, web_path, fileName);

  Logger.info(fileExtension, url, web_path, fileName);
};
