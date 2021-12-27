import { URL } from "node:url";
import {connection } from "./connect";
import TimeCounter from "./utils/counter";

import db from "./connect";
import { sql } from "./utils/sql";
import cloneFile from "./lib/cloneFile";
import { link } from "./types/global";

const BASE_URL = "https://www.google.com/";
const ROOT = "./" + new URL(BASE_URL).hostname;

const initialize = (...init_links) => {
 connection.query(sql`DROP TABLE link`);
 connection.query(
    sql`CREATE TABLE IF NOT EXISTS link ( link VARCHAR(200), popularity INT, seen boolean DEFAULT 0)`
  );

 connection.query(sql`truncate table link;`);

  let init_link_table = [];
  let popularity = 5000;

  init_links.forEach((init_link) =>
    init_link_table.push(`("${init_link}" , ${(popularity -= 10)} , false ) `)
  );

  if (!init_links.length)
    throw new Error("Initializing links must be provided");

 connection.query(
    `insert into link (link, popularity, seen) values ${init_link_table.join(
      ","
    )}; `
  );
};



var axios_request = {current: 0};

const clone_n_path = async (n) => {
  const nexts = await db.find_next(5);
  
  if (nexts.length === 0) {
    console.log("I am returning false")
    return false;
  }

  const cloning = nexts.map(
    async ({ link, popularity }) => await cloneFile(link, axios_request)
  );

  await Promise.all(cloning);

  return true;
};



const start = async () => {
  initialize("https://commerce-behemoth11.vercel.app");

  const MAX_RUN_TIME = 10;
  const counter = new TimeCounter();

  for (let i = 0; i <= 5000000000; i++) {
    
    const pursue = await clone_n_path(5);
    if (!pursue || counter.minutes >= MAX_RUN_TIME) break;
  }

  console.log(`total axios request : ${axios_request.current}`);
  console.log("++++++++++++++++++++program closing---------------------");

 connection.query(" select * from link where seen = 0 ", (err, doc: link[]) => {
    console.log(doc.map((data) => data.link));
  });
};

connection.connect((err) => {
  if (err) {
    return console.error("error: ", err);
  }

  console.log("connected to the MySQL server.\n");
  start();
});

