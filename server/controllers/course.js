const models = require('../models');

function get(req, res, next) {
  models.course.findAll({
    where: {
      topic_id: req.params.id
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

module.exports = { get };
