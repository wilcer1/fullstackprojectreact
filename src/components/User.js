import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import "../User.css"

function User() {
    const [user, setUser] = useState([])
    const getToken = localStorage.getItem("auth-token")

    useEffect(() => {
    if(getToken){
        const info = {
        token: getToken
        }

    fetch(`http://localhost:5000/api/auth/userstatus/${info.token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            if (response.admin === 1) {
                window.location.href = "/admin"
            } 
            if(response !== "Invalid Token" && response !== "") {
                fetch(`http://localhost:5000/api/user/${response.email}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Accept': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(response => {
                        setUser(response[0])
                    }) 
            } else {
                window.location.href = "/"
           }
            
        })
   } 
}, [])
            

    return(
        <div>
            <div className="userInfo">
                <h2>User information</h2>
                <br></br>
                <table className="centerTable">
                <th>Email</th>
                <td>{user.Email}</td>
                <tr></tr>
                <th>First name</th>
                <td>{user.FirstName}</td>
                <tr></tr>
                <th>Last name</th>
                <td>{user.LastName}</td>
                <tr></tr>
                <th>Birthday</th>
                <td>{("0" + user.BirthDate).substring(1,11)}</td>
                <tr></tr>
                </table>
            </div>
        </div>
        
        
    )
}



export default User