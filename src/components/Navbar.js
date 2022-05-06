import React from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import Footer from "./Footer"

function Navbar(props){
    var signIn
    var register
    var currentUser

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
                setUser(response)
            }
            
            
        }).catch(err => console.log(err))  
    }


    if (user.length != 0) {
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
            <li><a href="/About">About</a></li>
            {currentUser}
        </ul>
       
        </div>
        </>
    )
}


export default Navbar