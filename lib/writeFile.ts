import getPathAndFileName from "./getPathAndFileName";

const fs = require("fs");

export default async (data: string, destination: string) => {

  if (typeof data === "object") {
    data = JSON.stringify(data);
  }

  console.log(destination)
  await fs.writeFile(destination ,  data, (err) => {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log(
        `------------file successfully written on path ${destination}.-----------`
      );
    }
  });
};
