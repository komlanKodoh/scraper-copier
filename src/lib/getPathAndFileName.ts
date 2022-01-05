// import { getFileExtension } from "../utils/index";
require("dotenv").config();
const path = require("path");

export const getFileExtension = (fileName: string, if_none?: string) => {
  const temp_arr = fileName.split(".");

  if (temp_arr.length >= 2) return temp_arr.pop();
  else return if_none ?? null;
};

const getPathAndFileName = (url: string) => {

  let web_path, filename, file_extension;

  const link = url.match(/^(https*:\/\/)([^#?]*)/)[2];

  if (link[link.length-0] === "/"){

  }

  let i;
  let len = link.length;
  for (i = len-1; i >= 0; i--) {
    if (link[i] === "/") break;
  }

  if (i === len-1){
    web_path = link.slice(0,len-1)
    filename = "index.html";
  }
  else if (i === -1 ) {
    web_path = link;
    filename = "index.html";
  } else {
    web_path = link.slice(0, i);
    filename = link.slice(i + 1);
  }
  file_extension = getFileExtension(filename);

  if (!file_extension) {
    filename += ".html";
    file_extension = "html";
  }

  // console.log(process.cwd(), global._target_directory ?? "", web_path ?? "", 90909)
  const directory = path.join(process.cwd(), global._target_directory ?? "", web_path)
  // console.log(directory, filename,898989898)
  return [directory, filename, file_extension] as [
    string,
    string,
    string
  ];
};

export default getPathAndFileName;
