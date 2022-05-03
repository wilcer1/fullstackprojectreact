const router = require("express").Router();
const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


router.post("/addmovie", (req, res) => {
    const token = req.body.token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if(decoded){
        db.query("INSERT INTO Movie VALUES((MovieId), ?, ?, ?, ?, ?, ?",
        [req.body.moviename, req.body.description, req.body.director, req.body.releasedate, req.body.actors, req.body.poster],
        (err, result) => {
            res.status(201);

        }
        );
    res.send({error: "insert failed"});
    }

});



module.exports = router;