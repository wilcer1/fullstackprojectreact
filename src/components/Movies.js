import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"

  
function Movies(){
    const history = useHistory()
    const [movies, setMovies] = useState([])

    useEffect(() => {
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
        history.push(`/CinemaRoom/${id}`)
        window.location.reload()
    }

  return (
    <div>
      <div id="movies">
      <h1>Movies</h1>
      {movies.map(movie => (
          <div className="moviePresentation" id={movie.MovieId} >
            <h2>{movie.MovieName}</h2>
            <img src={movie.Poster}></img><br></br>
            <video src={movie.Trailer} controls></video>
            <p id="descriptionStyle">{movie.Description}<br></br>
                <p>Director: {movie.Director}</p>
                <p>Actors: {movie.Actors}</p>
                <p>Release Date: {movie.ReleaseDate}</p><br></br>
            </p>
            
            <button id={movie.MovieId} onClick={() => {booking(movie.MovieId)}}>Book Tickets</button>
            <p className="bookingButton"></p>
            <hr></hr>

          </div>

    ))}
      </div>
    </div>
  );
};
  
export default Movies;