const { Admin, Cart } = require('../models')
const { compareSync } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const createError = require('http-errors')

class AdminController {
  static adminSignIn(req, res, next) {
    Admin.findOne({ username: req.body.username })
      .then(admin => {
        if (admin && compareSync(req.body.password, admin.password)) {
          const access_token = sign(
            { _id: admin._id },
            process.env.JWT_SECRET_ADMIN
          )
          res.status(200).json({ data: { access_token } })
        } else throw createError(422, 'Invalid username/password')
      })
      .catch(next)
  }

  static superAdminSignUp(req, res, next) {
    Admin.find()
      .then(admins => {
        if (admins.length > 0)
          throw createError(403, 'Super admin already registered')
        else {
          return Admin.create({
            username: req.body.username,
            password: req.body.password
          })
        }
      })
      .then(admin => {
        const access_token = sign(
          { _id: admin._id },
          process.env.JWT_SECRET_ADMIN
        )
        res
          .status(201)
          .json({ message: 'Super admin registered', data: { access_token } })
      })
      .catch(next)
  }

  static imageHandler(req, res, next) {
    res
      .status(201)
      .json({ message: 'Image stored', data: { image: req.body.image } })
  }

  static checkSuperAdmin(req, res, next) {
    Admin.find().then(admins => {
      if (admins.length > 0) res.status(200).json()
      else res.status(404).json()
    })
  }

  static checkSession(req, res, next) {
    res.status(200).json()
  }
}

module.exports = AdminController
