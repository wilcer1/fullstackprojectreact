import React from "react"
import Navbar from "./Navbar"

function Register() {
    return(
        <div>
            <Navbar/>
            <div class="account">
            <form name = "register">
                <label>Email</label><br></br>
                <input type="text" name="email"></input><br></br><br></br>
                <label>First name</label><br></br>
                <input type="text" name="firstname"></input><br></br><br></br>
                <label>Last name</label><br></br>
                <input type="text" name="lastname"></input><br></br><br></br>
                <label>Birthday</label><br></br>
                <input type="text" name="birthday"></input><br></br><br></br>
                <label>Password</label><br></br>
                <input type="text" name="password"></input><br></br><br></br>
            </form>
            <button onClick={sendRegister}>Register</button>
            </div>
        </div>
    )
}

function sendRegister() {
    const email = document.forms["register"]["email"].value
    const firstname = document.forms["register"]["firstname"].value
    const lastname = document.forms["register"]["lastname"].value
    const birthday = document.forms["register"]["birthday"].value
    const password = document.forms["register"]["password"].value
}


export default Register

