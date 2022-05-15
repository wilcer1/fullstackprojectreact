import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import MovieDescription from "./MovieDescription"
import "../style/Screenings.css"

function Screenings(){
    const [screenings, setScreenings] = useState([])
    const movieId = window.location.href.split("/")[4]
    useEffect(() => {

        fetch(`/api/booking/screenings/${movieId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            setScreenings(response)
        })
    }, [])


    const booking = (id) => {
        window.location.href = `/CinemaRoom/${movieId}/${id}`
    }

    return (
        
        <div className="screenings">
                <div className="column side">
                    <MovieDescription/>
                </div>
                <div className="column middle">
                    <h1>Screenings</h1>
            <table>
                <th>
            {screenings.map( screening => (
                <tr>
                <td>
                <h2 onClick={() => {booking(screening.ScreeningId)}}>
                    {screening.Date} at {`${screening.Time.substr(0,2)}:${screening.Time.substr(2,3)}`}
                </h2>
                </td>
                </tr>
            )
            )}
            </th>
            </table>
            </div>
                <div className="column side">
                    <MovieDescription/>
                </div>
        </div>
    )

}

function sortDates(screenings) {
    screenings.sort()
  
    return date < today;
  }


export default Screenings;