const router = require("express").Router();
const db = require("../config/db.config");
const ApiError = require("../error/ApiError");


// return date and time of screening for specific movie
router.get("/screenings/:movieid", (req, res, next) => {
    db.query(`SELECT Date, Time, ScreeningId FROM Screening WHERE Movie_MovieId = ${req.params.movieid}`,
    (err, result) => {
        if(err){
            console.log(err);
            next(ApiError.badRequest("Movie does not exist"));
            return;
        }
        result = JSON.parse(JSON.stringify(result))
        result.forEach(element => {
            element.Date = element.Date.slice(0, 10);
        });
        res.json(result);

    })

})

module.exports = router;