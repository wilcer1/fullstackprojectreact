import React from "react"
import Navbar from "./Navbar"
import { useEffect } from "react"
import { useState } from "react"
import MovieDescription from "./MovieDescription"

function CinemaRoom(props){
    const [dataTable, setDataTable] = useState([])
    const [rows, setRows] = useState([])
    const [email, setEmail] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/api/1001/seats/")
        .then(res => res.json())
        .then(res => {
            setDataTable(res)
        })
    }, [])

    useEffect(() => {
        fetch ("http://localhost:5000/api/1001/rows")
        .then(res => res.json())
        .then(res => {
            const rows = []
            for (let i = 0; i <= res[0].numOfRows; i++){
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
        fetch("http://localhost:5000/api/auth/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(info)
        })
        .then(res => res.json())
        .then(response => {
            if(response !== "Invalid Token") {
                setEmail(response)
            }
            
            
        })
    } else {
        alert("You need to login, you fucking boomer")
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
        const bookedSeats = []
        for (let i = 1; i <= dataTable.length; i++){
            const button = document.getElementById(`${i}`)
            if (button.style.backgroundColor == "aqua"){
                bookedSeats.push(i)
            }
        }
        if(!(bookedSeats.length == 0)){
            //Booking number, seatId, cinemaroom_id, movie_id, email, row_id
            console.log(bookedSeats);
            bookedSeats.map(seat => {
                const details = {
                    bookingNumber: "351652",
                    seatId: seat,
                    cinemaRoomId: "1001",
                    movieId: window.location.href.split("/")[4],
                    email: email
                }
                
                fetch("http://localhost:5000/api/booking/reg", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(details)
                })
                .then(response => {
                    window.location.reload()
                })
            })
            alert(`Booked seats ${bookedSeats}`)
        }else{
            alert("No seats booked")
        }
    }
    return(
        <div>
        <Navbar/>
        <div className="booking">
        <h1 style={{color: "white"}}>Booking</h1>
        <MovieDescription/>
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
        </div>
        </div>
        </div>
        </div>
    )
}








export default CinemaRoom