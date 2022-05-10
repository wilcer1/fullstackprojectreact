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
    db.query(`SELECT * FROM Booking`,
    // SHOW COLUMNS FROM Booking
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


router.get("/bookingCount", (req, res) => {
    db.query(`SELECT IFNULL(MAX(BookingNumber), 1) AS count FROM Booking`,
        (err, result) => {
            if(err){
                console.log(err);
                res.status(400);
            }
            res.json(result);
        });

});

//make one booking....
router.post("/addbooking", (req, res, next) => {
    // for booking table
    const screeningid = req.body.screeningId;
    
    const email = req.body.email;

    const bookingNumber = req.body.bookingNumber

    // for seat_booked table
    const bookedSeats = req.body.bookedSeats;

    bookedSeats.map(seat => {
    db.query(`SELECT COUNT(BookingNumber) AS count FROM Booking WHERE BookingNumber ="${bookingNumber}"`,
    (err, result) => {
    if(err){

        console.log(err);
        next(ApiError.internal("Something went wrong"));
        return;
    }
    result = JSON.parse(JSON.stringify(result[0]));

    if (result.count === 0){
        db.query(`INSERT INTO Booking VALUES(?, ?)`,
        [bookingNumber, email],
        (err, result) => {
        if(err){
            
            next(ApiError.internal("Something went wrong"));
            return;
        }
        
    });
    }

    db.query(`INSERT INTO seat_booked VALUES(?, ?, ?)`,
        [seat, bookingNumber, screeningid],
            (err, c) => {
                if(err){
                    console.log(err);
                    next(ApiError.internal("Something went wrong"));
                    return;
                }
            });

    
        });
    })
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

router.get("/seats/:screeningid", (req, res, next) => {
    const bookedSeats = [];
    const seats = [];
    db.query(`SELECT Seats_Seatid FROM seat_booked WHERE Screening_ScreeningId = ${req.params.screeningid}`,
    (err, result) => {
        if(err){
            next(ApiError.internal("Whoops, internal error"));
            return;
        }
        result = JSON.parse(JSON.stringify(result));
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
            //check if seat id matches a booked seat, and set booked to true if it does
           for(let seat of seats){
               seat.booked = false;
               for(let bseat of bookedSeats){
                   if(seat.SeatId === bseat.Seats_Seatid){
                       seat.booked = true;
                   }
               }
           }
    }catch(err){
        next(ApiError.internal("Whoops, internal error"));
        return;
    }
    res.json(seats)

    });

    
    


})


router.get("/rows", (req, res, next) => {
    db.query("SELECT MAX(SeatRow) AS seatrow FROM Seats", 
    (err, result) => {
        if(err){
            next(ApiError.internal("Whoopsie, Something went wrong"));
            return;
        };
        res.json(result[0].seatrow);   

    });

})

    
    


module.exports = router;