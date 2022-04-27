const router = require("express").Router();
const db = require("../config/db.config");



//add Movie....
router.post("/addMovie", (req, res) =>{
   

        db.query(`INSERT INTO Movie (MovieId, MovieName, Description, Director, ReleaseDate, Actors) VALUES((MovieId), ?, ?, ?, ?, ?);`,
        [req.body.movieName, req.body.description, req.body.director,req.body.releaseDate, req.body.actors],
        (err, result) => {
            if (err) {
                console.log(err)
                res.status(400);
            }
            res.status(201);
            res.send(result);
        });
                           
  
      
       
        
  
   
});

router.get("/users", (req, res) => {
    db.query("select * from User;",
    (err, result) => {
        if (err) {
            console.log(err)
            res.status(400);
        }
        res.send(result);

    });

});

//get a user by first & last name
router.get("/user/:FirstName/:LastName", (req, res) =>{
    db.query(`select * from User where FirstName="${req.params.FirstName}" && LastName="${req.params.LastName}";`,
    (err, result) => {
        if (err) {
            console.log(err);
            res.status(400);
        }
       
        res.send(result);
        
    });
});
    
    


module.exports = router;