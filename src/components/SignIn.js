import React from "react"
import NavBar from "./Navbar"

function SignIn() {
    return(
        <div>
            <NavBar/>
            <div class="logIn">
                <form name = "signIn">
                    <label>Email</label><br></br>
                    <input type="text" name="email"></input><br></br><br></br>
                    <label>Password</label><br></br>
                    <input type="text" name="password"></input>
                </form>
            </div>
        </div>

    
    )
}

export default SignIn