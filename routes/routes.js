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

router.get("/user/:Email", (req, res) =>{
    db.query(`select * from User where Email="${req.params.Email}";`,


    (err, result) => {
        if (err) {
            console.log(err);
            res.status(400);
        }
       
        res.send(result);
        
    });
    
});


//delete user
router.delete("/user/:Email", (req, res) =>{
    db.query(`DELETE FROM User WHERE Email="${req.params.Email}";`,


    (err, result) => {
        if (err) {
            console.log(err);
            
            res.status(400);
        }
       
        res.send(result);
        
    });
    
});


//delete user
router.patch("/user/:Seatid", (req, res) =>{
    db.query(`UPDATE Seats SET  booked = true WHERE SeatId = ${req.params.Seatid};`,


    (err, result) => {
        if (err) {
            console.log(err);
            
            res.status(400);
        }
       
        res.send(result);
        
    });
    
});

router.get("/:cinemaroom/seats", (req, res) => {
    db.query(`select * from Seats where CinemaRoom_Roomid = ${req.params.cinemaroom};`,
        (err, result) => {
            if(err){
                console.log(err);
                res.status(400);
            }
            res.send(result);
        });
    

});

router.get("/:cinemaroom/rows", (req, res) => {
    db.query(`select numOfRows from CinemaRoom where Roomid = ${req.params.cinemaroom};`,
        (err, result) => {
            if(err){
                console.log(err);
                res.status(400);
            }
            res.send(result);
        });

});

router.get("/user", (req, res) => {
    db.query(`select Email, Password from User where Email = "booty69@gmail.com";`,
        (err, result) => {
            if(err){
                console.log(err);
                res.status(400);
            }
            res.send(result);
        });

});
    
    


module.exports = router;