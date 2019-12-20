const jwt = require('jsonwebtoken');
const {User} = require('../models');

module.exports = {
  authenticate: function(req, res, next) {
    if (!req.headers.token) {
      next({name: 'MissingToken', message: 'Token is required'});
    }

    try {
      const payload = jwt.verify(req.headers.token, process.env.JWT_SECRET);
      User.findById(payload.id)
        .then(function(user) {
          if (!user) next({name: 'BadToken', message: 'The token is bad'});
          req.payload = payload;
          next();
        })
        .catch(next);
    } catch (err) {
      next(err);
    }
  },
};
