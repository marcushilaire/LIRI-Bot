var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var feature = process.argv[2];

if (feature == "my-tweets") {
    myTweets();
} else if (feature == "spotify-this-song") {
    spotify();
} else if (feature == "movie-this") {
    movieThis();
} else if (feature == "do-what-it-says") {
    doWhatItSays();
} else {
    console.log("Not A Valid Command")
}