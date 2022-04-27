const db = require("../config/db.config")



exports.addMovie = (movieName, description, director, releaseDate, actors) => {
        
    db.query(`INSERT INTO Movie (MovieId, MovieName, Description, Director, ReleaseDate, Actors) VALUES((MovieId), ?, ?, ?, ?, ?);`,
    [movieName, description, director, releaseDate, actors],
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
           
            return result;
            
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
exports.getUsers = () => {
    db.query("select * from User;", 
    (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result);
        return result;
    });
}


     