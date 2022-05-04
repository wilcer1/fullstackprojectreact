const router = require("express").Router();
const { getNextKeyDef } = require("@testing-library/user-event/dist/keyboard/getNextKeyDef");
const bcrypt = require("bcryptjs");
const { TokenExpiredError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const db = require("../config/db.config");
const ApiError = require("../error/ApiError");


router.post("/register", async (req, res) => {
    const email = req.body.email;

    const salt = await bcrypt.genSalt(5);
    const pswrd = await bcrypt.hash(req.body.password, salt);
    // const link = await bcrypt.hash(req.body.email, salt)
    // const replaced = link.replace(/[^a-z0-9]/gi, '');

    db.query(`select * from User where Email = "${email}"`,
        (err, result) => {

            if(err){
               console.log(err);
            }
            if(result.length > 0){
                res.send({error: "email already in use"});
            }
            
        });

    db.query(`insert into User values(?, ?, ?, ?, ?)`,[ email, req.body.firstname, req.body.lastname, req.body.birthday, pswrd],
        (err, result) => {
            if(err){
                console.log(err);
            }
            res.send(result)
        });
});


router.post("/login",  (req, res) => {
    const email = req.body.email;
    const pswrd = req.body.password;
    var status1 = "Success";
    db.query(`select Email, Password from User where Email = "${email}";`,
    async (err, result) => {
        if(result.length === 0){
            status1 = "incorrect email"
            res.status(404);

        }else{
            const validPassword = await bcrypt.compare(pswrd, result[0].Password);
            if(!validPassword){
                status1 = "incorrect password"
                res.status(404);
            };
        };
        const token = jwt.sign({email: email}, process.env.SECRET_KEY, {expiresIn: "1800s"});             
        res.send({"authToken": token, "status": status1});
    });

    });

router.post("/user", (req, res, next) => {
    // return user based on token
    let decoded;
    const token = req.body.token;
    try{decoded = jwt.verify(token, process.env.SECRET_KEY);}
    catch(err){
        next(ApiError.badRequest("Invalid Token"));
        return;

    }
    
    res.json(decoded.email);
});

// router.post("/user", (req, res) => {
//     // check if user is admin
//     var userstatus = "";
//     const token = req.body.token;
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     db.query(`select admin from User where Email = "${decoded}";`,
//         async (err, result) => {
//             if(result === 1){
//                 userstatus = "admin";

//             }else{
//                 userstatus = "noadmin";
//             }

//             res.send(userstatus);

//         }
//     )
// });



module.exports = router;