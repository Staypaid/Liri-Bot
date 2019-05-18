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

//displays input and controls spacing
var operation = input[2];
var info = input.slice(3).join(" ");

console.log(operation);
console.log(info);



switch(operation) {

    case "concert":

            searchConcerts()
      // code block
      break;

    case "songs":
    searchSongs()
      break;

      case "movies":
   searchMovies()
      break;

      case "whatever":
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

// imdb

  }


function  searchWhatever(){




}
function searchSongs(){
    var song = info

    // fs.appendFile('./log.txt', 'User Command: node liri.js spotify-this-song' + song + '\n\n', (err) => {
    //   if(err) throw err;
    // });
    // var search;
    // if(song === ''){
    //   search = 'The Sign Of Ace';
    // } else {
    //   search = song;
    // }


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
       console.log(data.tracks.items[i].album.artists)
       console.log(data.tracks.items[i].album.name)
       console.log(data.tracks.items[i].preview_url)
    }
    });


}


/// if operation ====  concerts {}

// if operation === movies {}


/// if operation === songs {}

// if operation === whatever {}

