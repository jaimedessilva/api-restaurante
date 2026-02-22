const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../../database.json');

function readDatabase() {
  const data = fs.readFileSync(DB_PATH);
  return JSON.parse(data);
}

function writeDatabase(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

module.exports = { readDatabase, writeDatabase };