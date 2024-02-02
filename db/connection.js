// mysql config goes here
// mysql connection location
const mysql = require("mysql2");
const db = mysql.createConnection(
    {
      host: "localhost",
      // MySQL username,
      user: process.env.DB_USER,
      // MySQL password
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    console.log("Congrats you have succsesfully connected!")
  );
  module.exports = db;