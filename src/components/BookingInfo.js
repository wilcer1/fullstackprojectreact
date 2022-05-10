import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import "../BookingInfo.css"

function BookingInfo(){
    const [email, setEmail] = useState([])
    const [bookedSeats, setBookedSeats] = useState([])
    const [screening, setScreening] = useState([])
    const screeningId = window.location.href.split("/")[4]

    useEffect(() => {
        const getToken = localStorage.getItem("auth-token")

        if(getToken){
            const info = {
            token: getToken
        }

        fetch(`http://localhost:5000/api/auth/user/${getToken}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            if(response !== "Invalid Token") {
                setEmail(response)
                fetch(`http://localhost:5000/api/booking/bookings/${response}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(response => {
                    {
                        setBookedSeats(response)
                        
                    }
                
            
        })
            }
            
            
        })
    } else {
        window.location.href = "/SignIn"
    }
    }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/api/booking/screening/${screeningId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then(response => {
                {   
                    setScreening(response[0])
                }
            
        
    })
        

    }, [])

    return (
        <div className="bookingInfo">
            <h1>Booked Tickets</h1>

            <h2>Your booked Seats are:</h2>
            {bookedSeats.map(seat => (
            <h3>{seat.Seats_SeatId}</h3>
        ))}
            <h2>
                Date: {screening.Date} <br></br>
                Time: {screening.Time}
            
            </h2>
        </div>
    )
}



export default BookingInfo