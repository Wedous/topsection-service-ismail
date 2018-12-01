/* eslint-disable no-console */
const connection = require('./index');

/* Comment this out when running cassandra */
connection((err) => {
  if (err) console.log(err);
});

connection.queryAsync = (query, options) => connection.raw(query, options);

connection.queryAsync("SELECT 1 FROM pg_database WHERE datname = 'udemy'")
  .then((res) => {
    if (res.rowCount === 1) throw res;
    else { return connection.queryAsync('CREATE DATABASE udemy'); }
  })
  .then(() => connection.migrate.latest())
  .then(() => {
    connection.destroy();
    console.log('Database created');
  })
  .catch(() => {
    console.log("Database 'udemy' already exists");
  });

module.exports = connection;

/*
Cassandra Database Setup Configuration
*/

/* Export code for courses schema used for Cassandra */
// module.exports.makeTable = makeTable;

/* Create table raw query */
// const makeKeyspace = `
//   CREATE KEYSPACE IF NOT EXISTS udemy
//     WITH REPLICATION = {
//       'class': 'SimpleStrategy',
//       'replication_factor': 1
//     }
// `;

/* Courses schema */
// const makeTable = `
//   CREATE TABLE udemy.courses(
//     id int PRIMARY KEY,
//     title varchar,
//     subtitle varchar,
//     teacher_names varchar,
//     avg_rating int,
//     rating_count int,
//     student_count int,
//     last_updated timestamp,
//     price int,
//     lang varchar,
//     subtitle_lang varchar,
//     course_len float,
//     isOnDiscount boolean,
//     current_price float,
//     discount float,
//     num_of_articles int,
//     dwl_resources_count int,
//     discountCountdown varchar,
//     hasTag boolean,
//     tag varchar,
//     thumbnail_img text
//   )
// `;

/* queryAsync specific to Cassandra note: .execute instead of .raw for Postgres */
// connection.queryAsync = (query, options) => connection.execute(query, options);

/* Cassandra Promise chain for connecting to database and creating table */
// connection.queryAsync(makeKeyspace)
//   .then(() => connection.queryAsync(makeTable))
//   .then(() => connection.shutdown())
//   .then(() => console.log('Database created'))
//   .catch(err => console.log(err));
