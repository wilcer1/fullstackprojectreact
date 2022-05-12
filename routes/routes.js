const router = require("express").Router();
const db = require("../config/db.config");
const ApiError = require("../error/ApiError");

router.get("/users", (req, res, next) => {
    db.query("select * from User;",
    (err, result) => {
        if (err) {
            console.log(err)
            next(ApiError.badRequest("Something went wrong"));
            return;
        }
        res.send(result);

    });

});


router.get("/user/:Email", (req, res, next) =>{
    db.query(`select * from User where Email="${req.params.Email}";`,


    (err, result) => {
        if (err) {
            console.log(err);
            next(ApiError.internal("Email does not exist"));
            return;
        }
       
        res.send(result);
        
    });
    
});


router.get("/movie", (req, res, next) => {
    db.query(`select * from Movie;`,
        (err, result) => {
            if(err){
                console.log(err);
                next(ApiError.badRequest("Something went wrong"));
                return;
            }
            res.send(result);
        });

});

router.get("/movie/:id", (req, res, next) => {
    db.query(`select * from Movie where MovieId = ${req.params.id};`,
        (err, result) => {
            if(err){
                console.log(err);
                next(ApiError.internal("ID does not exist"));
                return;
            }
            res.send(result);
        });

});


router.get("/seats", (req, res, next) => {
    db.query("SELECT * FROM Seats",
    (err, result) => {
        if (err) {
            console.log(err);
            next(ApiError.internal("Something went wrong"));
            return;
        }

        res.json(result);



    });


});

// create 10 rows, 100 seats (only works if Seats and seat_booked empty)
router.post("/createseats", (req, res, next) => {
    var x = 0;
    for(let i = 1; i <= 10; i++){
        for(let c = 1; c <= 10; c++){
            x++;
            db.query("INSERT INTO Seats VALUES (?, ?)", 
            [x, i], 
            (err, result) =>{
                if (err){
                    console.log(err);
                    next(ApiError.internal("Something went wrong"));
                    return;
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

router.get("/screeningdates", (req, res, next) => {
    db.query("SELECT Date, Time FROM Screening",
    (err, result) => {
        if(err){
            next(ApiError.badRequest("Select Failed"));
            return;
        }
        res.json(result);
    })

})

    
    


module.exports = router;