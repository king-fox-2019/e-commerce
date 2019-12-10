const { decodeToken } = require('../helpers/jwt')
const User = require('../models/User')

const authentication = (req, res, next) => {
  try {
    
    const {email} = decodeToken(req.headers.access_token)

    User.findOne({ email })
      .then(user => {
        if (user) {
          req.decodedId = user._id
          next()
        }
        else next({
          status: 401,
          message: 'Authentication failed!'
        })
      })
      .catch(next)

  } catch (error) {
    next(error)
  }
}

module.exports = authentication