const { verifyToken } = require('../helpers/tokenGenerator')
const User = require('../models/user')

module.exports = {
  authentication: function(req, res, next) {
    try {
      const decodeToken = verifyToken(req.headers.token)
      User.findById({ _id : decodeToken.id })
      
      .then(user => {
        if(user) {
            req.loggedUser = user
            next()
          } else {
            next({ status: 403, message: 'user not found, authentication failed' })
          }
        })
        .catch(next)
    } catch(err) {
      next({ status: 403, message: err })
    }
  }
}
