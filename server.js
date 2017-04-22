require('dotenv').config()

const express = require('express')
const server = express()
const PORT = 3000
const key = process.env.API_KEY

server.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(PORT, () => {
  console.log('Listening on PORT', PORT)
})
