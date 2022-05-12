import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import MovieDescription from "./MovieDescription"
import "../CinemaRoom.css"

function CinemaRoom(props){
    const [dataTable, setDataTable] = useState([])
    const [rows, setRows] = useState([])
    const [email, setEmail] = useState([])
    const screeningId = window.location.href.split("/")[5]

    useEffect(() => {
        fetch(`/api/seats/${screeningId}`)
        .then(res => res.json())
        .then(res => {
            setDataTable(res)
        })
    }, [])

    useEffect(() => {
        fetch ("/api/rows")
        .then(res => res.json())
        .then(res => {
            const rows = []
            for (let i = 0; i <= res; i++){
                rows.push(i)
            }
            setRows(rows)
        })
    }, [])

    useEffect(() => {
        const getToken = localStorage.getItem("auth-token")

        if(getToken){
            const info = {
            token: getToken
        }

        fetch(`/api/auth/user/${getToken}`, {
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
            }
            
            
        })
    } else {
        window.location.href = "/SignIn"
    }
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
        let token = localStorage.getItem("auth-token");
        if(token){
        fetch(`/api/auth/user/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(res => res.json())
        .then(response => {
            if(response === "Invalid Token"){
                alert("Please Log in")
                window.location.href = "/signIn";
            }else{
                const bookedSeats = []
        for (let i = 1; i <= dataTable.length; i++){
            const button = document.getElementById(`${i}`)
            if (button.style.backgroundColor == "aqua"){
                bookedSeats.push(i)
            }
        }
        if(!(bookedSeats.length == 0)){
            //Booking number, seatId, cinemaroom_id, movie_id, email, row_id
            fetch("/api/bookingCount", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Accept': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(response => {
                    const bookingNumber = response[0].count + 1
                    alert(bookingNumber)

                        const details = {
                            bookedSeats: bookedSeats,
                            screeningId: screeningId,
                            email: email,
                            bookingNumber: bookingNumber
                    }
                    
                    fetch("/api/addbooking", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(details)
                    })
                    .then(response => {
                        window.location.href = `/BookingInfo/${screeningId}`
                    })

                })
        }else{
            window.location.href = "/SignIn"
        }
        }
    })
}
        
    }
    
    return(
        <div>
        <div class="row">
        <div class="column side">
            <MovieDescription/>
        </div>
        
        <div class="column middle">
        <h1 style={{color: "white"}}>Booking</h1>
        <div className="seats">
            <div className="movieScreen">Screen</div>
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
                            style={item.booked ? {backgroundColor: "red"} : {backgroundColor: "yellowgreen"}}
                            onClick={() => test(item.SeatId, item.booked)}
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
        </div>
        </div>
        </div>
        
        <div class="column side">
            <MovieDescription/>
        </div>
      </div>
      </div>
    )
}








export default CinemaRoom