const models = require('../models');

function get(req, res, next) {
  models.userAnswer.findAll({
    where: {
      quiz_attempt_id: req.params.id
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
  models.userAnswer.create({
    user_id: req.body.user,
    quiz_attempt_id: req.params.id,
    question_id: req.body.question,
    answer_id: req.body.answer,
    correct: req.body.correct
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
