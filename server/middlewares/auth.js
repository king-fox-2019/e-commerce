const { verify } = require('jsonwebtoken')
const { User, Transaction, Admin } = require('../models')
const createError = require('http-errors')

module.exports = {
  authenticate(req, res, next) {
    try {
      const payload = verify(req.headers.access_token, process.env.JWT_SECRET)
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
  },
  authorizeTransaction(req, res, next) {
    Transaction.findById(req.params.id)
      .then(transaction => {
        if (!transaction) throw createError(404, 'Transaction not found')
        else if (transaction.customer == req.user.id) {
          if (req.body.status == 'done') next()
          else
            throw createError(
              403,
              "You don't have access to modify this transaction status to other than 'done'"
            )
        } else
          throw createError(403, "You don't have access to this transaction")
      })
      .catch(next)
  },
  authorizeAdmin(req, res, next) {
    try {
      const payload = verify(
        req.headers.access_token,
        process.env.JWT_SECRET_ADMIN
      )
      Admin.findById(payload._id).then(admin => {
        if (admin) next()
        else throw createError(403, 'Your admin access has been turned down')
      })
    } catch (err) {
      next(err)
    }
  }
}
