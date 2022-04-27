import React from "react"
import Navbar from "./Navbar"
import { useEffect } from "react"
import { useState } from "react"

function CinemaRoom(props){
    const [dataTable, setDataTable] = useState([])
    const [rows, setRows] = useState([])
    useEffect(() => {
        const numberOfRows = 3
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
            booked: false
            },
            {
            id: 4, 
            row: 2,
            booked: false
            },
            {
            id: 5, 
            row: 2,
            booked: false
            },
            {
            id: 6, 
            row: 2,
            booked: false
            },
            {
            id: 7, 
            row: 3,
            booked: true
            },
            {
            id: 8, 
            row: 3,
            booked: true
            },
            {
            id: 9, 
            row: 3,
            booked: true
            }
        ]
        setDataTable(list)
        setRows(rows)

    }, [])
    const test = (id) => {
        alert(`Clicked button with id ${id}`)
    }
    return(
        <div>
        <Navbar/>
        <table id="CinemaRoom">
            <caption> Chair booking</caption>
            <thead>
            </thead>
            <tbody>
            {rows.map(row => (
            <tr>
                {dataTable
                .filter(item => item.row == row)
                .map(item => (
                    <td id={item.id}>
                        <button 
                            style={item.booked ? {backgroundColor: "red"}: {backgroundColor: "yellowgreen"}} 
                            onClick={() => test(item.id)}
                        >{item.id}
                        </button>
                    </td>
                ))}
            </tr>
          ))}
            </tbody>
        </table>
        </div>
    )
}








export default CinemaRoom