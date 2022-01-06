import path from "path";
import { getFileExtension } from "./../lib/getPathAndFileName";
const logDic = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",

  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",

  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m",
};

const getStyle = (arr) => {
  let string = "";

  arr.forEach((style) => (string += logDic[style]));
  return string;
};

const log = (
  fileExtension: string,
  url: string,
  data: string, 
  config: { main: string[]; info: string[] }
) => {
  const main = getStyle(config.main);
  const info = getStyle(config.info);

  console.log(
    `${main}- File (${fileExtension}) : ${url}\n   |_ ${info}${data}\n`
  );
};

const info = (fileExtension: string, url: string, web_path, fileName) => {
  log(fileExtension, url,path.join( web_path, fileName), {
    main: ["FgWhite"],
    info: ["FgGreen"],
  });
};

const error = (fileExtension: string, url: string,data) => {
    log(fileExtension, url,data, {
      main: ["FgWhite"],
      info: ["FgRed"],
    });
  };
export default { info, log, error };
