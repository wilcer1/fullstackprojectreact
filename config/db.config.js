require("dotenv").config()


var mysql = require('mysql');

var con = mysql.createConnection({
  host: "34.88.143.247",
  user: "root",
  password: process.env.PASSWORD,
  database: "cinema"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

con.query(`select * from User;`, (err, res) => {
    return console.log(res);
})




//Select one specifc user
con.query(`select * from User where FirstName="Lucas" && LastName="booty";`, (err, res) => {
    return console.log(res);
})

