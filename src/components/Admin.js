import React from "react"
import { useState } from "react"
import { useEffect } from "react"

function Admin() {
    const getToken = localStorage.getItem("auth-token")

    useEffect(() => {
    if(getToken){
        const info = {
        token: getToken
        }

        fetch(`http://localhost:5000/api/auth/user1/${info.token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            if(response !== "Invalid Token" && response !== "") {
                if (response.admin !== 1) {
                    window.location.href = "/user"
            } 
            } else {
                window.location.href = "/"
            }
            
            
            
        })
    } else {
        window.location.href = "/"
    }


}, [])
    

      


    return(
        <div>

        </div>
    )
}



export default Admin