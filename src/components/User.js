import React from "react"
import { useState } from "react"

function User() {
    const [email, setEmail] = useState([])
    const [user, setUser] = useState([])
    const getToken = localStorage.getItem("auth-token")

    if(getToken){
        const info = {
        token: getToken
        }

    fetch(`http://localhost:5000/api/auth/user/${info.token}`, {
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
    

        fetch(`http://localhost:5000/api/auth/userstatus/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            console.log(response[0].admin);
            if (response[0].admin === 0) {
                window.location.href = "/Admin"
            } 
        })


        fetch(`http://localhost:5000/api/user/${email}`, {
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

        

    return(
        <div>
            <div className="userInfo">
                <h2>User information</h2>
                <table className="centerTable">
                <th>Email</th>
                <td>{email}</td>
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
}


export default User