import React from "react"
import Navbar from "./Navbar"
import { useEffect } from "react"
import { useState } from "react"

function CinemaRoom(props){
    const [dataTable, setDataTable] = useState([])
    useEffect(() => {
    const list = []
    for (let i = 0; i < 15; i++){
        list.push({data: i})
    }
    setDataTable(list)

}, [])
    return(
        <div>
        <Navbar/>
        <table id="CinemaRoom">
            <caption> Chair booking</caption>
            <thead>
            </thead>
            <tbody>
            {dataTable.map(item => (
            <tr>
                {dataTable.map(item => (
                    <td>
                        <button>{item.data}</button>
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