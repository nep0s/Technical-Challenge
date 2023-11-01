const express = require('express')
const pool = require('./db')
const port = 3000

const app = express()

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.listen(port, () => console.log(`Listening on port ${port}.`))