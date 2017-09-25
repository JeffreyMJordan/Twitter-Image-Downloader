console.log("The bot is starting");

var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);


var downloader = require('./downloader');
var followList = ["IDS_OF_ACCOUNTS_YOU_WANT_TO_FOLLOW_HERE"];
var stream = T.stream('statuses/filter', { follow :  followList});


stream.on('tweet', function (tweet, err) {
	if (tweet.entities.media==undefined){
		console.log("text-only tweet");
	}else if (tweet.retweeted_status == undefined){
	var name = "images/" + tweet.id_str + ".png";
    downloader.download(tweet.entities.media[0].media_url, name, callback)
	}
})

var callback = function(){
	var today = new Date();
	var date = today.getFullYear() + '-'+(today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date + " "+ time
	console.log("Download succesful: " + dateTime);
}