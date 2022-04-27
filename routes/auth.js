const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {
    // check email


    const salt = await bcrypt.genSalt(10);
    const pswrd = await bcrypt.hash(req.body.password, salt);
    // const link = await bcrypt.hash(req.body.email, salt)
    // const replaced = link.replace(/[^a-z0-9]/gi, '');

    //create user here if no errors



});


router.post("/login", async (req, res) => {
// validate login


const token = jwt.sign({user: "user id here"}) //also need token secret here later


// if everything is successful, redirect. else error

});