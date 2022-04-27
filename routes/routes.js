const router = require("express").Router();
//add values....
router.post("/insert", (req, send) =>{

   
});
    //add values with variables....
router.post("/insert/variables", (req, send) =>{
    
    
    
            
            
        
        
    });
    
    //select values....
    router.get("/select/:FirstName/:LastName", (req, send) =>{
    
        
        
    });
    
    
    //uppdate values with variables....
    router.patch("/uppdate/:email", (req, send) =>{
    
       
        
    });
    
    
    
    //uppdate values with variables....
    router.patch("/delete/:MovieId", (req, send) =>{
    
       
        
    });

module.exports = router;