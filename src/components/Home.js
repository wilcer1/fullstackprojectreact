import { tab } from "@testing-library/user-event/dist/tab"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import Navbar from "./Navbar"

  
function Home(){
    const history = useHistory()
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/api/movie")
        .then(res => res.json())
        .then(response => {
            setMovies(response)
        })
    }, [])


  return (
    <div>
      <Navbar/>
      <div id="homepage">

      <h1>Movies right now!</h1>  
      <div id = "showcase">
          {movies.slice(0,3).map(movie => (
            
            
            <img src={movie.Poster}></img>
          

            ))}

      </div>
    </div>
  </div>

  );
};
  
export default Home;