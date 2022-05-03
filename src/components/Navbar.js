import React from "react"
import { Link } from "react-router-dom"
import { useState } from "react"

function Navbar(props){
    let signedIn = false
    var signIn
    var register
    var currentUser

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
        
    }).catch(err => console.log(err))

    if (user.length != 0) {
        signedIn = true
        currentUser = <li className="currentUser"><a href="/user">Signed in as: {user}</a></li>
       
    } else {
        signIn = <li><a href="/SignIn">Sign in</a></li>
        register = <li><a href="/Register">Register</a></li>
        currentUser = <li className="currentUser"><a>Not signed in</a></li>
    }
    
   
    return(
        <>
        <h1>PERFECT MOVIES</h1>
        <div id="navbar">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/Movies">Movies</a></li>
            {signIn}
            {register}
            {currentUser}
        </ul>
        </div>
        </>
    )

   
}


export default Navbar