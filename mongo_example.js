"use strict";
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017";
MongoClient.connect(MONGODB_URI, (err, database) => {
    var db = database.db('tweeter');
    if (err) {
        console.error(`Failed to connect: ${MONGODB_URI}`);
        throw err;
    }
    console.log(`Connected to mongodb: ${MONGODB_URI}`);
    // other way to write getTweets function
    // function getTweets(callback) {
    //     db.collection("tweets").find().toArray(callback);
    //   }
    function getTweets(cb) {
        db.collection("tweets").find({}).toArray((err, tweets) => {
            if (err) {
                return cb(err)
            }
            cb(null, tweets)
        })
    }
    getTweets((err, tweets) => {
        if (err) throw err;

        for (let tweet of tweets) {
            console.log(tweet)
        }
        database.close()
    })
});

