import React from "react"
import { Link } from "react-router-dom"
import { useState } from "react"

function Navbar(props){
    const [user, setUser] = useState([])
    const getToken = localStorage.getItem("auth-token")
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
        setUser(response)
        
        console.log(user);
        
        
    }).catch(err => console.log(err))

   let signedIn = false

   if (user.length != 0) {
       signedIn = true
   }

    return(
        <>
        <h1>PERFECT MOVIES</h1>
        <div id="navbar">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/CinemaRoom">CinemaRoom</a></li>
            <li><a href="/Movies">Movies</a></li>
            <li><a href="/SignIn">Sign in</a></li>
            <li><a href="/Register">Register</a></li>
            <li className="currentUser"><a>{signedIn ? `Signed in as: ${user}`: "Not signed in"}</a></li>
        </ul>
        </div>
        </>
    )

   
}


export default Navbar