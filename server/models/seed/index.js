const models = require('../');
const topics = require('./topics');
const courses = require('./courses');
const lessons = require('./lessons');
const questions = require('./questions');
const answers = require('./answers');
models.sequelize.sync({force: true}).then(() => {
  topics.seed()
    .then(courses.seed)
    .then(lessons.seed)
    .then(questions.seed)
    .then(answers.seed)
    .then(() => {
      models.sequelize.close();
    });
});
