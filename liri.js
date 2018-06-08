var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var dotEnv = require('dotenv').config();
var Spoti = require("spotify");
var twitter = require("twitter");

function spotify(input) {
    id: input.id;
    secret: input.secret

}

function twitter(input) {
    consumer_key: input.consumer_key;
    consumer_secret: input.consumer_secret;
    access_token_key: input.access_token_key;
    access_token_secret: input.access_token_secret;
}

var spotify = new spotify(keys.spotify);
var client = new twitter(keys.twitter);

var feature = process.argv[2];

var nodeArgs = process.argv;

function movieThis() {
    var movieName = "";

    if (process.argv[3] !== false) {
        for (var i = 3; i < process.argv.length; i++) {

            if (i > 3 && i < process.argv.length) {

                movieName = movieName + "+" + nodeArgs[i];

            }

            else {

                movieName += process.argv[i];

            }
        }
    } else {
        movieName = "Mr.+Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

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

function spotifyThis() {
    console.log(process.argv);
    var song = "";
    if (process.argv[3] === false) {
        song = "The Sign"
    } else {
        for (var i=3; i < process.argv.length; i++) {
            if (i === 3) {
                song += process.argv[i];
            } else {
                song += " " + process.argv[i];
            }
        }

        spotify.get({type: "track", query: song}, function(error, data){
            if (!error) {
                console.log(data);
            } else {
                console.log(error);
            }
        });

    }
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