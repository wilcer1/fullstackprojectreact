const router = require("express").Router();
const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


router.post("/addmovie", (req, res) => {
    const token = req.body.token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    if(decoded){
        db.query("INSERT INTO Movie VALUES((MovieId), ?, ?, ?, ?, ?, ?, ?)",
        [req.body.moviename, req.body.description, req.body.director, req.body.releasedate, req.body.actors, req.body.poster, req.body.trailer],
        (err, result) => {
            if(err){
                
                
                res.status(400).end("error");
                
            }
            res.status(201).end("Success");
             
           
            
        });

        // res.send("success")
    }else{
        res.status(400).end("webtoken expired")
    }

    
    

});



module.exports = router;