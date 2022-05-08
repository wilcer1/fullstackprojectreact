const router = require("express").Router();
const db = require("../config/db.config");
const ApiError = require("../error/ApiError");

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
    db.query(`select * from seat_booked where Booking_BookingNumber = ${req.params.bookingnumber};`,
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

router.get("/seats", (req, res) => {
    db.query("SELECT * FROM Seats",
    (err, result) => {
        if (err) {
            console.log(err);
        }

        res.json(result);



    });


});

// create 10 rows, 100 seats (only works if Seats and seat_booked empty)
router.post("/createseats", (req, res) => {
    var x = 0;
    for(let i = 1; i <= 10; i++){
        for(let c = 1; c <= 10; c++){
            x++;
            db.query("INSERT INTO Seats VALUES (?, ?)", 
            [x, i], 
            (err, result) =>{
                if (err){
                    console.log(err);
                }


                
            })
            
        }
    }
    res.send("Created");
});

router.get("/bookedseats/:date", (req, res, next) => {
    const bookedSeats = [];
    const seats = [];
    db.query(`SELECT Seats_Seatid FROM seat_booked WHERE Date LIKE "${req.params.date}%"`,
    (err, result) => {
        if(err){
            next(ApiError.internal("Whoops, internal error"));
            return;
        }
        result = JSON.parse(JSON.stringify(result))
        result.forEach(element => {
            bookedSeats.push(element);
        });

    });

    db.query("SELECT * FROM Seats", 
    (err, result) => {
        if(err){
            next(ApiError.internal("Whoops, internal error"));
            return;
        }
        result = JSON.parse(JSON.stringify(result))
        result.forEach(element => {
            seats.push(element);
        });
        try{ 
            seats.map(seat => {
            bookedSeats.map(bookedSeat => {
                if(seat.SeatId === bookedSeat.Seats_Seatid){
                    seat.booked = true;
                }else {seat.booked = false};
            });
        

        });
    }catch(err){
        next(ApiError.internal("Whoops, internal error"));
        return;
    }

        res.json(seats)
    });

    
    


})

    
    


module.exports = router;