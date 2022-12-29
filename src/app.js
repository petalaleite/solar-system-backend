const express = require('express')
const { readMissionsData } = require('./utils/fsUtils')

const app = express()

app.get('/', (req, res) => {
  res.status(200).send('Missions')
})

app.get('/missions', async (req, res) => {
  const missions = await readMissionsData()
  return res.status(200).json( { missions })
})

module.exports = app