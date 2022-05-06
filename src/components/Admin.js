import React from "react"
import Navbar from "./Navbar"
import { useState } from "react"

function Admin() {
    const [email, setEmail] = useState([])
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
            if (response[0].admin === 1) {
                window.location.href = "/"
            } 
        })
    }

    return(
        <div>
            <Navbar/>
        </div>
    )
}



export default Admin