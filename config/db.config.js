require("dotenv").config()


const { application } = require("express");
var mysql = require('mysql');

var db = mysql.createConnection({
  host: "34.88.143.247",
  user: "root",
  password: process.env.PASSWORD,
  database: "cinema"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});





//add values....
router.post("/insert", (req, send) =>{

db.query(`INSERT INTO Movie VALUES((MovieId), "Batman is the best", "Matt Reeve", "2 mar 2022", "Robert Pattinson...");`,
(err, result) => {
    if (err) {
        console.log(err)
    }
    res.send(result)
    
    
});

});

//add values with variables....
router.post("/insert/variables", (req, send) =>{

    const Description = "tja";

    const Director = "timmy";

    const ReleaseDate = "2 juni 2020";

    const Actors = "svampbob";
    
    db.query(`INSERT INTO Movie (MovieId, Description, Director, ReleaseDate, Actors) VALUES((MovieId), ?, ?, ?, ?);`,
    [Description, Director, ReleaseDate, Actors],
    (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
        
        
    });
    
});

//select values....
router.get("/select/:FirstName/:LastName", (req, send) =>{

    db.query(`select * from User where FirstName="${req.params.FirstName}" && LastName="${req.params.FirstName}";`,
    (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
        
        
    });
    
});


//uppdate values with variables....
router.patch("/uppdate/:email", (req, send) =>{

    const Email = req.params.email;
    let FirstName = "Test123"




    db.query(`uppdate User set FirstName=? where Email=?;`,
    [FirstName, Email],

    (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
        
        
    });
    
});



//uppdate values with variables....
router.patch("/delete/:MovieId", (req, send) =>{

    const MovieId = req.params.MovieId;


    db.query(`delete from Movie where MovieId=?;`,
    [MovieId],

    (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
        
        
    });
    
});





