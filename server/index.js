"use strict";
// Basic express setup:
require('dotenv').config();
const PORT          = process.env.PORT || 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const morgan        = require('morgan');
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan('short'));
MongoClient.connect(MONGODB_URI, { useNewUrlParser: true }, (err, database) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  var db = database.db('tweeter');
const DataHelpers = require("./lib/data-helpers.js")(db);
const tweetsRoutes = require("./routes/tweets")(DataHelpers);
app.use("/tweets", tweetsRoutes);
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
})
