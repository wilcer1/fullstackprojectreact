import React from "react"
import { useState } from "react"
import { useEffect } from "react"

  
function MovieDescription(props){
    const [movie, setMovie] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/api/movie/${window.location.href.split("/")[4]}`)
        .then(res => res.json())
        .then(response => {
            //console.log("response MovieDescription: " + response[0].MovieName);
            setMovie(response[0])
            
            //console.log("movie: " + movie[0].MovieName);
            //console.log(props.x)
        })
    }, [])

  return (
    <div className="movieDescription">
    <h2>{movie.MovieName}</h2>
    <img src={movie.Poster}></img>
  </div>
  );
};
  
export default MovieDescription;