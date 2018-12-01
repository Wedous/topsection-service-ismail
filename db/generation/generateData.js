const fs = require('fs');
const { performance } = require('perf_hooks');
// const { Readable } = require('stream'); // Used only for data stream configuration
const faker = require('faker');
const csv = require('fast-csv');

const generate = (start, end) => new Promise((resolve) => {
  const csvStream = csv.createWriteStream({ headers: false });
  const writableStream = fs.createWriteStream('outputfile.csv');

  const t0 = performance.now();

  csvStream.pipe(writableStream);

  for (let i = start; i < end; i += 1) {
    const studentCount = faker.random.number();
    const ratingCount = Math.floor(studentCount * 0.4);
    const randomBinary = () => Math.floor(Math.random() * 2);
    const fullName = () => `${faker.name.firstName()} ${faker.name.lastName()}`;
    const { random } = Math;
    const { floor } = Math;

    // See below for Cassandra specific seedObj
    const seedObj = {
      id: i,
      title: `${faker.hacker.verb()} ${faker.name.jobTitle()}`,
      subtitle: 'This course will teach you ALL you need about this job, so you can be armed with all the knowledge you need!',
      teacher_names: `${fullName()}`,
      avg_rating: floor(random() * 5),
      rating_count: ratingCount,
      student_count: studentCount,
      last_updated: randomBinary() ? faker.date.recent().toJSON() : faker.date.past().toJSON(),
      price: floor(faker.commerce.price()),
      lang: randomBinary() ? 'English' : 'Spanish',
      subtitle_lang: randomBinary() ? 'Spanish' : 'Arabic',
      course_len: Number((random() * 50).toFixed(2)),
      isOnDiscount: Boolean(randomBinary()),
      current_price: Number((10 + random() * 20).toFixed(2)),
      discount: Number(random().toFixed(2)),
      num_of_articles: floor(random() * 200),
      dwl_resources_count: floor(random() * 200),
      discountCountdown: `${floor(random() * 10)} days`,
      hasTag: Boolean(randomBinary()),
      tag: randomBinary() ? 'BESTSELLER' : 'NEW!',
      thumbnail_img: faker.image.imageUrl(),
    };
    csvStream.write(seedObj);
  }

  csvStream.end();

  writableStream.on('finish', () => {
    const t1 = performance.now();
    resolve(`Done! Call to generateData took ${t1 - t0} milliseconds with ${end - start} data points`);
  });
});

module.exports = generate;

/*
Data Stream Version below
(Not working -- issue with overwriting the csv file on new call of generate function)
*/

// const file = 'outputfile.csv';
// const writeStream = fs.createWriteStream(file);

// const readFile = fs.readFileSync(file, 'utf-8');
// const emptyValue = readFile.replace(/^[^_]*_/, '');

// const generate = (start, end) => new Promise((resolve) => {
//   fs.writeFileSync(file, emptyValue, 'utf-8');

//   const inStream = new Readable({
//     read() {
//       const studentCount = faker.random.number();
//       const ratingCount = Math.floor(studentCount * 0.4);
//       const randomBinary = () => Math.floor(Math.random() * 2);
//       const fullName = () => `${faker.name.firstName()} ${faker.name.lastName()}`;
//       const { random } = Math;
//       const { floor } = Math;
//       const title = 'This course will teach you ALL you need about this job so you can be armed with all the knowledge you need!';
//       const csv = `${start},${faker.hacker.verb()} ${faker.name.jobTitle()},${title},${fullName()},${floor(random() * 5)},${ratingCount},${studentCount},${randomBinary() ? faker.date.recent().toJSON() : faker.date.past().toJSON()},${floor(faker.commerce.price())},${randomBinary() ? 'English' : 'Spanish'},${randomBinary() ? 'Spanish' : 'Arabic'},${Number((random() * 50).toFixed(2))},${Boolean(randomBinary())},${Number((10 + random() * 20).toFixed(2))},${Number(random().toFixed(2))},${floor(random() * 200)},${floor(random() * 200)},${floor(random() * 10)} days,${Boolean(randomBinary())},${randomBinary() ? 'BESTSELLER' : 'NEW!'},${faker.image.imageUrl()}`;
//       this.push(csv);
//       start += 1;

//       if (start === end) {
//         this.push(null);
//       } else {
//         this.push('\n');
//       }
//     },
//   });

//   inStream.pipe(writeStream);

//   inStream.on('data', (chunk) => {
//     console.log(`Received ${chunk.length} bytes of data. ${chunk}`);
//   });

//   inStream.on('end', () => {
//     console.log('There will be no more data.');
//     // inStream.unpipe();
//     writeStream.close();
//     resolve('Finished!');
//   });
// });

// generate(1, 20);

/* Use this as the seedObj for Cassandra as it requires alphabetical order for insertion via csv */
// const seedObj = {
//   id: i,
//   avg_rating: floor(random() * 5),
//   course_len: Number((random() * 50).toFixed(2)),
//   current_price: Number((10 + random() * 20).toFixed(2)),
//   discount: Number(random().toFixed(2)),
//   discountCountdown: `${floor(random() * 10)} days`,
//   dwl_resources_count: floor(random() * 200),
//   hasTag: Boolean(randomBinary()),
//   isOnDiscount: Boolean(randomBinary()),
//   lang: randomBinary() ? 'English' : 'Spanish',
//   last_updated: randomBinary() ? faker.date.recent().toJSON() : faker.date.past().toJSON(),
//   num_of_articles: floor(random() * 200),
//   price: floor(faker.commerce.price()),
//   rating_count: ratingCount,
//   student_count: studentCount,
//   subtitle: 'This course will teach you ALL you need about this job, so you can be armed with all the knowledge you need!',
//   subtitle_lang: randomBinary() ? 'Spanish' : 'Arabic',
//   tag: randomBinary() ? 'BESTSELLER' : 'NEW!',
//   teacher_names: `${fullName()}`,
//   thumbnail_img: faker.image.imageUrl(),
//   title: `${faker.hacker.verb()} ${faker.name.jobTitle()}`,
// };
