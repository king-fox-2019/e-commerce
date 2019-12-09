const { User } = require('../models')

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
}

module.exports = UserController
