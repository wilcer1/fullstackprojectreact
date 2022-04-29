import React from "react"
import { useState } from "react"
import { useEffect } from "react"

  
function MovieDescription(props){
    const [movie, setMovie] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/api/movie/${props.movieId}`)
        .then(res => res.json())
        .then(response => {
            console.log("response: " + response[0].MovieName);
            setMovie(response)
            console.log("movie: " + movie[0].MovieName);
        })
    }, [])

  return (
    <div>
        <p>{movie.MovieName}</p>
    </div>
  );
};
  
export default MovieDescription;