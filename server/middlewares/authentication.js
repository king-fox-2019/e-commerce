const { verifyToken } = require('../helpers/jwt')
const User = require('../models/User')

const authentication = (req, res, next) => {
  try {
    
    const {id} = verifyToken(req.headers.access_token)
    User.findById({_id: id})
      .then(user => {
        // console.log(user)
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