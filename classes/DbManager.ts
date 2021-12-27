import  * as mysql from "mysql2";
import { link } from "../types/global";

export default class {
  db: mysql.Connection;
  connect : mysql.Connection["connect"]

  constructor(db: mysql.Connection) {
    this.db = db;
  }

  public add = (links: string[]) => {
    return new Promise((resolve, reject) => {
      let values = "";
      const len = links.length;
      if (len == 0) return resolve("nothing");

      for (let i = 0; i < len - 1; i++) {
        values += `("${links[i]}", 1),`;
      }
      values += `("${links[len - 1]}",1)`;

      this.db.query(
        `
                INSERT INTO link (link, popularity)
                VALUES ${values}
                ON DUPLICATE KEY UPDATE popularity = popularity + 1;
                `,
        (error, row) => {
          resolve("row");
        }
      );
    }) as Promise<string>;
  };

  public delete = (link: string) => {
    return new Promise((resolve, reject) => {
      this.db.query(
        `
              DELETE FROM link WHERE link="${link}";
              `,
        (error, row) => {
          resolve(row);
        }
      );
    });
  };

  public find_next = async (limit: number) => {
    return new Promise((resolve, reject) => {
      this.db.query(
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
          resolve(rows);
        }
      );
    }) as Promise<link[]>;
  };

  public see = async (location: string) => {
    return new Promise((resolve, reject) => {
      this.db.query(
        `
            UPDATE link
            SET seen = 1
            WHERE link = "${location}";
          `,
        (err, rows) => {
          resolve(rows);
        }
      );
    });
  };

}
