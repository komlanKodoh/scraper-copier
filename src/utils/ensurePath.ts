const fs = require("fs");

export const ensurePath: (
  localPath: string,
  cb?: (directoryExists: boolean) => any
) => Promise<boolean> = (localPath, cb) => {
  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(localPath))
        fs.mkdirSync(localPath, { recursive: true });

      if (cb) cb(true);
      resolve(true);
    } catch (err) {
      if (cb) cb(false);
      return resolve(false);
    }
  });
};
