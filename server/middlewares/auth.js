const { verify } = require('jsonwebtoken')
const { User, Transaction } = require('../models')
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
    console.log(req.params.id)
    Transaction.findById(req.params.id)
      .then(transaction => {
        if (!transaction) throw createError(404, 'Transaction not found')
        else if (transaction.customer == req.user.id) next()
        else throw createError(403, "You don't have access to this transaction")
      })
      .catch(next)
  }
}
