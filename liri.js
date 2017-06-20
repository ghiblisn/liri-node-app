
var fs = require("fs");
var request = require('request');
var Spotify = require('node-spotify-api');
var Twit = require('twit');
var Twitter = require('twitter');
var keys = require('./keys')

var spotify = new Spotify(
	keys.spotifyKeys
);

var T = new Twit(
	keys.twitterKeys	
)

var client = new Twitter(
	keys.twitterKeys
);
 
 
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

function tweetThis(){
	var params = {screen_name: 'realDonaldTrump'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  	if (!error) {
	  		var result = "";
		  	for(var i =0; i<10;i++){
				result +=tweets[i].created_at +"\n"+
		  			tweets[i].text +"\n"+
		  			tweets[i].user.name +"\n"
		  			+"========================="+"\n"
			}
			console.log(result);
			logThis(result);
	  	}
	});

	// T.get('search/tweets', { q: 'banana since:2011-07-11', count: 10 }, function(err, data, response) {
	// 	for(var i =0; i<data.statuses.length;i++){
	// 		console.log(
	//   			data.statuses[i].created_at +"\n"+
	//   			data.statuses[i].text +"\n"+
	//   			data.statuses[i].user.name +"\n"
	//   			+"========================="
	//   		)
	// 	}
	// })
}

function doThis(){
	fs.readFile("random.txt", "utf8", function(err, data) {

	  	if (err) {
	    	return console.log(err);
	  	}
	  	var dataArr = data.split(",");
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
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		var result = "Artist(s): " + data.tracks.items[0].artists[0].name  +"\n"+ 
	    	"Song Title : " + data.tracks.items[0].name  +"\n"+ 
	    	"Spotify Preview Link : " + data.tracks.items[0].preview_url  +"\n"+ 
	    	"Album : " + data.tracks.items[0].album.name  +"\n"
		console.log(result);
		logThis(result);
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
	request(queryUrl, function(error, response, body) {

	  	if (!error && response.statusCode === 200) {
	  		var result = "Title: " + JSON.parse(body).Title  +"\n"+ 
		    	"Year: " + JSON.parse(body).Year  +"\n"+ 
		    	"IMDB Rating: " + JSON.parse(body).imdbRating  +"\n"+ 
		    	"Country: " + JSON.parse(body).Country  +"\n"+ 
		    	"Language: " + JSON.parse(body).Language  +"\n"+ 
		    	"Plot: " + JSON.parse(body).Plot  +"\n"+ 
		    	"Actors: " + JSON.parse(body).Actors  +"\n"
		    console.log(result);
		    logThis(result);
	  	}
	});
}

function logThis(z){
	fs.appendFile('log.txt', z+"\n", (err) => {
	  	if (err) throw err;
	});
}




