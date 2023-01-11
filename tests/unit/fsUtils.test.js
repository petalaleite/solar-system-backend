const { expect } = require('chai');
const fs = require('fs');
const sinon = require('sinon');

const { readMissionsData } = require('../../src/utils/fsUtils');

const mockMissions = JSON.stringify([
  { id: 1, name: 'Mariner 2', year: 1962, country: 'USA', destination: 'Venus' },
  { id: 2, name: 'Venera 4', year: 1967, country: 'URSS', destination: 'Venus' },
  { id: 3, name: 'Mariner 5', year: 1967, country: 'USA', destination: 'Venus' },
]);

describe('readMissionsData function', function () {
  it('return an array with all elements from json file', async function () {
    sinon.stub(fs.promises, 'readFile').resolves(mockMissions);
    const missions = await readMissionsData();

    expect(missions).to.be.instanceOf(Array);
    expect(missions).to.have.lengthOf(3);
    sinon.restore();
  });
});