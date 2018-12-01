// const cassandra = require('cassandra-driver');

// module.exports = new cassandra.Client({
//   contactPoints: ['localhost'],
//   localDataCenter: 'datacenter1',
//   keyspace: 'system',
// });

const connection = require('./config');
module.exports = require('knex')({
  client: 'pg',
  connection,
  pool: { min: 0, max: 7 },
});
