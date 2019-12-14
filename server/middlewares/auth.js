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
        else throw new Error({status: 401, message: 'Authentication failed'})
      })
      .catch(next)
  }
  catch (err) {
    next(err)
  }
}

function authorize(req, res, next) {
  next()
}

module.exports = { authenticate, authorize }