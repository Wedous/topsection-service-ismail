/* eslint-disable no-console */
require('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { Course } = require('../db/models/Models');

const app = express();

const port = process.env.PORT || 7777;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

app.get('/course/:courseId', (req, res) => {
  Course.findCourseById(req.params.courseId)
    .then((course) => { res.send(course).end(); })
    .catch(err => console.log(err));
});

app.listen(port, () => console.log(`listening on port: ${port}`));
