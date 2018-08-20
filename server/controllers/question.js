const models = require('../models');

function get(req, res, next) {
  const lessonIds = req.query.lessonIds.split(',');
  models.question.findAll({
    where: {
      [models.Sequelize.Op.or]: {
        lesson_id: lessonIds
      }
    },
    include: [
      {
        model: models.answer,
        attributes: ['id', 'text', 'question_id']
      }
    ]
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
  models.question.findOne({
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
