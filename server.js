require('dotenv').config()

const express = require('express')
const server = express()
const key = process.env.API_KEY


server.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(3000, () => {
  console.log(key)
})
