const { User } = require('../models')
const { compareSync } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const createError = require('http-errors')

class UserController {
  static signUp(req, res, next) {
    const { username, email, password } = req.body
    User.create({ username, email, password })
      .then(({ _id, username, email }) => {
        res.status(201).json({
          message: 'User registered',
          data: {
            _id,
            username,
            email,
            password
          }
        })
      })
      .catch(next)
  }

  static signIn(req, res, next) {
    const { username, email, emailUsername, password } = req.body
    User.findOne({
      $or: [
        { username: username || emailUsername },
        { email: email || emailUsername }
      ]
    })
      .then(user => {
        if (user && compareSync(password, user.password)) {
          const access_token = sign(
            {
              _id: user._id,
              username: user.username,
              email: user.email
            },
            process.env.JWT_SECRET
          )
          res
            .status(200)
            .json({ message: 'Sign in success', data: { access_token } })
        } else throw createError(422, 'Wrong username/email/password')
      })
      .catch(next)
  }

  static checkSession(req, res, next) {
    const { _id, username, email } = req.user
    res.status(200).json({ data: { _id, username, email } })
  }
}

module.exports = UserController
