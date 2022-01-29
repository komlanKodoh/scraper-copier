import { createInsertValues } from "./../utils/index";
import * as mysql_type from "mysql2";
let mysql = require("mysql2");
import { sql } from "../utils/sql";
import { link } from "../types/global";
import DbManager from "./DbManagerInterface";

interface db extends mysql_type.Connection{
  run: any;
  all: any;
}

export default class implements DbManager {
  db: db;
  name: string;
  connect: mysql_type.Connection["connect"];

  constructor() {
    this.name = "mysql;"
    this.db = mysql.createConnection({
      user: "root",
      database: "server_copy",
      password: "example",
      port: "3307",
    });
    // For testing purposes
    this.db.all = this.db.query;
    this.db.run = this.db.query;
  }

  public add = (links: string[]) => {
    return new Promise((resolve, reject) => {
      if (links.length === 0) return resolve("nothing");

      this.db.query(
        `
                INSERT INTO link (link, popularity)
                VALUES ${createInsertValues(links)}
                ON DUPLICATE KEY UPDATE popularity = popularity + 1;
                `,
        (error, row) => {
          // console.log(error, row);
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

  public init = async (links:string[]) => {
    await new Promise<void>((resolve) => {
      this.db.connect((err) => {
        if (err) {
          return console.error("error : ", err);
        }

        console.log("connected to the MySQL server.\n");
        resolve();
      });
    });



    await new Promise<void>((resolve, reject) => {
      this.db.query(
        sql`CREATE TABLE IF NOT EXISTS link ( link VARCHAR(200) UNIQUE, popularity INT, seen boolean DEFAULT 0)`,
        () => resolve()
      );
    });

    await new Promise<void>((resolve, reject) => {
      this.db.query(
        sql`DELETE FROM link`,
        () => resolve()
      )
    })

    await new Promise<void>((resolve, reject) => {
      let values = "";
      const len = links.length;
      if (len == 0) return resolve();

      for (let i = 0; i < len - 1; i++) {
        values += `("${links[i]}", ${5 + len - i}),`;
      }
      values += `("${links[len - 1]}",${6})`;

      this.db.query(
        `
                INSERT INTO link (link, popularity)
                VALUES ${values}
                ON DUPLICATE KEY UPDATE popularity = popularity + 1;
                `,
        (error) => {
          if (error) {
            console.error(error);
          }
          // console.log(error);

          resolve();
        }
      );
    });

    return;
  };

  public see = async (location: string) => {
    return new Promise<void>((resolve, reject) => {
      this.db.query(
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
