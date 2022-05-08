import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import "../Admin.css"

function Admin() {
    const getToken = localStorage.getItem("auth-token")
    const [data, setData] = useState([])

    useEffect(() => {
    if(getToken){
        const info = {
        token: getToken
        }

        fetch(`http://localhost:5000/api/auth/userstatus/${info.token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            if(response !== "Invalid Token" && response !== "") {
                if (response.admin !== 1) {
                    window.location.href = "/user"
            } 
            } else {
                window.location.href = "/"
            }
            
            
            
        })
    } else {
        window.location.href = "/"
}


}, [])

    useEffect(() => {
        fetch(`http://localhost:5000/api/movie`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            console.log(response);
            setData(response)
            
            
            
            
        })

}, [])
        
    
    
        
    

        
    return(
        <div>
            <table>
              {data.map(
            (myData) => (
                <table>
            {Object.entries(myData).map(
                (dataIsGood) => (
                
                        <tr>
                        <th>{dataIsGood[0]}</th>
                        <td>{dataIsGood[1]}</td>
                        </tr>
                
                )
            )}
            </table>
           
              )
    )}
                
            
                    
                
            </table>
            
        </div>
    )
    }



export default Admin