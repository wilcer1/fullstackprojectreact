import React from "react"
import ReactDOM from "react-dom/client"
import "../style/SignIn.css"

function SignIn() {
    return(
        <div>
            <p id="goToSignIn">New to Perfect Movies? <a href="/Register">Create an account</a></p>
            <div className="account">
                <form name = "signIn">
                    <p id="error"></p><br></br>
                    <label>Email</label><br></br>
                    <input type="email" name="email"></input><br></br><br></br>
                    <label>Password</label><br></br>
                    <input type="password" name="password"></input>
                </form>
                <br></br>
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

    fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    })
    .then(res => res.json())
    .then(response => {
        if (response.authToken) {
            localStorage.setItem("auth-token", response.authToken)
            window.location.href = "/"
        } else {
            const error = <p>"{response}"</p>
            const currentError = ReactDOM.createRoot(document.getElementById('error'))
            currentError.render(error)
        }
    })

}



export default SignIn