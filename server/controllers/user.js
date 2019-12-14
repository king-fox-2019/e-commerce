'use strict'

const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
const randomPassword = require('../helpers/randomPassword')

class userController {
  static register(req, res, next) {
    const { email, password, fullName, nationalityId } = req.body
    User
      .create({ email, password, fullName, nationalityId })
      .then(user => {
        let token = generateToken({ id: user.id })
        let data = {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          nationalityId: user.nationalityId,
          token
        }
        res.status(201).json(data)
      })
      .catch(next)
  }

  static googleAuth(req, res, next) { }

  static facebookAuth(req, res, next) { }

  static login(req, res, next) {
    let value = { email: req.body.email }
    User
      .findOne(value)
      .then(userData => {
        if (userData && comparePassword(req.body.password, userData.password)) {
          let token = generateToken({ id: userData.id })
          let user = {
            id: userData.id,
            fullName: userData.fullName,
            email: userData.email,
            nationalityId: userData.nationalityId,
            token
          }
          res.status(200).json(user)
        } else {
          next({ status: 400, message: `Password / Username is wrong` })
        }
      })
      .catch(next)
  }
}

module.exports = userController