const fs = require('fs').promises;
const path = require('path');

const MISSION_DATA_PATH = '../../data/missions.json';

async function readMissionsData() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, MISSION_DATA_PATH));
    const missions = JSON.parse(data);
    console.log(missions);
    return missions;
  } catch (error) {
    console.error(`Error at reading file: ${error}`);
  }
}

async function writeNewMissionData(newMission) {
  try {
    const oldMissions = await readMissionsData();
    const newMissionWithId = { id: Date.now(), ...newMission };
    const allMissions = JSON.stringify([...oldMissions, newMissionWithId]);

    await fs.writeFile(path.resolve(__dirname, MISSION_DATA_PATH), allMissions);
    return newMissionWithId;
  } catch (error) {
    console.error(`Error at writing file: ${error}`);
  }
}

async function updateMissionData(id, updatedMissionData) {
  const oldMissions = await readMissionsData();
  const updatedMission = { id, ...updatedMissionData };
  const updatedMissions = oldMissions.reduce((missionsList, currentMission) => {
    if (currentMission.id === updatedMission.id) return [...missionsList, updatedMission];
    return [...missionsList, currentMission];
  }, []);

  const updatedData = JSON.stringify(updatedMissions);
  try {
    await fs.writeFile(path.resolve(__dirname, MISSION_DATA_PATH), updatedData);
    console.log(`Mission updated with id ${id}`);

    return updatedMission;
  } catch (error) {
    console.error(`Error at writing file: ${error}`);
  }
}

async function deleteMissionData(id) {
  const oldMissions = await readMissionsData();
  const updatedMissions = oldMissions.filter((currentMission) => currentMission.id !== id);
  
  const updatedData = JSON.stringify(updatedMissions);
  try {
    await fs.writeFile(path.resolve(__dirname, MISSION_DATA_PATH), updatedData);
    console.log(`Deleted mission with the id ${id}`);
  } catch (error) {
    console.error(`Error at writing the file ${error}`);
  }
}

module.exports = {
  readMissionsData,
  writeNewMissionData,
  updateMissionData,
  deleteMissionData,
};