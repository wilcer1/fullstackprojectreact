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
                <button onClick={validateSignIn}>Log in</button>
            
            </div>
        </div>

    )

}

function validateSignIn() {
    const email = document.forms["signIn"]["email"].value
    const password = document.forms["signIn"]["password"].value
    const info = {
        email: email,
        password: password
    }
    
    fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    })
    .then(res => res.json())
    .then(response => {
        console.log(response);
        localStorage.setItem("auth-token", response.token)
        
        
    });


}




export default SignIn