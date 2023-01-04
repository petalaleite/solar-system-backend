const express = require('express');
const { readMissionsData, writeNewMissionData } = require('./utils/fsUtils');

const app = express();

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.status(200).send('Missions');
});

app.get('/missions', async (req, res) => {
  const missions = await readMissionsData();
  return res.status(200).json({ missions });
});

app.post('/missions', async (req, res) => {
  const newMission = req.body;
  const newMissionWithId = await writeNewMissionData(newMission);
  res.status(201).json({ mission: newMissionWithId });
});

module.exports = app;