const models = require('../models');

function get(req, res, next) {
  models.answer.findAll({
    where: {
      question_id: req.params.id
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

function getOne(req, res, next) {
  models.answer.findOne({
    where: {
      id: req.params.id
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

module.exports = {
  get,
  getOne
};
