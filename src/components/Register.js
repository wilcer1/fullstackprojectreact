import React from "react"
import ReactDOM from "react-dom/client"
import "../style/Register.css"

function Register() {
    return(
        <div>
            <p id="goToRegister">Already have an account? <a href="/SignIn">Sign In</a></p>
            <div className="account">
            <form name = "register">
                <p id="error"></p><br></br>
                <label>Email</label><br></br>
                <input type="email" name="email"></input><br></br><br></br>
                <label>First name</label><br></br>
                <input type="text" name="firstname"></input><br></br><br></br>
                <label>Last name</label><br></br>
                <input type="text" name="lastname"></input><br></br><br></br>
                <label>Birthday</label><br></br>
                <input id="userDate" type="date" name="birthday"></input><br></br><br></br>
                <label>Password</label><br></br>
                <input type="password" name="password"></input><br></br><br></br>
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

    const info = {
        email: email,
        firstname: firstname,
        lastname: lastname,
        birthday: birthday,
        password: password
    }

    fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    })
    .then(res => res.text())
    .then(response => {
        if (response === "Registered Successfully"){
            validateRegister(email, password)
            
        }else{
            const error = <p>{response}</p>
            const currentError = ReactDOM.createRoot(document.getElementById('error'))
            currentError.render(error)
        }
            

    }) 
     
        
}

function validateRegister(email, password) {
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
        localStorage.setItem("auth-token", response.authToken)
        window.location.href = "/"
    })
}


export default Register