const router = require("express").Router();
const db = require("../config/db.config");
const ApiError = require("../error/ApiError");


// return date and time of screening for specific movie
router.get("/screenings/:movieid", (req, res, next) => {
    db.query(`SELECT Date, Time FROM seat_booked WHERE MovieId = ${req.params.movieid}`,
    (err, result) => {
        if(err){
            console.log(err);
            next(ApiError.badRequest("Movie does not exist"));
            return;
        }

        res.json(result);

    })

})

module.exports = router;