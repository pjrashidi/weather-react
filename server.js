require('dotenv').config()

const express = require('express'),
      server = express(),
      axios = require('axios'),
      redis = require("redis"),
      redisClient = redis.createClient(),
      PORT = process.env.PORT,
      darkSkyKey = process.env.DARK_SKY_KEY

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.get('/forecast/:coord', (req, res) => {
  redisClient.get(req.params.coord, function(err, reply) {
    console.log(req.params.coord)
    if (reply) {
      console.log(`Forecast for ${req.params.coord} already stored in Redis`)
      return (JSON.parse(reply))
    } else {
      axios.get(`https://api.darksky.net/forecast/${darkSkyKey}/${req.params.coord}`)
      .then((response) => {
        console.log('RETRIEVING DATA FROM DARK SKY')
        redisClient.set(`${req.params.coord}`, JSON.stringify(response.data), 'EX', 900)
        res.send(JSON.stringify(response.data, null, 4))
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
