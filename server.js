require('dotenv').config()

const express = require('express'),
      server = express(),
      axios = require('axios'),
      redis = require("redis"),
      redisClient = redis.createClient(),
      MongoClient = require('mongodb').MongoClient, 
      assert = require('assert'),
      PORT = process.env.PORT,
      darkSkyKey = process.env.DARK_SKY_KEY

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Connection URL
var mongoDBurl = 'mongodb://localhost:27017/weatherReact';

// Use connect method to connect to the server
MongoClient.connect(mongoDBurl, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to mongoDB server");
  var users = db.collection('users')
  
  var insertUsers = function(db, callback) {
    users.insertOne({"user":"bob"}, function(err, result) {
      console.log("Added bob");
      callback(result);
    });
  }

  var findUsers = function(db, callback) {
    users.find({}).toArray(function(err, docs) {
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }

  insertUsers(db, function() {
    findUsers(db, function() {
      db.close();
    });
  });
});

server.get('/forecast/:coord', (req, res) => {
  redisClient.get(req.params.coord, function(err, reply) {
    if (reply) {
      res.send(JSON.parse(reply))
    } else {
      axios.get(`https://api.darksky.net/forecast/${darkSkyKey}/${req.params.coord}`)
      .then((response) => {
        redisClient.set(`${req.params.coord}`, JSON.stringify(response.data), 'EX', 900)
        res.send(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  })
})

server.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(PORT, () => {
  console.log('Listening on PORT', PORT)
})
