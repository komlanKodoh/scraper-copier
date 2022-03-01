import { createInsertValues } from "../utils";
import sqlite3 from "sqlite3";

export default class ScraperManager {
  name: string;
  tableName: string;
  db: sqlite3.Database;

  constructor(db: sqlite3.Database, tableName: string = "link") {
    this.db = db;
    this.name = "sqlite";
    this.tableName = tableName;
  }

  cleanExit() {}

  /**
   * A list of links that will be added to the database;
   *
   * @param links links to add to database
   * @returns a promise;
   */
  async add(links: string[]) {
    const maxChunkLength = 500;

    const linkChunk = links.slice(0, maxChunkLength);

    if (links.length > linkChunk.length) this.add(links.slice(maxChunkLength));

    return new Promise<void>((resolve, reject) => {
      if (links.length === 0) return resolve();

      this.db.run(
        `
                INSERT INTO  "${this.tableName}" (link, popularity)
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
  }

  /**
   * Delete link from mysql database
   *
   * @param link A link that will be deleted from the mysql database
   * @returns A promise
   */
  public delete = (link: string) => {
    return new Promise<void>((resolve, reject) => {
      this.db.run(
        `
              DELETE FROM  "${this.tableName}" WHERE link="${link}";
              `,
        () => {
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
  public findNext = (limit?: number) => {

    return new Promise((resolve, reject) => {
      this.db.all(
        `
              SELECT  *
              FROM  "${this.tableName}" 
              WHERE seen = 0
              ORDER BY popularity DESC
              LIMIT ${limit}
          `,
        (_, rows: link[]) => {
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

  public init = async (links: string[], reset = false) => {
    // creation of a table

    await new Promise<void>((resolve, reject) => {
      this.db.run(
        `CREATE TABLE IF NOT EXISTS "${this.tableName}" ( link VARCHAR(200) UNIQUE, popularity INT, seen boolean DEFAULT 0, content_type VARCHAR(200) )`,
        (error) => {
          if (error) throw error;

          resolve();
        }
      );
    });

    // emptying the table
    if (reset)
      await new Promise<void>((resolve) => {
        this.db.run(`DELETE from "${this.tableName}"`, () => resolve());
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
          INSERT INTO  "${this.tableName}" (link, popularity)
          VALUES ${values}
          ON CONFLICT(link) DO UPDATE SET popularity = popularity + 1;
        `,
        (error) => {
          resolve();
        }
      );
    });
    return this;
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
            UPDATE  "${this.tableName}"
            SET seen = 1
            WHERE link = "${link}";
          `,
        () => {
          resolve();
        }
      );
    });
  };

  find(link: string) {
    return new Promise<link | null>((resolve, reject) => {
      this.db.all(
        `
            SELECT * FROM  "${this.tableName}"
            WHERE link = "${link}";
          `,
        (_, rows: link[]) => {
          if (!rows) {
            return resolve(null);
          }

          resolve(rows[0]);
        }
      );
    });
  }

  setContentType(link: string, content_type: string) {
    return new Promise<link | null>((resolve, reject) => {
      this.db.run(
        `
            UPDATE "${this.tableName}"
            SET content_type="${content_type}"
            WHERE link = "${link}";
          `,
        (error) => {
          if (error) throw error;
        }
      );
    });
  }

  getContentType(link: string) {
    return new Promise<string | null>((resolve, reject) => {
      this.db.all(
        `
            SELECT content_type 
            FROM "${this.tableName}"
            WHERE link = "${link}";
          `,
        (_, rows: link[]) => {
          if (!rows) {
            return resolve(null);
          }

          resolve(rows[0]?.content_type || null);
        }
      );
    });
  }
}
