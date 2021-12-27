import { getFileExtension } from "./../utils/index";
require("dotenv").config();

export default (url: URL) => {
  const ROOT = process.env.ROOT;

  const { hostname, pathname } = url;

  const path_array = [hostname].concat(pathname.split("/"));

  let filename: string =
    pathname === "/" ? "index.html" : path_array.slice(-1)[0];

  let fileExtension = getFileExtension(filename);
  if (!fileExtension) filename += ".html";

  const filePath: string = ROOT + path_array.slice(0, -1).join("/");

  return [filePath, filename, fileExtension ?? "html"] as [
    string,
    string,
    string
  ];
};
