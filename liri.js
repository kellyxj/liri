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
        spotify.search({type: "track", query: queryString}, (err, data) => {
            if(err) {
                console.log(err);
            }
            else {
                const searchItem = data.tracks.items[0];
                output += "Artist: " + searchItem.artists[0].name +"\n\n";
                output += "Track: " + searchItem.name + "\n\n";
                output += "Preview link: " + searchItem.preview_url + "\n\n";
                output += "Album: " + searchItem.album.name;
                console.log(output);
}
else if (queryType === "movie-this") {
    if(!queryString) {
        queryString = "Mr. Nobody";
    }
    queryUrl = `http://www.omdbapi.com/?apikey=daa104ee&t=${queryString}`;
}
    if(queryUrl) {
        axios.get(queryUrl).then(response => {
            if(queryType === "concert-this") {
                for(const searchItem of response.data.events) {
                    output += "Venue: " + searchItem.venue.name +"\n\n";
                    output += "Venue location: " + searchItem.venue.display_location + "\n\n";
                    output += "Date: " + moment(searchItem.datetime_utc).format("MM/DD/YYYY") + "\n-----------------------\n";
                }
            }
else {
    console.log("Unsupported search type");
}
            console.log(output);
    }).catch(error => {
        console.log(error);
    })
}