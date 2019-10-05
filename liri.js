const axios = require("axios");
const spotify = require("node-spotify-api");
const moment = require("moment");
const dotenv = require("dotenv").config();
const keys = require("./keys.js");

const spotify = new Spotify(keys.spotify);