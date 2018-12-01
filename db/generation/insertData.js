const path = require('path');
const connection = require('../db');

const file = 'outputfile.csv';
const filepath = path.join(__dirname, file);

module.exports.seed = table => connection.queryAsync(`COPY udemy.${table} FROM '${filepath}'`)
  .then(() => `Input ${file} into ${table}`)
  .catch(err => err);

module.exports.clearTable = table => connection.queryAsync(`DROP TABLE udemy.${table}`)
  .then(() => connection.queryAsync(connection.makeTable))
  .then(res => res)
  .catch(err => err);
