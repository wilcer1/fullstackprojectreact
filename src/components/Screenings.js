import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import "../Screenings.css"

function Screenings(){
    const [screenings, setScreenings] = useState([])
    const movieId = window.location.href.split("/")[4]
    useEffect(() => {

        fetch(`http://localhost:5000/api/booking/screenings/${movieId}`, {
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
            {screenings.map( screening => (
                <h2 onClick={() => {booking(screening.ScreeningId)}}>
                    {screening.Date} at {`${screening.Time.substr(0,2)}:${screening.Time.substr(2,3)}`}
                </h2>
            )
            )}
        </div>
    )

}

export default Screenings;