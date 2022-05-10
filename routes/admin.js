const router = require("express").Router();
const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
const apiError = require("../error/ApiError");



router.post("/addMovie", (req, res, next) => {
    const token = req.body.token;
    try{
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    }catch(err){
        next(apiError.badRequest("Invalid Token"));
        return;
    }

    db.query("INSERT INTO Movie VALUES((MovieId), ?, ?, ?, ?, ?, ?, ?)",
    [req.body.movieName, req.body.description, req.body.director, req.body.releaseDate, req.body.actors, req.body.poster, req.body.trailer],
    (err, result) => {
        if(err){
            next(apiError.badRequest("insert failed"));
            return;
              
                
        }
        res.send("Movie Added");
             
           
            
    });

});
router.delete("/delMovie", (req, res, next) => {
    const token = req.body.token;
    try{
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    }catch(err){
        next(apiError.badRequest("Invalid Token"));
        return;
    }
        db.query(`DELETE FROM Screening WHERE Movie_MovieId = ${req.body.movieId}`, 
    (err, result) => {
        if(err) {
            console.log(err);
            next(apiError.badRequest("Delete failed"));
            return;
        }
    });

    db.query(`DELETE FROM Movie WHERE MovieId = ${req.body.movieId}`, 
    (err, result) => {
        if(err) {
            console.log(err);
            next(apiError.badRequest("Delete failed"));
            return;
        }
        res.send(`Movie Deleted`);
    });

});

router.patch("/updMovie", (req, res, next) => {
    const token = req.body.token;
    try{
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    }catch(err){
        next(apiError.badRequest("Invalid Token"));
        return;
    }

    db.query(`UPDATE Movie SET ${req.body.column} = "${req.body.updValue}" WHERE MovieId = ${req.body.movieId}`, 
    (err, result) => {
        if(err) {
            console.log(err);
            next(apiError.badRequest("Update failed"));
            return;
        }
        res.send("Movie Updated");
    })


});





module.exports = router;