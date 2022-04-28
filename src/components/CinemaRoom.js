import React from "react"
import Navbar from "./Navbar"
import { useEffect } from "react"
import { useState } from "react"

function CinemaRoom(props){
    const [dataTable, setDataTable] = useState([])
    const [rows, setRows] = useState([])
    const [numberOfRows, setNumberOfRows] = useState()
    useEffect(() => {
        fetch("http://localhost:5000/api/1001/seats")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setDataTable(res)
        })

        fetch ("http://localhost:5000/api/1001/rows")
        .then(res => res.json())
        .then(res => {
            // setNumberOfRows(5)
            console.log(res[0].numOfRows);
        })

        const numberOfRows = 10
        const rows = []
        console.log(numberOfRows);
        for (let i = 0; i <= numberOfRows; i++){
            rows.push(i)
        }
       
        // setDataTable(list)
        setRows(rows)

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
        </div>
        </div>
        
    )
}








export default CinemaRoom