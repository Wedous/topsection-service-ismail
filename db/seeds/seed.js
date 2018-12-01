// const faker = require('faker');
// const db = require('./index');

// const queryAsync = (query, options = null) => {
//   return new Promise((resolve, reject) => {
//     db.query(query, options, (err, results, fields) => {
//       if (err) reject(err);
//       else resolve(results, fields);
//     });
//   });
// };

// queryAsync(`
//   CREATE TABLE IF NOT EXISTS courses (
//     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     title VARCHAR(255),
//     subtitle VARCHAR(255),
//     teacher_names VARCHAR(255),
//     avg_rating INT,
//     rating_count INT,
//     student_count INT,
//     last_updated DATE,
//     thumbnail_img TEXT,
//     price INT,
//     lang VARCHAR(255),
//     subtitle_lang VARCHAR(255),
//     course_len FLOAT,
//     isOnDiscount BOOLEAN,
//     current_price FLOAT,
//     discount FLOAT,
//     num_of_articles INT,
//     dwl_resources_count INT,
//     discountCountdown VARCHAR(12),
//     hasTag BOOLEAN,
//     tag VARCHAR(30)
//   );
// `)
//   .then(() => {
//     const parseData = (input) => {
//       return Object.entries(input).reduce((parsed, [key, val], index, entries) => {
//         val = typeof val === 'string' ? `"${val}"` : val;
//         if (index === (entries.length - 1)) {
//           parsed.fields += `${key}`;
//           parsed.placeholders += `?`;
//         }
//         else {
//           parsed.fields += `${key}, `;
//           parsed.placeholders += `?, `;
//         }
//         parsed.values.push(val);
//         return parsed;
//       }, { fields: '', values: [] , placeholders: '' })
//     };

//     for (let i = 0; i < 200; i += 1) {
//       const studentCount = faker.random.number();
//       const ratingCount = studentCount * 0.4;
//       const randomBinary = () => Math.floor(Math.random() * 2);
//       const fullName = () => `${faker.name.firstName()} ${faker.name.lastName()}`;
//       const rand = Math.random;
//       const floor = Math.floor;

//       const seedObj = {
//         title: `${faker.hacker.verb()} ${faker.name.jobTitle()}`,
//         subtitle: 'This course will teach you ALL you need about this job, so you can be armed with all the knowledge you need!',
//         teacher_names: `${fullName()}_${fullName()}`,
//         avg_rating: floor(rand() * 5),
//         rating_count: ratingCount,
//         student_count: studentCount,
//         last_updated: randomBinary() ? faker.date.recent() : faker.date.past(),
//         thumbnail_img: faker.image.imageUrl(),
//         price: floor(faker.commerce.price()),
//         lang: randomBinary() ? randomBinary() ? 'English' : 'Spanish' : 'Arabic',
//         subtitle_lang: randomBinary() ? randomBinary() ? 'Spanish' : 'Arabic' : 'English',
//         course_len: Number((rand() * 50).toFixed(2)),
//         isOnDiscount: Boolean(randomBinary()),
//         current_price: Number((10 + rand() * 20).toFixed(2)),
//         discount: Number(rand().toFixed(2)),
//         num_of_articles: floor(rand() * 200),
//         dwl_resources_count: floor(rand() * 200),
//         discountCountdown: `${floor(rand() * 10)} days`,
//         hasTag: Boolean(randomBinary()),
//         tag:  randomBinary() ? randomBinary() ? 'BESTSELLER' : 'HOT' : 'NEW!',
//       };

//       const parsedData = parseData(seedObj);
//       queryAsync(`INSERT INTO courses (${parsedData.fields}) VALUES (${parsedData.placeholders})`, parsedData.values)
//         .catch((e) => { console.log('error saving course instance: ', e); });
//     }
//   });

// const Course = db.define('course', {
//   id: {
//     type: Sequelize.STRING, primaryKey: true, autoInrement: true
//   },
//   title: Sequelize.STRING,
//   subtitle: Sequelize.STRING,
//   teacher_name: Sequelize.STRING,
//   avg_rating: Sequelize.INT,
//   rating_count: Sequelize.INT,
//   student_count: Sequelize.INT,
//   last_updated: Sequelize.DATE,
//   thumbnail_img: Sequelize.TEXT,
//   lang: Sequelize.TEXT,
//   price: Sequelize.INT,
//   subtitle_lang: Sequelize.STRING,
//   course_len: Sequelize.INT,
// })

// Course.create({
//   title: faker.hacker.verb() + ' ' + faker.name.jobTitle(),
//   subtitle: `This course will teach you ALL you need about this!`,
//   teacher_name: faker.name.firstName() + ' ' + faker.name.lastName(),
//   avg_rating: Math.random() * 5,
//   rating_count: studentCount,
//   student_count: ratingCount,
//   last_update:  Math.floor(Math.random() * 2) ? faker.date.recent() : faker.date.past(),
//   thumbnail_img: faker.image.imageUrl(),
//   lang: Math.floor(Math.random() * 2) ? Math.floor(Math.random() * 2) ? 'English' : 'Spanish' : 'Arabic',
//   price: faker.commerce.price(),
//   subtitiles_lang: Math.floor(Math.random() * 2) ? Math.floor(Math.random() * 2) ? 'Spanish' : 'Arabic' : 'English',
//   course_len: `${Math.floor(Math.random() *)} Hours`
// })
// const knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host: 'localhost',
//     user: 'ismailalarmouti'
//   }
// });

// knex.raw(`CREATE DATABASE IF NOT EXISTS udemy `)
// .then(() => {
//   return knex.raw(`\\connect udemy`)
// })
// .then(() => {
//   return knex.schema.hasTable('courses')
// })
// .then((exists) => {
//   if (!exists) {
//     return knex.schema.createTable('courses', (table) => {
//      Sequelize.increments().primary();
//      Sequelize .STRING;
//      Sequelize .STRING;
//      Sequelize .STRING;
//      Sequelize.INT;
//      Sequelize.INT;
//      Sequelize.INT;
//      Sequelize.date('last_updated');
//      Sequelize.text('thumbnail_img');
//      Sequelize.text('lang');
//      Sequelize.INT;
//      Sequelize .STRING
//      Sequelize.INT
//     })
//   }
// })
// .then(() => {
//   return knex.schema.hasTable('teachers')
// })
// .then((exists) => {
//   if(!exists){
//     knex.schema.createTable('teachers', (table) => {
//      Sequelize.increments().primary();
//      Sequelize .STRING;
//     })
//   }
// })

// .then((exists) => {
//   if (!exists) {
//     knex.schema.createTable('courses_teachers', (table) => {
//      Sequelize.foreign('course_id').references(courses.id);
//      Sequelize.foreign('teacher_id').refernces('teachers.id');
//     })
//   }
// })
// .catch((error) => console.log('error in db config: ', error));

// for (let i = 0; i <=0; i += 1){

// }
