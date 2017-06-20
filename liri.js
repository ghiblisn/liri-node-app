// Client ID: a802f4e8b96c43c381604b5d6f9f03ff
// Client Secret: 59bc4f88ff484794bdd7e3a1b0fa2421

var fs = require("fs");
var request = require('request');
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: 'a802f4e8b96c43c381604b5d6f9f03ff',
  secret: '59bc4f88ff484794bdd7e3a1b0fa2421'
});
 
whatYouWant(process.argv[2]); 

function whatYouWant(x,y){
	switch(x){
		case "my-tweets":
			tweetThis();
			break;
		case "spotify-this-song":
			spotifyThis(y);
			break;
		case "movie-this":
			movieThis(y);
			break;		
		case "do-what-it-says":
			doThis();
			break;
	}
}

function doThis(){
	fs.readFile("random.txt", "utf8", function(err, data) {

	  	if (err) {
	    	return console.log(err);
	  	}
	  	var dataArr = data.split(",");
	  	//dataArr.map(function(x){console.log(x)});
	  	whatYouWant(dataArr[0], dataArr[1]);
	});
}

function spotifyThis(y){
	var songName = "";

	if(y){
		songName=y;
	}
	else{
		songName = process.argv.slice(3).join(" ");
	}

	if(songName ==""){
		songName="The Sign Ace of Base"
	}
	spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
		console.log(process.argv.slice(3).join(" "));
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		console.log(
	    	"Artist(s): " + data.tracks.items[0].artists[0].name  +"\n"+ 
	    	"Song Title : " + data.tracks.items[0].name  +"\n"+ 
	    	"Spotify Preview Link : " + data.tracks.items[0].preview_url  +"\n"+ 
	    	"Album : " + data.tracks.items[0].album.name  +"\n"
	    );
	});
}

function movieThis(y) {
	var movieName = "";

	if(y){
		movieName=y;
	}
	else{
		movieName = process.argv.slice(3).join(" ");
	}

	if(movieName==""){
		movieName="Mr+Nobody";
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
	console.log(queryUrl);
	request(queryUrl, function(error, response, body) {

	  if (!error && response.statusCode === 200) {
	    console.log(
	    	"Title: " + JSON.parse(body).Title  +"\n"+ 
	    	"Year: " + JSON.parse(body).Year  +"\n"+ 
	    	"IMDB Rating: " + JSON.parse(body).imdbRating  +"\n"+ 
	    	"Country: " + JSON.parse(body).Country  +"\n"+ 
	    	"Language: " + JSON.parse(body).Language  +"\n"+ 
	    	"Plot: " + JSON.parse(body).Plot  +"\n"+ 
	    	"Actors: " + JSON.parse(body).Actors  +"\n"
	    	);
	  }
	});
}




