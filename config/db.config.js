require("dotenv").config()


var mysql = require('mysql');

var con = mysql.createConnection({
  host: "34.88.143.247",
  user: "root",
  password: process.env.PASSWORD,
  database: "Gym"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


con.query(`select * from Gym.customer`, (err, res) => {
    return console.log(res);
});