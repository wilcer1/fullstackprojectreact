const db = require("./config/db.config")



exports.addMovie = (Moviename, Description, Director, ReleaseDate, Actors) => {
        
    db.query(`INSERT INTO Movie (MovieId, MovieName, Description, Director, ReleaseDate, Actors) VALUES((MovieId), ?, ?, ?, ?, ?);`,
    [Moviename, Description, Director, ReleaseDate, Actors],
    (err, result) => {
        if (err) {
            console.log(err)
        }
    });

}

exports.getUser = (firstName, lastName) => {
    db.query(`select * from User where FirstName="${firstName}" && LastName="${lastName}";`,
        (err, result) => {
            if (err) {
                console.log(err)
            }
           
            
            
        });


    }
    

exports.delMovie = (movieID) => {


    db.query(`delete from Movie where MovieId=?;`,
    [movieID],

    (err, result) => {
        if (err) {
            console.log(err)
        }
        
    });
}


     