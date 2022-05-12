import React from "react"

function AddScreening(props){

    function addScreening(){
        const time = document.querySelector('[name="time"]').innerHTML;
        const date = document.querySelector('[name="date"]').innerHTML;
        const movieId = document.querySelector('[name="movieId"]').innerHTML;

        const details = {
            time: time,
            date: date,
            movieId: movieId,
            token: props.token
        }

        fetch("api/admin/addScreening", {
            method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify(details)

        })
        .then(res => res.text())
        .then(response => {
            alert(response)
        })





    }

    return(
        <div>
            <table className="addScreening">
                <h1>Add Screening</h1>
                <tr>
                <th>Movie id</th><br></br>
                <td contenteditable="true" name="movieId"></td>
                </tr>
                <tr>
                <th>Date</th><br></br>
                <td contenteditable="true" name="date"></td>
                </tr>
                <tr>
                <th>Time</th><br></br>
                <td contenteditable="true" name="time"></td>
                </tr>
            </table>
            <button onClick={() => addScreening()}>Add Screening</button>
            <br></br><br></br><br></br><br></br><br></br>
    </div>

    )

}

export default AddScreening;