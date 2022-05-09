const router = require("express").Router();
const db = require("../config/db.config");
const ApiError = require("../error/ApiError");


// return date and time of screening for specific movie  WHERE Movie_MovieId = ${req.params.movieid}
router.get("/screenings/:movieid", (req, res, next) => {
    db.query(`SELECT Date, Time, ScreeningId FROM Screening`,
    (err, result) => {
        if(err){
            console.log(err);
            next(ApiError.badRequest("Movie does not exist"));
            return;
        }
        result = JSON.parse(JSON.stringify(result))
        result[0].Date = result[0].Date.slice(0, 10)
        console.log(typeof(result));
        res.json(result);

    })

})

module.exports = router;