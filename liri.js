var keys = require("./keys.js");
var request = require("request");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var feature = process.argv[2];

var nodeArgs = process.argv;

function movieThis() {
    var movieName = "";

    for (var i = 3; i < nodeArgs.length; i++) {
    
      if (i > 3 && i < nodeArgs.length) {
    
        movieName = movieName + "+" + nodeArgs[i];
    
      }
    
      else {
    
        movieName += nodeArgs[i];
    
      }
    }
    
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    console.log(queryUrl);
    
    request(queryUrl, function(error, response, body) {
    
      if (!error && response.statusCode === 200) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("Rating: " + JSON.parse(body).imdbRating);
        console.log("Release Year: " + JSON.parse(body).tomatoRating);
        console.log("Release Year: " + JSON.parse(body).Country);
        console.log("Release Year: " + JSON.parse(body).Language);
        console.log("Release Year: " + JSON.parse(body).Plot);
        console.log("Release Year: " + JSON.parse(body).Actors);
      }
    });
    
    
}


function myTweets() {
    
}








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