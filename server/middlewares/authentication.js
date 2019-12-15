const jwt = require("jsonwebtoken");
const { User } = require("../models");

function authentication(req, res, next) {
  if (req.headers.access_token) {
    let payload = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
    User.findOne({ email: payload.email})
      .then(user => {
        if (user) {
          req.decoded = payload;
          next()
        } else {
          throw { status: 401, message: 'Invalid access token' }
        }
      })
      .catch(next)
  } else {
    next({ status: 401, message: 'Invalid access token' })
  }
}

module.exports = authentication