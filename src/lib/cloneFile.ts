import path from "path";
import writeFile from "./writeFile";
import downloadImg from "./downloadImg";
import processLink from "./processLink";
import { ensurePath } from "../utils/ensurePath";
import ProcessManager from "../classes/ProcessManager";
import getPathAndFileName from "./getPathAndFileName";

const cheerio = require("cheerio");

const cloneFile = async (
  url: string,
  processManager: ProcessManager,
  overrides?: { destDirectory: string }
) => {
  const urlObject = new URL(url);
  const scraperManager = processManager.scraperManager;
  try {
    // change link visibility to prevent it from being scrapped;
    scraperManager.see(url);

    const authorizedDomains = global._authorized_domain;

    const [localDirectory, fileName, fileExtension] = getPathAndFileName(
      urlObject,
      processManager.destDirectory
    );

    const file: FileObject = {
      name: fileName,
      extension: fileExtension,
    };

    if (!(await ensurePath(localDirectory))) {
      processManager.logSuccessfulWrite(
        urlObject,
        file,
        `could not create file ${localDirectory}`
      );
    }

    const response = await processManager.getRemoteFile(urlObject, file);

    if (!response) return;

    let link_to_save: string[] = [];

    if (["png", "jpg", "jpeg", "gif", "svg"].includes(fileExtension)) {
      await downloadImg(
        url,
        path.join(localDirectory, fileName),
        file,
        (error) => {
          if (error)
            processManager.logFailedWrite(urlObject, file, error.message);
          else
            processManager.logSuccessfulWrite(urlObject, file, localDirectory);
        }
      );
      return;
    } else if (["html", "htm"].includes(fileExtension)) {
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
    } else if (fileExtension === "css") {
      const myRegexp = /url\(("|')*(.*?)("|')*\)/g;

      let match = myRegexp.exec(response.data);
      while (match != null) {
        processLink(match[2], urlObject, link_to_save);
        match = myRegexp.exec(response.data);
      }
    }

    await processManager.scraperManager.add(link_to_save);

    await writeFile(response.data, localDirectory, file, (error) => {
      if (error) processManager.logFailedWrite(urlObject, file, error.message);
      else processManager.logSuccessfulWrite(urlObject, file, localDirectory);
    });
  } catch (error: any) {
    switch (error.code) {
      case "ERR_INVALID_URL":
        processManager.logFailedWrite(
          urlObject,
          { extension: "unknown", name: "unknown" },
          "Could not load the file, Url is invalid"
        );

        break;

      default:
        throw error;
    }
  }
};

export default cloneFile;
