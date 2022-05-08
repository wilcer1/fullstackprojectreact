import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import MovieDescription from "./MovieDescription"
import "../CinemaRoom.css"

function CinemaRoom(props){
    const [dataTable, setDataTable] = useState([])
    const [rows, setRows] = useState([])
    const [email, setEmail] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/api/seats/2000-01-01")
        .then(res => res.json())
        .then(res => {
            setDataTable(res)
        })
    }, [])

    useEffect(() => {
        fetch ("http://localhost:5000/api/rows")
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
            console.log("booked Seats" + bookedSeats);
                bookedSeats.map(seat => {
                    const details = {
                        seatId: seat,
                        movieId: window.location.href.split("/")[4],
                        email: email,
                        date: "2000-01-01"
                }
                
                fetch("http://localhost:5000/api/addbooking", {
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
        {/* <div class="header">
        <h1>Header</h1>
        <p>Resize the browser window to see the responsive effect.</p>
      </div>
      
      <div class="topnav">
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
      </div> */}
      
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