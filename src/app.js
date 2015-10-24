import * as Utils from './utils';

var MongoClient = require('mongodb').MongoClient;
var Twit        = require('twit');
var credentials = require('../env.json');
var errors      = [];

Utils.log("Si funciona no soy tan wey 2");

var T = new Twit({
  consumer_key        : credentials.consumer_key,
  consumer_secret     : credentials.consumer_secret,
  access_token        : credentials.access_token,
  access_token_secret : credentials.access_token_secret
});

var url = 'mongodb://localhost:27017/test'

MongoClient.connect(url, function(err, db) {
  if (err) {
    console.error("Error al intentar conectar con la base de datos");
    throw new Error(err);
  }


  var toSearch = [];
  var col = db.collection('lookup');

  T.get('followers/ids', function(err, ids, response){
    if (err) {
      console.error("Error al recuperar ids de usuarios");
      throw new Error(err);
    }

    var names = ids.ids.slice(0,90).join();

    T.post('users/lookup',  {user_id:names},function(err, users, response){

      if (err) {
        console.error("Error al hacer lookup de usuarios");
        throw new Error(err);
      }

      col.insertMany(users, function(err, r){
        if (err) {
          console.error("Error al insertar en mongo");
          throw new Error(err);
        }

        console.info("Insertados :o");
      });
    });

  })


});



// T.get('followers/ids', function(err, data, response) {
//   toSearch = data.ids.slice(1,10);
//   onIds(toSearch);
// });

// function onIds(ids) {
//   console.log(ids.length);
//   for (var val of ids) {
//     console.log("Mi id es ", val);
//     T.get('followers/ids', {user_id:val}, function(err, user, response){
//       console.log("-- user --", user);
//     });
//   }
// }

// https://api.twitter.com/1.1/statuses/update.json

// https://api.twitter.com/1.1/followers/ids.json

// https://api.twitter.com/1.1/users/show.json?screen_name=twitterdev

// T.get('followers/ids', { screen_name: 'tolga_tezel' },  function (err, data, response) {
//   console.log(data)
// })


// https://api.twitter.com/1.1/users/lookup.json

