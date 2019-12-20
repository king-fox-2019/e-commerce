const { decodeToken } = require('../helpers/jwt'),
  User = require('../models/user')

function authenticate(req, res, next) {
  try{
    req.loggedUser = decodeToken(req.headers.token)
    User.findById(req.loggedUser.id)
      .then(user => {
        if(user) {
          next()
        }
        else next({status: 403, message: 'Authentication failed'})
      })
      .catch(next)
  }
  catch (err) {
    next(err)
  }
}

function authorize(req, res, next) {
  try{
    User.findById(req.loggedUser.id)
      .then(user => {
        if(user.isAdmin) {
          next()
        }
        else next({status: 403, message: 'Authorization failed'})
      })
      .catch(next)
  }
  catch (err) {
    next(err)
  }
}

module.exports = { authenticate, authorize }