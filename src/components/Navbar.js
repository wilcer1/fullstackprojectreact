import React from "react"

function Navbar(props){

    return(
        <>
        <h1>PERFECT MOVIES</h1>
        <div id="navbar">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/CinemaRoom">CinemaRoom</a></li>
            <li><a href="/SignIn">SignIn</a></li>
        </ul>
        </div>
        </>
    )
}

export default Navbar