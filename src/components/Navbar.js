import React from "react"
import { useState } from "react"
import { useEffect } from "react"

function Navbar(){
    const [signIn, setSignIn] = useState([])
    const [register, setRegister] = useState([])
    const [currentUser, setCurrentUser] = useState([])

    useEffect(() => {
    const getToken = localStorage.getItem("auth-token")

    // Do only if the user is signed in
    if(getToken){
        const info = {
        token: getToken
    }

    // Get email and admin trough sign in token
    fetch(`http://localhost:5000/api/auth/user1/${info.token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }
            
        })
        .then(res => res.json())
        .then(response => {
            alert(response);
                if (response.length != 0) {
                    if (response.admin === 1) {
                        setCurrentUser(<li className="currentUser"><a href="/admin">Signed in as: {response.email}</a></li>)
                    } else {
                        setCurrentUser(<li className="currentUser"><a href="/user">Signed in as: {response.email}</a></li>)
                    }
                    
                    
                } else {
                    setSignIn(<li><a href="/SignIn">Sign in</a></li>)
                    setRegister(<li><a href="/Register">Register</a></li>)
                    setCurrentUser(<li className="currentUser"><a>Not signed in</a></li>)
                }
            
        }) 
    }}, [])

    

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
            <li><a onClick={logOut}>Log out</a></li>
            {currentUser}
        </ul>
        </div>
        </>
    )
}

function logOut() {
    const getToken = localStorage.getItem("auth-token")
    localStorage.removeItem("auth-token", getToken)
    window.location.reload()
}


export default Navbar