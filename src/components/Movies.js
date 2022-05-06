import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

  
function Movies(){
    const history = useHistory()
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/api/movie")
        .then(res => res.json())
        .then(response => {
            console.log(response);
            setMovies(response)
        })
    }, [])

    const booking = (id) => {
        history.push(`/CinemaRoom/${id}`)
        window.location.reload()
    }

  return (
    <div>
      <Navbar/>
      <div id="movies">
      <h1>Movies</h1>
      {movies.map(movie => (
          <div id="moviePresentation">
            <h2>{movie.MovieName}</h2>
            <img src={movie.Poster}></img><br></br>
            <video src={movie.Trailer} controls></video>
            <p>{movie.Description}<br></br>
                <p>Director: {movie.Director}</p>
                <p>Actors: {movie.Actors}</p>
                <p>Release Date: {movie.ReleaseDate}</p>
            </p>
            <button id={movie.MovieId} onClick={() => {booking(movie.MovieId)}}>Book Tickets</button>
            <hr></hr>
          
            
          </div>

    ))}
      </div>
      <Footer/>
    </div>
  );
};
  
export default Movies;