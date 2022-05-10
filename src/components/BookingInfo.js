import React from "react"
import { useEffect } from "react"
import { useState } from "react"

function BookingInfo(){
    const [email, setEmail] = useState([])
    const [bookedSeats, setBookedSeats] = useState([])

    useEffect(() => {
        const getToken = localStorage.getItem("auth-token")

        if(getToken){
            const info = {
            token: getToken
        }

        fetch(`http://localhost:5000/api/auth/user/${getToken}`, {
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
                fetch(`http://localhost:5000/api/booking/bookings/${response}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(response => {
                    {
                        console.log(response);
                        
                    }
                
            
        })
            }
            
            
        })
    } else {
        window.location.href = "/SignIn"
    }
    }, [])

    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}



export default BookingInfo