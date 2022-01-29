const sqlite3 = require("sqlite3").verbose();
import { createInsertValues } from "../utils";
import { ensurePath } from "../utils/ensurePath";
import { sql } from "../utils/sql";
import DbManager from "./DbManagerInterface";
import Logger from "./Logger";
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
  async add(links: string[]) {
    const maxChunkLength = 500;

    const linkChunk = links.slice(0, maxChunkLength);

    if (links.length > linkChunk.length) this.add(links.slice(maxChunkLength))

    return new Promise<void>((resolve, reject) => {
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
    });

    return;
  }

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
    let query = `
    SELECT  *
    FROM link 
    WHERE seen = 0
    ORDER BY popularity DESC
    `;

    if (limit) query += `LIMIT ${limit}`;

    return new Promise((resolve, reject) => {
      this.db.all(
        `
              SELECT  *
              FROM link 
              WHERE seen = 0
              ORDER BY popularity DESC
              LIMIT ${limit}
          `,
        (err, rows: link[]) => {
          if (!rows) {
            return resolve([]);
          }

          if (rows.length > 0) {
            Logger.incrementTotalLink(rows.length);
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

  public init = async (links: string[], dbPath) => {
    if (!(await ensurePath(path.dirname(dbPath))))
      console.log(
        Logger.color(`Could not create directory at path ${dbPath}`, "FgRed")
      );

    console.log(links);
    await new Promise<void>((resolve) => {
      this.db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          console.error(err);
        }
        console.log("Successful connection to sqlite database\n");
        resolve();
      });
    });

    // creation of a table
    await new Promise<void>((resolve, reject) => {
      this.db.run(
        sql`CREATE TABLE IF NOT EXISTS link ( link VARCHAR(200) UNIQUE, popularity INT, seen boolean DEFAULT 0)`,
        () => resolve()
      );
    });

    // emptying the table
    await new Promise<void>((resolve) => {
      this.db.run(sql`DELETE from link`, () => resolve());
    });

    // adding default link to table before booting the process
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
          console.log(error);
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
            WHERE link = "${link}";
          `,
        (err, rows) => {
          resolve();
        }
      );
    });
  };
}
