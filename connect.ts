import DbManager from "./classes/DbManager";

let mysql = require("mysql2");


export const connection = mysql.createConnection({
  user: "root",
  database: "server_copy",
  password: "example" ,
  port: "3307"
});


export default new DbManager(connection);