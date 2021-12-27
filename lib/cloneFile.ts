import getPathAndFileName from "./getPathAndFileName";
import { getFileExtension } from "../utils";
import downloadImg from "./downloadImg";
import formatLink from "./formatLink";
import writeFile from "./writeFile";
import db from "../connect";

const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

export default async (url: string, axios_request: {current: number}) => {
  db.see(url);

  const parsedUrl = new URL(url);

  const [path, fileName] = getPathAndFileName(parsedUrl);
  if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });

  const fileExtension = getFileExtension(fileName);
  console.log(`_init_ :    Actively working on ${fileName}`);

  axios_request.current++
  const response = await axios
    .get(url)
    .catch((err) => console.log(`Unable to find ${parsedUrl}`));


  if (!response) return;

  let link_to_save:string[] = [];

  if (["png", "jpg", "jpeg", "gif", "svg"].includes(fileExtension)) {
    await downloadImg(url, path + fileName, () =>
      console.log(
        `------------image ${fileExtension} ${parsedUrl} successfully written on path ${path}.-----------`
      )
    );
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

  await db.add(link_to_save);
  console.log("new links added : ", link_to_save);
  await writeFile(response.data, path+fileName);
};
