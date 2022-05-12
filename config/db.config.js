require("dotenv").config()


const { application } = require("express");
var mysql = require('mysql');

var db = mysql.createConnection({
  host: "34.88.133.113",
  user: "root",
  password: process.env.PASSWORD,
  database: "cinema"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});





module.exports = db;





 