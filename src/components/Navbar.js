import React from "react"
import { Link } from "react-router-dom";

function Navbar(props){

    return(
        <>
        <h1>PERFECT MOVIES</h1>
        <div id="navbar">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/cinemaRoom">CinemaRoom</a></li>
        </ul>
        </div>
        </>
    )
}

export default Navbar