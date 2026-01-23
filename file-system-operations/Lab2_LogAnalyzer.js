
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = path.resolve('app.log');
let total = 0, errors = 0;

const rl = readline.createInterface({
  input: fs.createReadStream(logPath),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  total++;
  if (line.includes('ERROR')) errors++;
});

rl.on('close', () => {
  console.log("Total lines:", total);
  console.log("Error count:", errors);
});
