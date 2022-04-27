const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db.config");


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


router.get("/login",  (req, res) => {
    const email = req.body.email;
    const pswrd = req.body.password;
    db.query(`select Email, Password from User where Email = "${email}";`,
    async (err, result) => {
      
        if(err){
            console.log(err);  
        };
        if(result.length === 0){
            res.send({error: "email does not exist"});
        }else{
            const validPassword = await bcrypt.compare(pswrd, result[0].Password);
            console.log(validPassword);
            if(!validPassword){
                res.send({error: "incorrect password"});
            };
        };
      
             
        res.send({success: "logged in"});
    });
   
    // const token = jwt.sign({user: response.em ail}) //also need token secret here later
 

        // if everything is successful, redirect. else error

    })

    

// });


module.exports = router;