/* eslint-disable no-console */

const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const generateData = require('./generateData');
const { seed, clearTable } = require('./insertData');
const connection = require('../index');

const amountPerGeneration = 1000000;
const maxItems = 1000000;
const table = 'courses';
const csvName = 'outputfile.csv';
const csvLocation = path.join(__dirname, csvName);

let start = 0;
let end = amountPerGeneration;

const promiseWhile = (condition, action) => {
  const resolver = Promise.defer();
  const loop = () => {
    if (!condition()) return resolver.resolve();
    return Promise.cast(action())
      .then(loop)
      .catch(resolver.reject);
  };
  process.nextTick(loop);
  return resolver.promise;
};

const genscript = () => {
  promiseWhile(() => end <= maxItems, () => generateData(start, end)
    .then((res) => { console.log(res); })
    .then(() => seed(table))
    .then((res) => { console.log(res); })
    .then(() => {
      start += amountPerGeneration;
      end += amountPerGeneration;
    })
    .catch((err) => { throw err; }))
    .then(() => {
      connection.destroy(); // Note: connection.shutdown() is needed for Cassandra
      fs.unlinkSync(csvLocation);
      console.log(`Completed seeding '${table}' with ${maxItems} items`);
    });
};

clearTable(table)
  .then((res) => { console.log(`Deleted ${res} rows in '${table}'`); })
  .then(() => { genscript(); });
