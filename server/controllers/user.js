const models = require('../models');

function topScore(req, res, next) {
  models.user.findAll({
    order: [
      ['total_score', 'DESC']
    ],
    attributes: ['username', 'total_score']
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

module.exports = {topScore};
