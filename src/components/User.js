import React from "react"
import Navbar from "./Navbar"
import { useState } from "react"

function User() {
    const [email, setEmail] = useState([])
    const [user, setUser] = useState([])
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
            
            
        }).catch(err => console.log(err))  
    

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
        
            
        }).catch(err => console.log(err))  

        

    return(
        <div>
            <Navbar/>
            <div className="userInfo">
                <h2>User information</h2>
                <p id="info">Email: {email}</p>
                <p id="info">First name: {user.FirstName}</p>
                <p id="info">Last name: {user.LastName}</p>
                <p id="info">Birthday: {user.BirthDate}</p>
            </div>
        </div>
        
        
    )
}
}


export default User