import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import "../Navbar.css"

function Navbar(){
    const [signOut, setSignOut] = useState([])
    const [signIn, setSignIn] = useState([])
    const [register, setRegister] = useState([])
    const [currentUser, setCurrentUser] = useState([])

    useEffect(() => {
        const getToken = localStorage.getItem("auth-token")
    
        const info = {
        token: getToken
        }
    if(!getToken){
        setSignIn(<li><a href="/SignIn">Sign in</a></li>)
        setRegister(<li><a href="/Register">Register</a></li>)
        setCurrentUser(<li className="currentUser"><a>Not signed in</a></li>)}

    else{
    
    fetch(`http://localhost:5000/api/auth/userstatus/${info.token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }
            
        })
        .then(res => res.json())
        .then(response => {
                if (response !== "Email does not exist" && response !== "Invalid Token") {
                    setSignOut(<li><a onClick={logOut}>Log out</a></li>)
                    if (response.admin === 1) {
                        setCurrentUser(<li className="currentUser"><a href="/admin">Signed in as: {response.email}</a></li>)
                    } else {
                        setCurrentUser(<li className="currentUser"><a href="/user">Signed in as: {response.email}</a></li>)
                    }
                } 
                else {
                    logOut()
                }
        }) }

    }, [])


    return(
        
        <>
            <header className="menu">
                <div className="menu-wrap">
                <input type="checkbox" id="checkbox"></input>
                    <nav>
                        <ul>
                            <li><a href="/"><h1>PERFECT MOVIES</h1></a></li>
                            <li><a href="/Movies">Movies</a></li>
                            {signIn}
                            {register}
                            <li><a href="/About">About</a></li>
                            {signOut}
                            {currentUser}
                        </ul>
                    </nav>
                <label for="checkbox">
                <i className="fa fa-bars menu-icon"></i>
                </label>
                </div>
            </header>
        </>
    )
}

function logOut() {
    const getToken = localStorage.getItem("auth-token")
    localStorage.removeItem("auth-token", getToken)
    window.location.href = "/"
}


export default Navbar