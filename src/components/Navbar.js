import React from "react"
import { useState } from "react"
import Footer from "./Footer"
import { useEffect } from "react"

function Navbar(){
    const [signIn, setSignIn] = useState([])
    const [register, setRegister] = useState([])
    const [currentUser, setCurrentUser] = useState([])

    useEffect(() => {
        const getToken = localStorage.getItem("auth-token")
    
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
                if (response.length != 0) {
                    setCurrentUser(<li className="currentUser"><a href="/user">Signed in as: {response}</a></li>)
                    
                }else {
                    setSignIn(<li><a href="/SignIn">Sign in</a></li>)
                    setRegister(<li><a href="/Register">Register</a></li>)
                    setCurrentUser(<li className="currentUser"><a>Not signed in</a></li>)
                }
            
        }) 
    }, [])


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