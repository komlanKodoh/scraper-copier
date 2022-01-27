const sqlite3 = require("sqlite3").verbose();
import { link } from "../types/global";
import { createInsertValues } from "../utils";
import { sql } from "../utils/sql";
import DbManager from "./DbManagerInterface";
const path = require("path");


/**
 * @class SqLite DataAccessObject ;
 */
export default class SqLite implements DbManager {
  db: typeof sqlite3.Database;
  name: string;

  constructor() {
    this.db = {};
    this.name = "sqlite";
  }

  /**
   * A list of links that will be added to the database;
   * 
   * @param links links to add to database
   * @returns a promise;
   */
  public add = (links: string[]) => {
    return new Promise((resolve, reject) => {
      if (links.length === 0) return resolve();

      this.db.run(
        `
                INSERT INTO link (link, popularity)
                VALUES ${createInsertValues(links)}
                ON CONFLICT(link) DO UPDATE SET popularity = popularity + 1;
                `,
        (error) => {
          if (error) {
            console.error(error);
          }
          resolve();
        }
      );
    }) as Promise<void>;
  };

  /**
   * Delete link from mysql database
   * 
   * @param link A link that will be deleted from the mysql database
   * @returns A promise
   */
  public delete = (link: string) => {
    return new Promise<void>((resolve, reject) => {
      this.db.query(
        `
              DELETE FROM link WHERE link="${link}";
              `,
        (error, row) => {
          resolve();
        }
      );
    });
  };

  /**
   * Find next n = limit link that can be scrapped
   * 
   * @param limit maximum number of link to get;
   * @returns a promise with link object
   */
  public find_next = (limit?: number) => {
    return new Promise((resolve, reject) => {
      this.db.all(
        `
              SELECT  *
              FROM link 
              WHERE seen = 0
              ORDER BY popularity DESC
              LIMIT ${limit || 5000}
          `,
        (err, rows: link[]) => {
          if (!rows) {
            return resolve([]);
          }
          resolve(rows);
        }
      );
    }) as Promise<link[]>;
  };

  /**
   * Initializes the database by performing basic actions;
   * 
   * @param links Initial links of the first pages that will be scrapped at the once the process starts;
   * @returns A promise;
   */

  public init = async (...links: string[]) => {
    await new Promise<void>((resolve) => {
      this.db = new sqlite3.Database(
        path.join(process.cwd(), ".sqlite.db"),
        (err) => {
          if (err) {
            console.error(err);
          }
          console.log("Successful connection to sqlite database\n");
          resolve();
        }
      );
    });

    await new Promise<void>((resolve, reject) => {
      this.db.run(
        sql`CREATE TABLE IF NOT EXISTS link ( link VARCHAR(200) UNIQUE, popularity INT, seen boolean DEFAULT 0)`,
        () => resolve()
      );
    });
    await new Promise<void>((resolve) => {
      this.db.run(sql`DELETE from link`, () => resolve());
    });

    await new Promise<void>((resolve, reject) => {
      let values = "";
      const len = links.length;
      if (len == 0) return resolve();

      for (let i = 0; i < len - 1; i++) {
        values += `("${links[i]}", ${5 + len - i}),`;
      }
      values += `("${links[len - 1]}",${6})`;

      this.db.run(
        `
                INSERT INTO link (link, popularity)
                VALUES ${values}
                ON CONFLICT(link) DO UPDATE SET popularity = popularity + 1;
                `,
        (error) => {
          resolve();
        }
      );
    });
    return;
  };

  /**
   * Change the visibility of link in the database and sets it as seen. 
   * 
   * @param link {String} to set as seen
   * @returns Promise
   */
  public see = async (link: string) => {
    return new Promise<void>((resolve, reject) => {
      this.db.run(
        `
            UPDATE link
            SET seen = 1
            WHERE link = "${location}";
          `,
        (err, rows) => {
          resolve();
        }
      );
    });
  };
}
