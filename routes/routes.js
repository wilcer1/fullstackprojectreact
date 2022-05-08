const router = require("express").Router();
const db = require("../config/db.config");


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


router.get("/movie", (req, res) => {
    db.query(`select * from Movie;`,
        (err, result) => {
            if(err){
                console.log(err);
                res.status(400);
            }
            res.send(result);
        });

});

router.get("/movie/:id", (req, res) => {
    db.query(`select * from Movie where MovieId = ${req.params.id};`,
        (err, result) => {
            if(err){
                console.log(err);
                res.status(400);
            }
            res.send(result);
        });

});


//get all bookings....
router.get("/booking", (req, res) => {
    db.query(`select * from Booking;`,
        (err, result) => {
            if(err){
                console.log(err);
                res.status(400);
            }
            res.send(result);
        });

});


//get one specific booking....
router.get("/booking/:bookingnumber", (req, res) => {
    db.query(`select * from seat_booked where BookingNumber = ${req.params.bookingnumber};`,
        (err, result) => {
            if(err){
                console.log(err);
                res.status(400);
            }
            res.send(result);
        });

});

//make one booking....
router.post("/addbooking", (req, res, next) => {
    var bookingnumber;
    // for booking table
    const movieId = req.body.movieId;

    const email = req.body.email;

    // for seat_booked table

    const date = req.body.date;

    const seatId = req.body.seatId;
    

    db.query(`INSERT INTO Booking VALUES((BookingNumber), ?, ?)`,
        [movieId, email],
    (err, result) => {
        if(err){
            
            console.log(err);
           
        }
        
    });
    
    db.query(`SELECT BookingNumber from Booking WHERE User_Email = "${email}"`,
        (err, result) => {
            if(err){
                console.log(err);
            }
            db.query(`INSERT INTO seat_booked VALUES(?, ?, ?)`,
                [date, seatId,  result[result.length - 1].BookingNumber],
                    (err, c) => {
                        if(err){
                            console.log(err);
                        }
    
    
        });

        }
    
    
    );

   

    res.send("Success");
        
        

});

    
    


module.exports = router;