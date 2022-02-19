import { ScrapperFile } from "./../classes/ScrapperFile";
import path from "path";
import writeFile from "./writeFile";
import downloadImg from "./downloadImg";
import processLink from "./processLink";
import { ensurePath } from "../utils/ensurePath";
import ProcessManager from "../classes/ProcessManager";
import getPathAndFileName from "./getPathAndFileName";
import { contentTypeToFileExtension } from "./contentTypeToFileExtension";

const cheerio = require("cheerio");

const cloneFile = async (
  url: string,
  processManager: ProcessManager,
  overrides?: { destDirectory: string }
) => {
  const urlObject = new URL(url);

  const scraperManager = processManager.scraperManager;
  scraperManager.see(url);

  const file = processManager.createFile(url, overrides?.destDirectory);
  if (!file) return;

  try {
    // change link visibility to prevent it from being scrapped;

    // a list of domain we are allowed to scrape given, set in the global scope.
    const authorizedDomains = global._authorized_domain;

    if (!(await ensurePath(file.directory))) {
      processManager.logSuccessfulWrite(
        file,
        `could not create file ${file.directory}`
      );
    }

    const response = await processManager.getRemoteFile(file);

    if (!response) return;

    let link_to_save: string[] = [];

    // update of the previously guessed fileExtension to one that matches the response countertype
    const fileContentType = response.headers["content-type"];

    const realFileExtension = contentTypeToFileExtension(fileContentType);
    if (realFileExtension) file.extension = realFileExtension;

    if (["png", "jpg", "jpeg", "gif", "svg"].includes(file.extension)) {
      await downloadImg(
        url,
        path.join(file.directory, file.name),
        file,
        (error) => {
          if (error) processManager.logFailedWrite(file, error.message);
          else processManager.logSuccessfulWrite(file, "");
        }
      );
      return;
    } else if (["html", "htm"].includes(file.extension)) {
      const $ = cheerio.load(response.data);

      const links: string = $("a");
      const script: string = $("script");
      const meta_links: string = $("link");
      const image_links: string = $("img");

      $(meta_links).each((_: any, meta_link: string) => {
        const _meta_link = $(meta_link).attr("href");
        processLink(_meta_link, urlObject, link_to_save, authorizedDomains);
      });

      $(script).each((_: any, script: string) => {
        const _script = $(script).attr("src");
        processLink(_script, urlObject, link_to_save, authorizedDomains);
      });

      $(links).each(function (_: any, link: string) {
        const _link = $(link).attr("href");
        processLink(_link, urlObject, link_to_save, authorizedDomains);
      });

      $(image_links).each(function (_: any, image_link: string) {
        const _image_link = $(image_link).attr("src");
        processLink(_image_link, urlObject, link_to_save, authorizedDomains);
      });
    } else if (file.extension === "css") {
      const myRegexp = /url\(("|')*(.*?)("|')*\)/g;

      let match = myRegexp.exec(response.data);
      while (match != null) {
        processLink(match[2], urlObject, link_to_save);
        match = myRegexp.exec(response.data);
      }
    }

    await processManager.scraperManager.add(link_to_save);

    await writeFile(response.data, file, (error) => {
      if (error) processManager.logFailedWrite(file, error.message);
      else processManager.logSuccessfulWrite(file);
    });
  } catch (error: any) {
    switch (error.code) {
      case "ERR_INVALID_URL":
        processManager.logFailedWrite(
          file,
          "Could not load the file, Url is invalid"
        );

        break;

      default:
        throw error;
    }
  }
};

export default cloneFile;
