import React from "react"
import "../Admin.css"
import { useState } from "react"
import { useEffect } from "react"
import UpdateMovie from "./UpdateMovie"
import AddMovie from "./AddMovie"
import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";
import ChartContainer from "./charts/pie";

function Admin() {
    const getToken = localStorage.getItem("auth-token")

    useEffect(() => {
    if(getToken){
        const info = {
        token: getToken
        }

        fetch(`/api/auth/userstatus/${info.token}`, {
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

return(
    <div className="admin">
        <UpdateMovie token={getToken}/>
        <AddMovie token={getToken}/>
        <div className="chart">
        <ChartContainer />
        </div>
    </div>
)

}



export default Admin