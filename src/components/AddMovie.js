import React from "react"
import "../style/AddMovie.css"

function AddMovie(props){

function addMovie(){

    const movieName = document.querySelector('[name="movieName"]').innerHTML
    const description = document.querySelector('[name="description"]').innerHTML
    const director = document.querySelector('[name="director"]').innerHTML
    const releaseDate = document.querySelector('[name="releaseDate"]').innerHTML
    const actors = document.querySelector('[name="actors"]').innerHTML
    const poster = document.querySelector('[name="poster"]').innerHTML
    const trailer = document.querySelector('[name="trailer"]').innerHTML

    const details = {
        movieName: movieName,
        description: description,
        director: director,
        releaseDate: releaseDate,
        actors: actors,
        poster: poster,
        trailer: trailer,
        token: props.token
    }

    fetch("http://localhost:5000/api/admin/addMovie", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify(details)
    })
    .then(res => res.text())
    .then(response => {
        console.log(response);
        alert(response)
    })
}


return(
    <div>
            <table className="addMovie">
                <tr>
                <th>Movie Name</th><br></br>
                <td contenteditable="true" name="movieName"></td>
                </tr>
                <tr>
                <th>Description</th><br></br>
                <td contenteditable="true" name="description"></td>
                </tr>
                <tr>
                <th>Director</th><br></br>
                <td contenteditable="true" name="director"></td>
                </tr>
                <tr>
                <th>Release Date</th><br></br>
                <td contenteditable="true" name="releaseDate"></td>
                </tr>
                <tr>    
                <th>Actors</th><br></br>
                <td contenteditable="true" name="actors"></td>
                </tr>
                <tr>
                <th>Poster</th><br></br>
                <td contenteditable="true" name="poster"></td>
                </tr>
                <tr>
                <th>Trailer</th><br></br>
                <td contenteditable="true" name="trailer"></td>
                </tr>
            </table>
            <button onClick={() => addMovie()}>Add Movie</button>
            <br></br><br></br><br></br><br></br><br></br>
    </div>
)}

export default AddMovie;