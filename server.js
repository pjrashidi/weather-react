require('dotenv').config()

const express = require('express'),
  server = express(),
  axios = require('axios'),
  redis = require('redis'),
  redisClient = redis.createClient(),
  MongoClient = require('mongodb').MongoClient,
  mongoDBurl = 'mongodb://localhost:27017/weatherReact',
  assert = require('assert'),
  PORT = process.env.PORT,
  darkSkyKey = process.env.DARK_SKY_KEY

server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// Use connect method to connect to the server
MongoClient.connect(mongoDBurl, function (err, db) {
  console.log('Connected successfully to mongoDB server')
  let users = db.collection('users'),
    validateUserInput = function (db, newUserData, returnObject, callback) {
      // make sure username isn't a duplicate
      users
        .find({ username: newUserData.username })
        .toArray(function (err, doc) {
          console.log(doc)
          if (
            doc.length === 0 && newUserData.username && newUserData.password
          ) {
            returnObject.userAvailable = true
          }
          callback(db, newUserData, returnObject)
        })
    }
  insertUser = function (db, newUserData, returnObject, callback) {
    if (returnObject.userAvailable) {
      users.insertOne(newUserData)
      console.log(`Added new user ${JSON.stringify(newUserData)}`)
    }
    callback(returnObject)
  }
  server.get('/mongodb/registerNew/:newUserData', (req, res) => {
    let newUserData = JSON.parse(req.params.newUserData),
      returnObject = {
        username: newUserData.username || false,
        password: newUserData.password || false,
        userAvailable: false
      }
    // first check if that username already exists, if it doesn't -> callback adds a new user with it
    validateUserInput(db, newUserData, returnObject, function () {
      insertUser(db, newUserData, returnObject, function () {
        res.send(returnObject)
      })
    })
  })
})

server.get('/forecast/:coord', (req, res) => {
  redisClient.get(req.params.coord, function (err, reply) {
    if (reply) {
      res.send(JSON.parse(reply))
    } else {
      axios
        .get(
          `https://api.darksky.net/forecast/${darkSkyKey}/${req.params.coord}`
        )
        .then(response => {
          redisClient.set(
            `${req.params.coord}`,
            JSON.stringify(response.data),
            'EX',
            900
          )
          res.send(response.data)
        })
        .catch(error => {
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
