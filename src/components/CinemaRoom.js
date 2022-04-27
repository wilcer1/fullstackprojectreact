import React from "react"
import Navbar from "./Navbar"
import { useEffect } from "react"
import { useState } from "react"

function CinemaRoom(props){
    const [dataTable, setDataTable] = useState([])
    const [rows, setRows] = useState([])
    useEffect(() => {
        const numberOfRows = 5
        const rows = []
        for (let i = 0; i <= numberOfRows; i++){
            rows.push(i)
        }
        const list = [
            {
            id: 1, 
            row: 1,
            booked: false
            },
            {
            id: 2, 
            row: 1,
            booked: false
            },
            {
            id: 3,
            row: 1,
            booked: true
            },
            {
            id: 4, 
            row: 1,
            booked: false
            },
            {
            id: 5, 
            row: 1,
            booked: false
            },
            {
            id: 6, 
            row: 2,
            booked: false
            },
            {
            id: 7, 
            row: 2,
            booked: false
            },
            {
            id: 8, 
            row: 2,
            booked: true
            },
            {
            id: 9, 
            row: 2,
            booked: false
            },
            {
            id: 10, 
            row: 2,
            booked: false
            },
            {
            id: 11, 
            row: 3,
            booked: true
            },
            {
            id: 12,
            row: 3,
            booked: true
            },
            {
            id: 13, 
            row: 3,
            booked: true
            },
            {
            id: 14, 
            row: 3,
            booked: true
            },
            {
            id: 15, 
            row: 3,
            booked: true
            },
            {
            id: 16, 
            row: 4,
            booked: false
            },
            {
            id: 17, 
            row: 4,
            booked: false
            },
            {
            id: 18, 
            row: 4,
            booked: true
            },
            {
            id: 19, 
            row: 4,
            booked: false
            },
            {
            id: 20, 
            row: 4,
            booked: false
            },
            {
            id: 21,
            row: 5,
            booked: false
            },
            {
            id: 22, 
            row: 5,
            booked: false
            },
            {
            id: 23, 
            row: 5,
            booked: true
            },
            {
            id: 24, 
            row: 5,
            booked: false
            },
            {
            id: 25, 
            row: 5,
            booked: false
            }
        ]
        // fetch("http://localhost:5000/cinemaRoom/api/1001/seats")
        // .then(res => {
        //     // setDataTable(res)
        //     console.log(res);
        // })

        // fetch ("http://localhost:5000/cinemaRoom/api/1001/rows")
        // .then(res => {
        //     // setDataTable(res[0].numOfRows)
        //     // console.log(res[0].numOfRows);
        // })
        setDataTable(list)
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
                .filter(item => item.row == row)
                .map(item => (
                    <td>
                        <button
                            id={item.id}
                            style={item.booked ? {backgroundColor: "red"} : {backgroundColor: "yellowgreen"}}
                            onClick={() => test(item.id, item.booked)}
                        >{item.id}
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