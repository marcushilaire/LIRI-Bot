var dotEnv = require('dotenv').config();
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var Spotify = require("node-spotify-api")
// var spotifyApi = require("spotify");
// var spotifyWebApi = require("spotify-web-api-node");
var twitter = require("twitter");

function Spotify(inp) {
    id: inp.id;
    secret: inp.secret

}

function twitter(input) {
    consumer_key: input.consumer_key;
    consumer_secret: input.consumer_secret;
    access_token_key: input.access_token_key;
    access_token_secret: input.access_token_secret;
}

var spotify = new Spotify(keys.spotify);
var client = new twitter(keys.twitter);

var feature = process.argv[2];

var nodeArgs = process.argv;

function movieThis(movie) {
    var movieName = movie;

    if (process.argv.length === 3 && movieName === undefined) {

        movieName = "Mr.+Nobody";
        
    } else {
        for (var i = 3; i < process.argv.length; i++) {

            if (i > 3 && i < process.argv.length) {

                movieName = movieName + "+" + nodeArgs[i];

            }

            else {

                movieName += process.argv[i];

            }
        }
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomato Rating: " + JSON.parse(body).tomatoRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });


}


function myTweets() {
    var tweetsArr = [];
    var params = { screen_name: 'KanakiaSameer', count: 20, trim_user: true, exclude_replies: true };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error && response.statusCode === 200) {
            tweetsArr = tweets;

            for (i = 0; i < tweetsArr.length; i++) {
                console.log("Tweet: " + tweetsArr[i].text);
                console.log("Time Stamp: " + tweetsArr[i].created_at);
                console.log('-------------------');
            }
        }
        else {
            console.log(error);
        }
    });

}

function spotifyThis(songName) {
    var song = songName;
    var artists = "";
    if (process.argv.length === 3 && song === undefined) {
        song = "The Sign";
    } else {
        for (var i = 3; i < process.argv.length; i++) {
            if (i === 3) {
                song += process.argv[i];
            } else {
                song += " " + process.argv[i];
            }
        }
    }

    var params = { type: "track", query: song, id: spotify.id, secret: spotify.secret };
    spotify.search(params, function (error, data) {
        if (!error) {
            for (var j = 0; j < data.tracks.items[0].artists.length; j++)
                if (j === 0) {
                    artists += data.tracks.items[0].artists[0].name;
                } else {
                    artists += ", " + data.tracks.items[0].artists[j].name;
                }

            console.log("Artists: " + artists);
            console.log("Track: " + data.tracks.items[0].name);
            console.log("Link: " + data.tracks.items[0].external_urls.spotify);
            console.log("Album: " + data.tracks.items[0].album.name);
        } else {
            console.log(error);
        }
    });
}

function doWhatItSays() {
    fs.readFile('random.txt', "utf8", function (error, data) {
        var arr = data.split(',');

        var cmd = arr[0];
        var argument = arr[1];


        if (cmd == "my-tweets") {
            myTweets(argument);
        } else if (cmd == "spotify-this-song") {
            spotifyThis(argument);
        } else if (cmd == "movie-this") {
            movieThis(argument);
        } else {
            console.log("Not A Valid Command")
        }
    });
}









if (feature == "my-tweets") {
    myTweets();
} else if (feature == "spotify-this-song") {
    spotifyThis();
} else if (feature == "movie-this") {
    movieThis();
} else if (feature == "do-what-it-says") {
    doWhatItSays();
} else {
    console.log("Not A Valid Command")
}