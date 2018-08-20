
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  pool: {
    idle: 350000,
    acquire: 350000
  }
});

const models = {
  user: sequelize.import('./user'),
  topic: sequelize.import('./topic'),
  course: sequelize.import('./course'),
  lesson: sequelize.import('./lesson'),
  question: sequelize.import('./question'),
  answer: sequelize.import('./answer'),
  comment: sequelize.import('./comment'),
  quizAttempt: sequelize.import('./quiz-attempt'),
  userAnswer: sequelize.import('./user-answer')
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
