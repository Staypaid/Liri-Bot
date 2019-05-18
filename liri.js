//.env keeps api keys hidden
require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys");

var Spotify = require('node-spotify-api');
 var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

var input = process.argv;
console.log(input);

// write input on the log.txt file
var infoLog = "-- " + input.slice(2).join(" ") + "\n"

console.log(infoLog)
fs.appendFile("log.txt", infoLog, 'utf8', function(error){
  return;
})

//displays input and controls spacing
var operation = input[2];
var info = input.slice(3).join(" ");

console.log(operation);
console.log(info);



switch(operation) {

    case "concert-this":

            searchConcerts()
      // code block
      break;

    case "spotify-this-song":
    searchSongs()
      break;

      case "movie-this":
   searchMovies()
      break;

      case "do-what-it-says":
      searchWhatever()
      break;
    
    default:
    console.log("I don't understand what you want")
  }




  function searchConcerts(){
    var artist = info
    console.log(artist)
    //artist = "ariana grande"
    //// axios call to the url with the artits or band from my input
    var queryURL= "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    //https://rest.bandsintown.com/artists/ariana grande/events?app_id=codingbootcamp


    axios.get(queryURL)
        .then(function(res){
             
            //console.log(res.data)
            //use moment to format dates
            for (var i = 0; i < res.data.length; i++){
                console.log(res.data[i].venue.name, res.data[i].venue.country, res.data[i].venue.city)
                console.log(moment(res.data[i].datetime).format("MM/DD/YY"))
            }

        

        }
    )

  }


  function searchMovies(){

    var movies = info
    var queryURL = "http://www.omdbapi.com/?t=" + movies + "&apikey=trilogy"
   
    axios.get(queryURL)
        .then(function(res){
          console.log(res.data.Title)
          console.log(res.data.Year)
          console.log(res.data.imdbRating)
          console.log(res.data.Ratings[1].Value)
          console.log(res.data.Country)
          console.log(res.data.Language)
          console.log(res.data.Plot)
          console.log(res.data.Actors)



        })
  
  }
  // Title of the movie.
  // * Year the movie came out.
  // * IMDB Rating of the movie.
  // * Rotten Tomatoes Rating of the movie.
  // * Country where the movie was produced.
  // * Language of the movie.
  // * Plot of the movie.
  // * Actors in the movie.


function  searchWhatever(){

  fs.readFile("random.txt",'utf8', function(error, data){
    console.log(data)
  
  })

}
function searchSongs(){
    var song = info

    fs.appendFile('./log.txt', 'User Command: node liri.js spotify-this-song' + song + '\n\n', (err) => {
      if(err) throw err;
    });
    var search;
    if(song === ''){
      search = 'The Sign Ace of Base';
    } else {
      search = song;
    }


    spotify.search({ type: 'track', query: search}, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
    //console.log(data); 
    console.log(data.tracks.items[0])
    //console.log(data.tracks.items[0].preview_url)

    for (var i = 0; i < data.tracks.items.length; i++){

       // console.log(data.tracks.items[i])
       console.log("--------------")
       console.log(data.tracks.items[i].name)
       var artistsNames = []
       for (var j=0; j < data.tracks.items[i].album.artists.length; j++){
         artistsNames.push(data.tracks.items[i].album.artists[j].name)
       } 
       console.log(artistsNames.join(","))
       console.log(data.tracks.items[i].album.name)
       console.log(data.tracks.items[i].preview_url)
    }
    });


}


/// if operation ====  concerts {}

// if operation === movies {}


/// if operation === songs {}

// if operation === whatever {}

