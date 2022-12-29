const readline = require('readline-sync')
const { writeNewMissionData } = require('./utils/fsUtils')

async function main() {
  const name = readline.question("What is the mission's name?")
  const year = readline.questionInt("What is the mission's year?")
  const country = readline.question("What is the mission's country?")
  const destination = readline.question("Where is the mission's destination?")

  const newMission = { name, year, country, destination }
  writeNewMissionData(newMission)
  console.log('New mission successfully added')
}

main();