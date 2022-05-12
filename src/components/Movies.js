import React from "react"
import { useState } from "react"
import { useEffect } from "react"

  
function Movies(){
    const [movies, setMovies] = useState([])

    useEffect(() => {
      movieExpired();
        fetch("http://localhost:5000/api/movie")
        .then(res => res.json())
        .then(response => {
            setMovies(response)
        })
    }, [])

    useEffect(() => {
      const hash = window.location.hash
    if (hash != "") {
        // Check if there is a hash
        setTimeout(() => {
          document.getElementById(hash.substr(1)).scrollIntoView({behavior: "smooth"})
        }, 100)

    }
    }, [window.location.hash])

    const booking = (id) => {
        window.location.href = `/Screenings/${id}`
    }

  return (
    <div>
      <div id="movies">
      <h1>The current movies</h1>
      {movies.map(movie => (
          <div className="moviePresentation" id={movie.MovieId}>
            <br></br>
            <img src={movie.Poster}></img>
            <h1 class="rainbowText">{movie.MovieName}</h1><br></br>
            <video src={movie.Trailer} controls></video><br></br>
            <p>{movie.Description}</p><br></br>
            <p><strong>Director: </strong>{movie.Director}</p><br></br>
            <p><strong>Actors: </strong>{movie.Actors}</p><br></br>
            <p><strong>Release Date: </strong>{movie.ReleaseDate}</p><br></br>
            <button onClick={() => {booking(movie.MovieId)}}>Book Tickets</button>
            <hr></hr>

          </div>

    ))}
      </div>
    </div>
  );
};

//check if date is past or future
function isInThePast(date) {
  const today = new Date();

  return date < today;
}

//check if screenings have happened and delete them if they have
function movieExpired(){
  var dateTime = new Date();
  var day = ("0" + dateTime.getDate()).slice(-2);
  var month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
  var year = dateTime.getFullYear();
  fetch("http://localhost:5000/api/screeningdates", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        }
      })
  .then(res => res.json())
  .then(response => {
    response.forEach(element => {
      element.Date = element.Date.slice(0, 10);
      if(isInThePast(new Date(element.Date))){
        
        fetch("http://localhost:5000/api/booking/delScreening", {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json'
            }
          
          })
          .then(res => res.text())
          .then(response => {
            console.log(response);
          })
      }
    });
    
   

  })
}
export default Movies;