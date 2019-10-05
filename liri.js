const axios = require("axios");
const Spotify = require("node-spotify-api");
const moment = require("moment");
const dotenv = require("dotenv").config();
const fs = require("fs");
const keys = require("./keys.js");

const spotify = new Spotify(keys.spotify);

[, , queryType, ...rest] = process.argv;
let queryString = rest? rest.join(" ") : "";

let queryUrl = "";
let output = "";
if (queryType === "do-what-it-says") {
    
}
else if(queryType === "concert-this") {
    queryUrl = `https://api.seatgeek.com/2/events?q=${queryString}&client_id=MTg3NTQwNzh8MTU3MDI0MTk0Ni44NQ`;
}
else if (queryType === "spotify-this-song") {
    if(!queryString) {
        queryString = "The Sign";
    }
}
else if (queryType === "movie-this") {
    if(!queryString) {
        queryString = "Mr. Nobody";
    }
    queryUrl = `http://www.omdbapi.com/?apikey=daa104ee&t=${queryString}`;
}
else {
    console.log("Unsupported search type");
}

if(queryUrl) {
    axios.get(queryUrl).then(response => {
    }).catch(error => {
        console.log(error);
    })
}