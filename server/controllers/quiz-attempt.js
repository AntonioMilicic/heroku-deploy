const models = require('../models');

function get(req, res, next) {
  models.quizAttempt.findAll({
    where: {
      user_id: req.params.id
    }
  })
    .then((data) => {
      res.json({
        status: 'success',
        data: data
      });
    })
    .catch((err) => {
      return next(err);
    });
}

function submit(req, res, next) {
  models.quizAttempt.create({
    lesson_id: req.body.lesson,
    user_id: req.params.id,
    score: req.body.score
  })
    .then((data) => {
      res.json({
        status: 'success',
        data: data
      });
    })
    .catch((err) => {
      return next(err);
    });
}

module.exports = {
  get,
  submit
};
