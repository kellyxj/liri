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
userInput();
//This function is used only because fs.readFile is asynchronous. This function is recursively called on user entering
//do-what-it-says in order to reassign queryType and queryString to the appropriate values from random.txt.
function userInput () {
    if (queryType === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", (err,data) => {
            if(err) {
                console.log(err);
            }
            else {
                const randomIndex = Math.floor(Math.random()*data.split("\n").length);
                queryType = data.split("\n")[randomIndex].split(",")[0];
                queryString = data.split("\n")[randomIndex].split(",")[1];
                userInput();
            }
        })
    }
    if(queryType === "concert-this") {
        queryUrl = `https://api.seatgeek.com/2/events?q=${queryString}&client_id=MTg3NTQwNzh8MTU3MDI0MTk0Ni44NQ`;
    }
    if (queryType === "spotify-this-song") {
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
        })
    }
    if (queryType === "movie-this") {
        if(!queryString) {
            queryString = "Mr. Nobody";
        }
        queryUrl = `http://www.omdbapi.com/?apikey=daa104ee&t=${queryString}`;
    }
    //This block of code will be run only if the concert-this or movie-this commands will run. Otherwise, queryUrl is the empty string.
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
                const searchItem = response.data;
                output += "Title: " + searchItem.Title + "\n\n";
                output += "Year of Release: " + searchItem.Year + "\n\n";
                output += "IMDB Rating: " + searchItem.imdbRating + "\n\n";
                output += "Rottentomatoes Rating: " + searchItem.Ratings[1].Value + "\n\n"; //I think this line will have the wrong output if there is no imdb rating
                output += "Country: " + searchItem.Country + "\n\n";
                output += "Language: " + searchItem.Language + "\n\n";
                output += "Plot summary: " + searchItem.Plot +"\n\n";
                output += "Cast: " + searchItem.Actors;
            }
            console.log(output);
        }).catch(error => {
            console.log(error);
        })
    }
}
