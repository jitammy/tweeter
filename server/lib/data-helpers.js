"use strict";
const {ObjectId} = require('mongodb')
// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Saves a tweet to `db`
    saveTweet: function (newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback);
    },
    // Get all tweets in `db`, sorted by newest first
    getTweets: function (callback) {
      db.collection("tweets").find({}).sort({ created_at: 1 }).toArray((err, tweets) => {
        if (err) {
          return callback(err)
        }
        callback(null, tweets)
      })
    },
    likeTweet: function (objID, callback){
      db.collection("tweets").update({"_id": ObjectId(objID)},{$inc :{likes: 1}}, callback);
    },
    unlikeTweet: function (objID, callback){
      db.collection("tweets").update({"_id": ObjectId(objID)},{$inc :{likes: -1}}, callback);
    },
  };
}
