Right now your `spotifyThis(songName)` and `movieThis(movie)` functions are not being passed their expected arguments when invoked:

```js
// your code
if (feature == "my-tweets") {
  myTweets();
} else if (feature == "spotify-this-song") {
  spotifyThis(); //Expects an argument
} else if (feature == "movie-this") {
  movieThis(); //Expects an argument
} else if (feature == "do-what-it-says") {
  doWhatItSays();
} else {
  console.log("Not A Valid Command");
}
```

This is leading to errors when making the api calls.

One way we can fix this is by setting up the search string globally:

```js
//suggestion
var searchString;
if (process.argv[3]) {
  for (var i = 3; i < process.argv.length; i++) {
    if (searchString) {
      searchString = searchString + " " + process.argv[i];
    } else {
      searchString = process.argv[i];
    }
  }
  searchString = searchString.trim(); //Creates one string from process.argv elements
}
```

and calling your functions with the search string or default term

```js
//suggestion
if (feature == "my-tweets") {
  myTweets();
} else if (feature == "spotify-this-song") {
  if (searchString) {
    spotifyThis(searchString);
  } else {
    spotifyThis("The Sign Ace of Base");
  }
} else if (feature == "movie-this") {
  if (searchString) {
    movieThis(searchString);
  } else {
    movieThis("Mr Nobody`");
  }
} else if (feature == "do-what-it-says") {
  doWhatItSays();
} else {
  console.log("Not A Valid Command");
}
```
