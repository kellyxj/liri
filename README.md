# liri

This program is a command line interface that allows the user to make 3 types of searches:
  1. Searches of songs through the Spotify API.
  2. Searches of concerts through the seatgeek API.
  3. Searches of movies through the omdb API.

Running this app:
  1. Install node.js
  2. Clone this repo
  3. Navigate to the directory that you cloned this repo to with your command line
  4. In your command line, run npm install
  5. Sign up to use the spotify API
  6. Once you have a spotify API key, create a file in the root directory of the repo called .env.
  7. The contents of .env should be the following: 
    # Spotify API keys

    SPOTIFY_ID=your-spotify-id
    SPOTIFY_SECRET=your-spotify-secret
    
    Where your-spotify-id is your api key and your-spotify-secret is your secret.
  8. In your command line, you can now run the command "node liri.js ${arg1} ${arg2}"
  9. arg1 should be the type of query you want to make. To search spotify, type spotify-this-song. To search seatgeek, type concert-this.
     To search omdb, type movie-this.
  10. arg2 should be your search query e.g. if you are doing a Spotify search, it will be a song title. This does not require special
      formatting, and it may containe multiple words separated by spaces.
  11. To search with random arguments, let arg1 = do-what-it-says.
  
  Video of working application: https://drive.google.com/file/d/16hIc7IVGZNd2ApW70_BOW5Dcr7M0kIXT/view
