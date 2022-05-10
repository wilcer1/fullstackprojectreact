import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import "../Admin.css"

function UpdateMovie(props){
const [data, setData] = useState([])

useEffect(() => {
    fetch(`http://localhost:5000/api/movie`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        setData(response)
        
        
        
        
    })

}, [])

function update(id, header, data){
    const details = {
        movieId: id,
        column: header,
        updValue: data,
        token: props.token
    }

    fetch("http://localhost:5000/api/admin/updMovie", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify(details)
    })
    .then(res => res.text())
    .then(response => {
        alert(response)
    })
}

function del(id){
    
    const details = {
        movieId: id,
        token: props.token
    }

    fetch("http://localhost:5000/api/admin/delMovie", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify(details)
    })
    .then(res => res.text())
    .then(response => {
        console.log(response);
        alert(response)
    })

}

return(
    <div>
          {data.map(
        (myData) => (
            <table>
        {Object.entries(myData).map(
            (value, key) => (
                    <tr>
                    <th>{value[0]}</th>
                    <td id={`${myData.MovieId}${key}`} contenteditable="true">{value[1]}</td>
                    <button onClick={() => update(myData.MovieId, value[0], document.getElementById(`${myData.MovieId}${key}`).innerText)}>Update</button>
                    </tr>
                )
            )}
            <button onClick={() => del(myData.MovieId)}>Delete</button>
            <br></br>
            </table>
          )
          
    )}
    <hr></hr>
    </div>
)}

export default UpdateMovie;