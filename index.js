var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/node_mongo';

function getTweets(query, callback) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected successfully to Mongo");
		var tweets = db.collection("tweets");
		console.log(tweets);

		tweets.find(query).toArray(function(err, docs) {
	    assert.equal(err, null);
	    console.log("Found the following records");
	    console.log(docs);
	    callback(docs);

	    db.close();
	  });
	});
}

app.set('view engine', 'jade');
app.set('views', './views');

app.get('/', function (req, res) {
	getTweets({},
		function (tweets) {
			res.render("index", {tweets:tweets});
		});
});

app.get('/tweets', function (req, res) {
	getTweets({},
		function (tweets) {
			res.json(tweets);
		});

});

app.listen(3000, function () {
  console.log('Starting on port 3000!');
});


