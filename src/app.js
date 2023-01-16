const express = require('express');
const validateMissionData = require('./middlewares/validateMissionData');
const validateMissionId = require('./middlewares/validateMissionId');
const { 
  readMissionsData, 
  writeNewMissionData, 
  updateMissionData, 
  deleteMissionData,
} = require('./utils/fsUtils');

require('express-async-errors');

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

app.post('/missions', validateMissionData, async (req, res) => {
  const newMission = req.body;
  const newMissionWithId = await writeNewMissionData(newMission);
  res.status(201).json({ mission: newMissionWithId });
});

app.put('/missions/:id', validateMissionId, validateMissionData, async (req, res) => {
  const { id } = req.params;
  const updatedMissionData = req.body;

  const updatedMission = await updateMissionData(Number(id), updatedMissionData);

  return res.status(201).json({ mission: updatedMission });
});

app.delete('/missions/:id', validateMissionData, async (req, res) => {
  const { id } = req.params;
  await deleteMissionData(Number(id));

  return res.status(204).end();
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  next(error);
});

app.use((error, req, res, _next) => {
  res.status(500).send({ message: 'Oh, no! It crashed :(' });
});
module.exports = app;