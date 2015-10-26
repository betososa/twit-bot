var moment = require('moment');

import * as Utils from './utils';

var MongoClient = require('mongodb').MongoClient;
var Twit        = require('twit');
var credentials = require('../env.json');
var errors      = [];


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

  let collection = db.collection('lookup');

  collection.find().toArray(function(err, users){

    if (err) {
      console.error("Error al recuperar de mongo usuarios :(");
      throw new Error(err);
    }

    var toDelete = []

    users.map(function(obj){
      if (obj.status && obj.status.text) {
        var st = obj.status.text;
      }
      else
        var st = 'vacio';
      if (obj.status && obj.status.created_at) {
        var date = moment(obj.status.created_at)
      }
      else
        var date = moment();
      // console.log(`User @${obj.screen_name} y su último twit fue: ${moment(date)} `);
      // console.log(`isBefore :: ${date.isAfter('2015-01-01')}`);
      // isBefore('yyyy-mm-dd')
      if(date.isBefore('2015-06-01')) {
        toDelete.push(obj);
      }
    });
    console.log(toDelete.length);
    toDelete.map(function(user){
      if (user.status && user.status.text) {
        var st = user.status.text;
      }
      else
        var st = 'vacio';
      if (user.status && user.status.created_at) {
        var date = moment(user.status.created_at)
      }
      else
        var date = moment();
      // console.log(`@${user.screen_name} twiteo por ultima vez el ${date}`);
    });
  })


});

//   var toSearch = [];
//   var col = db.collection('lookup');

//   T.get('friends/ids', function(err, ids, response){
//     if (err) {
//       console.error("Error al recuperar ids de usuarios");
//       throw new Error(err);
//     }

//     console.log("ids :: ", ids.ids.length)

//     var names = ids.ids.slice(900,949).join();


//     T.post('users/lookup',  {user_id:names},function(err, users, response){

//       if (err) {
//         console.error("Error al hacer lookup de usuarios");
//         throw new Error(err);
//       }

//       col.insertMany(users, function(err, r){
//         if (err) {
//           console.error("Error al insertar en mongo");
//           throw new Error(err);
//         }

//         console.info("Insertados :o");
//       });
//     });

//   })


// });



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

