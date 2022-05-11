import { tab } from "@testing-library/user-event/dist/tab"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"


const colors = ["https://m.media-amazon.com/images/M/MV5BYTExZTdhY2ItNGQ1YS00NjJlLWIxMjYtZTI1MzNlMzY0OTk4XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg", "#00C49F", "#FFBB28"];
const delay = 2500;
  
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


  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length -1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);



  return (
    <div>
      <div id="homepage">
      <h1 class= "rainbowText">Welcome to Perfect Movies!</h1>
      <p><strong>Perfect Movies closer to the reality.</strong></p>
      <h3 class= "rainbowText">Top 3 movies right now!</h3>  

    </div>
    <div className="slideshow">
      
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
          <div>
          {movies.map(movie => (
            <div className="slide" key="index">
              <a href={`/Movies#${movie.MovieId}`}>
                <img src={movie.Poster}></img>
              </a>
          </div>

            ))}

      </div>
      </div>

      <div className="slideshowDots">
        {colors.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>

      
    </div>
    
  </div>

  );
};
  
export default Home;