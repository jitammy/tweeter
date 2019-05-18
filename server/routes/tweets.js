"use strict";
const userHelper = require("../lib/util/user-helper")
const express = require('express');
const tweetsRoutes = express.Router();
module.exports = function (DataHelpers) {
  // get tweets
  tweetsRoutes.get("/", function (req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });
  // post tweets
  tweetsRoutes.post("/", function (req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body' });
      return;
    }
    const likes = Math.floor(Math.random() * (10 - 0) + 0);
    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      likes: likes
    };
    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });
  tweetsRoutes.post(`/:someId/like`, function (req, res) {
  let id = req.params.someId
    DataHelpers.likeTweet(id, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  })
  return tweetsRoutes;
}