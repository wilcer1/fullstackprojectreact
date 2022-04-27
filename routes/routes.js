const router = require("express").Router();
const controller = require("../controllers/controller");


//add Movie....
router.post("/insertMovie", (req, res) =>{
    try{
        controller.addMovie(
            req.body.movieName, req.body.description, req.body.director, 
            req.body.releaseDate, req.body.actors
                            );
            res.status(201);
    }catch(err){
        console.log(err);
        res.status(400);
        
    }
   
});

router.get("/users", (req, res) => {
    const users = controller.getUsers();
    res.send(users);

});

//get a user by first & last name
router.get("/user/:FirstName/:LastName", (req, res) =>{
    try{
    const user = controller.getUser(req.params.FirstName, req.params.LastName);
    console.log(user);
    res.send(user);
        
    }catch(err){
        res.status(400);
    }
});
    
    
    // //uppdate values with variables....
    // router.patch("/uppdate/:email", (req, res) =>{
    
       
        
    // });
    
    
    
    // //uppdate values with variables....
    // router.patch("/delete/:MovieId", (req, res) =>{
    
       
        
    // });

module.exports = router;