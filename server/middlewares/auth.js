const verifyToken = require('../helpers/tokenMaker').decodeToken
const User = require('../models/user')
const Product = require('../models/product')
const Transaction = require('../models/transaction')

function authentication(req, res, next) {
  try {
    let decodedToken = verifyToken(req.headers.token)
    User.findById(decodedToken.id)
      .then(user => {
        if (user) {
          req.loggedUser = decodedToken
          next()
        } else {
          next({ status: 401, message: 'Authentication failed' })
        }
      })
      .catch(next)
  }
  catch (err) {
    next({ status: 401, message: err })
  }
}

function adminAuthorization(req, res, next) {
  try {
    if (req.loggedUser.role !== 'admin') {
      throw ({ status: 401, message: 'You are not authorized' })
    } else {
      next()
    }
  }
  catch (err) {
    next(err)
  }
}

function authorization(req, res, next) {
  let { id } = req.params
  Product.findById(id)
    .then(product => {
      if (product && product._id == id) {
        next()
      } else if (!product) {
        next({ status: 404, message: "product not found" })
      }
    })
    .catch(next)
}

function transactionAuthentication(req, res, next) {
  const { id } = req.params

  Transaction.findOne({ _id: id })
    .then(transaction => {
      if(!transaction) {
        next({ status: 404, message: "transaction not found" })
      } else {
        if(transaction.user_id == req.loggedUser.id) {
          next()
        }
        else {
          next({ status: 401, message: 'Not authorized, this transaction does not belong to you' })
        }
      }  
    })
    .catch(next)
}
module.exports = {
  authentication, adminAuthorization, authorization, transactionAuthentication
}