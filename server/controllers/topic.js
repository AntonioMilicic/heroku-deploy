const models = require('../models');

function get(req, res, next) {
  models.topic.findAll()
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

module.exports = { get };
