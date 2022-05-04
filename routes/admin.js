const router = require("express").Router();
const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
const apiError = require("../error/ApiError");


router.post("/addmovie", (req, res, next) => {
    const token = req.body.token;
    try{
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    }catch(err){
        next(apiError.badRequest(err));
        return;
    }

    db.query("INSERT INTO Movie VALUES((MovieId), ?, ?, ?, ?, ?, ?, ?)",
    [req.body.moviename, req.body.description, req.body.director, req.body.releasedate, req.body.actors, req.body.poster, req.body.trailer],
    (err, result) => {
        if(err){
            next(apiError.badRequest("insert failed"));
            return;
              
                
        }
        res.sendStatus(201)
             
           
            
    });

});





module.exports = router;