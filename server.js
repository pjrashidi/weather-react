require('dotenv').config()

const express = require('express')
const server = express()
const axios = require('axios')
const PORT = process.env.PORT
const darkSkyKey = process.env.DARK_SKY_KEY

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.get('/forecast/:coord', (req, res) => {
  axios.get(`https://api.darksky.net/forecast/${darkSkyKey}/${req.params.coord}`)
    .then((response) => {
      res.send(JSON.stringify(response.data, null, 4))
    })
    .catch((error) => {
      console.log(error)
    })
})

server.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(PORT, () => {
  console.log('Listening on PORT', PORT)
})
