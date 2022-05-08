const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db.config");
const ApiError = require("../error/ApiError");


router.post("/register", async (req, res, next) => {
    const email = req.body.email;
    if(!/[a-ö0-9]+@[a-ö]+\.[a-ö]{2,3}/.test(email)){      
        next(ApiError.badRequest("Email syntax not correct"));
        return;
    }
    
    if(!req.body.firstname || !req.body.lastname){
        next(ApiError.badRequest("First or Lastname not entered"));
        return;
    }

    if(req.body.password.length < 8){
        next(ApiError.badRequest("Password must be atleast 8 characters"));
        return;
    }

    const salt = await bcrypt.genSalt(5);
    const pswrd = await bcrypt.hash(req.body.password, salt);

    

    db.query(`select * from User where Email = "${email}"`,
        (err, result) => {

            if(err){
                next(ApiError.badRequest("Query Failed"));
                return;
            }
            if(result.length > 0){
                next(ApiError.badRequest("Email already in use"));
                return;
            }
            
        });

    db.query(`insert into User values(?, ?, ?, ?, ?, ?)`,[ email, req.body.firstname, req.body.lastname, req.body.birthday, pswrd, false],
        (err, result) => {
            if(err){
                next(ApiError.badRequest("Birthday input not valid"));
                return;
            }
            res.send("Registered Successfully");
        });
});


router.post("/login",  (req, res, next) => {
    const email = req.body.email;
    const pswrd = req.body.password;
    db.query(`select Email, Password from User where Email = "${email}";`,
    async (err, result) => {
        if(result.length === 0){
           next(ApiError.badRequest("Email does not exist"));
           return;

        }else{
            const validPassword = await bcrypt.compare(pswrd, result[0].Password);
            if(!validPassword){
                next(ApiError.badRequest("Incorrect Password"));
                return;
            };
        };
        const token = jwt.sign({email: email}, process.env.SECRET_KEY, {expiresIn: "1800s"});             
        res.json({"authToken": token});
    });

    });

router.get("/user/:token", (req, res, next) => {
    // return user based on token
    let decoded;
    const token = req.params.token;
    try{decoded = jwt.verify(token, process.env.SECRET_KEY);}
    catch(err){
        next(ApiError.badRequest("Invalid Token"));
        return;

    }
    
    res.json(decoded.email);
});


router.get("/userstatus/:token", (req, res, next) => {
    let admin;
    // return user based on token
    let decoded;
    const token = req.params.token;
    try{decoded = jwt.verify(token, process.env.SECRET_KEY);
        
    }
    catch(err){
        next(ApiError.badRequest("Invalid Token"));
        return;

    }
    db.query(`select admin from User where Email = "${decoded.email}";`,
            async (err, result) => {
                admin = result;
                if(result.length === 0){
                    next(ApiError.badRequest("Email does not exist"));
                    return;

                }
                res.json({"email": decoded.email, "admin": result[0].admin})
            }
        )
    
    
    
});




module.exports = router;