import React from "react"
import Navbar from "./Navbar"
import { useEffect } from "react"
import { useState } from "react"
import MovieDescription from "./MovieDescription"

function CinemaRoom(props){
    const [dataTable, setDataTable] = useState([])
    const [rows, setRows] = useState([])
    const [movieId, setMovieId] = useState([])
    const [movie, setMovie] = useState({MovieName: "fml"})
    useEffect(() => {
        fetch("http://localhost:5000/api/1001/seats")
        .then(res => res.json())
        .then(res => {
            setDataTable(res)
        })

        fetch ("http://localhost:5000/api/1001/rows")
        .then(res => res.json())
        .then(res => {
            const rows = []
            for (let i = 0; i <= res[0].numOfRows; i++){
                rows.push(i)
            }
            setRows(rows)
        })

        fetch(`http://localhost:5000/api/movie/${4}`)
        .then(res => res.json())
        .then(response => {
            console.log("response: " + response[0].MovieName);
            setMovie(response[0])
            console.log("movie: " + movie.MovieName);
        })
        const elements = window.location.href.split("/")
        setMovieId(elements[4])

    }, [])


    const test = (id, booked) => {
        const button = document.getElementById(`${id}`)
        if (!(button.style.backgroundColor == "aqua") && !booked){
            button.style.backgroundColor = "aqua"
        } else {
            button.style.backgroundColor = booked ? "red" :  "yellowgreen"
        }
    }
    const booking = () => {
        const bookedSeats = []
        for (let i = 1; i <= dataTable.length; i++){
            const button = document.getElementById(`${i}`)
            if (button.style.backgroundColor == "aqua"){
                bookedSeats.push(i)
            }
        }
        if(!(bookedSeats.length == 0)){
            //Booking number, seatId, cinemaroom_id, movie_id, email 
            alert(`Booked seats ${bookedSeats}`)
        }else{
            alert("No seats booked")
        }
    }
    return(
        <div>
        <Navbar/>
        <h1 style={{color: "white"}}>Booking</h1>
        <table id="CinemaRoom">
            <thead>
            </thead>
            <tbody>
            {rows.map(row => (
            <tr>
                {dataTable
                .filter(item => item.SeatRow == row)
                .map(item => (
                    <td>
                        <button
                            id={item.SeatId}
                            style={item.Booked ? {backgroundColor: "red"} : {backgroundColor: "yellowgreen"}}
                            onClick={() => test(item.SeatId, item.Booked)}
                        >{item.SeatId}
                        </button>
                    </td>
                ))}
            </tr>
          ))}
            </tbody>
        </table>
        <div id="bookTickets">
        <button onClick={() => booking()}>Book Tickets</button>
        <p style={{color: "white"}}>{movieId}</p>
        <MovieDescription movieId={movieId}/>
        </div>
        </div>
        
    )
}








export default CinemaRoom