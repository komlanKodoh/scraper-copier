import { ensurePath } from './ensurePath';
import sqlite3 from "sqlite3";
import path from 'path';
import Logger from '../classes/Logger';

/**
 * Creates a sqlite database on the given path
 * 
 * @param dbPath 
 * @param cb 
 * @returns 
 */
const createSqliteDb = async (dbPath: string, cb?: (err: Error | null) => void) => {
  let db : sqlite3.Database | null = null ;

  if (!(await ensurePath(path.dirname(dbPath))))
  console.log(
    Logger.color(`Could not create directory at path ${dbPath}`, "FgRed")
  );

  await new Promise<void>((resolve) => {
    db = new sqlite3.Database(dbPath, (err) => {
      resolve();


      if (cb) return cb(err);

      if (err) {
        console.error(err);
      }
      
      console.log("\nConnected to database.... Ready to rock 🤘");
    });
  });

  return db as unknown as sqlite3.Database ;
};


export default createSqliteDb;