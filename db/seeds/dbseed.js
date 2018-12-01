// const path = require('path');
// const { performance } = require('perf_hooks');

// const file = 'outputfile.csv';
// const dir = path.join(__dirname, `../generation/${file}`);
// let t0;
// let t1;

// exports.seed = knex => knex('courses').del()
//   .then(() => { t0 = performance.now(); })
//   .then(() => knex.schema.raw(`COPY courses FROM '${dir}' WITH (FORMAT csv);`))
//   .then(() => { t1 = performance.now(); })
//   .then(() => { console.log(`Done! Seeding ${file} took ${t1 - t0} milliseconds`); });
