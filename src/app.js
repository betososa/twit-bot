var Twit        = require('twit');
var credentials = require('../env.json');

var T = new Twit({
  consumer_key        : credentials.consumer_key,
  consumer_secret     : credentials.consumer_secret,
  access_token        : credentials.access_token,
  access_token_secret : credentials.access_token_secret
});

T.get('followers/ids', function(err, data, response) {
  console.log(data)
})


// https://api.twitter.com/1.1/statuses/update.json

// https://api.twitter.com/1.1/followers/ids.json