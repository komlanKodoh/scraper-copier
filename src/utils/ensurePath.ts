const fs = require("fs");


export const ensurePath: (web_path:string) => Promise<boolean> = (web_path: string)  => {

  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(web_path)) fs.mkdirSync(web_path, { recursive: true });
      resolve(true);
    } catch (err) {
      return resolve(false);
    }
  });
};
