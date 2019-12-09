const { verify } = require('jsonwebtoken')
const { User } = require('../models')
const createError = require('http-errors')
const { Types } = require('mongoose')

module.exports = {
  authenticate(req, res, next) {
    try {
      const payload = verify(req.headers.access_token, process.env.JWT_SECRET)
      console.log(payload)
      User.findById(payload._id)
        .then(user => {
          if (user) {
            req.user = user
            next()
          } else throw createError(401, 'User banned')
        })
        .catch(next)
    } catch (err) {
      next(err)
    }
  }
}
