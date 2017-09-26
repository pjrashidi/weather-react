require('dotenv').config()

const express = require('express'),
  app = express(),
  session = require('express-session')  
  bodyParser = require('body-parser'),
  axios = require('axios'),
  redis = require('redis'),
  redisClient = redis.createClient(),
  MongoClient = require('mongodb').MongoClient,
  mongoDBurl = 'mongodb://localhost:27017/weatherReact',
  assert = require('assert'),
  bcrypt = require('bcrypt'),
  saltRounds = 10,
  PORT = process.env.PORT,
  darkSkyKey = process.env.DARK_SKY_KEY,
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  flash = require('connect-flash')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// passport.serializeUser(function(user, cb) {
//   cb(null, user.id);
// });

// passport.deserializeUser(function(id, cb) {
//   db.users.findById(id, function (err, user) {
//     if (err) { return cb(err); }
//     cb(null, user);
//   });
// });

app.use(bodyParser.json())

// Use connect method to connect to the server
MongoClient.connect(mongoDBurl, function (err, db) {
  console.log('Connected successfully to mongoDB server')
  let users = db.collection('users'),
    // validateLogin = function (db, loginCredentials, returnObject, callback) {
    //   users
    //     .find({ username: loginCredentials.username })
    //     .toArray(function (err, doc) {
    //       if (doc.length === 1) {
    //         returnObject.userExists = true
    //         bcrypt.compare(loginCredentials.password, doc[0].password, function (
    //           err,
    //           res
    //         ) {
    //           console.log(res)
    //           if (res === true) returnObject.passwordCorrect = true
    //           console.log(doc)
    //           callback(returnObject)
    //         })
    //       } else {
    //         console.log(doc)
    //         callback(returnObject)
    //       }
    //     })
    // }
    validateRegister = function (
      db,
      registerCredentials,
      returnObject,
      callback
    ) {
      // make sure username isn't a duplicate
      users
        .find({ username: registerCredentials.username })
        .toArray(function (err, doc) {
          console.log(doc)
          if (doc.length === 0 && registerCredentials.username) {
            returnObject.userAvailable = true
          }
          callback(db, registerCredentials, returnObject)
        })
    }
  insertUser = function (db, registerCredentials, returnObject, callback) {
    if (returnObject.userAvailable && returnObject.password) {
      bcrypt.hash(registerCredentials.password, saltRounds, function (
        err,
        hash
      ) {
        registerCredentials.password = hash
        users.insertOne(registerCredentials)
        console.log(`Added new user ${JSON.stringify(registerCredentials)}`)
      })
    }
    callback(returnObject)
  }
  passport.use(
    new LocalStrategy(function (username, password, done) {
      users.findOne({ username: username }, function (err, user) {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' })
        }
        bcrypt.compare(password, user.password, function (
          err,
          res
        ) {
          if (res !== true) return done(null, false, { message: 'Incorrect password.' })
        })
        return done(null, user)
      })
    })
  )
  app.post(
    '/mongodb/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/mongodb/login',
      failureFlash: true
    })
  )
  // app.get('/mongodb/login/:loginCredentials', (req, res) => {
  // let loginCredentials = JSON.parse(req.params.loginCredentials),
  //   returnObject = {
  //     username: loginCredentials.username || false,
  //     password: loginCredentials.password || false,
  //     userExists: false,
  //     passwordCorrect: false
  //   }
  // validateLogin(db, loginCredentials, returnObject, function () {
  //   res.send(returnObject)
  // })
  // })
  app.post('/mongodb/registerNew', (req, res) => {
    console.log(req.body)
    let registerCredentials = req.body,
      returnObject = {
        username: registerCredentials.username || false,
        password: registerCredentials.password || false,
        userAvailable: false
      }
    // first check if that username already exists, if it doesn't -> callback adds a new user with it
    validateRegister(db, registerCredentials, returnObject, function () {
      insertUser(db, registerCredentials, returnObject, function () {
        res.send(returnObject)
      })
    })
  })
})

app.get('/forecast/:coord', (req, res) => {
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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log('Listening on PORT', PORT)
})
