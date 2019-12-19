const User = require('../models/User')
const verifyToken = require('../helpers/verifyToken')

module.exports = (req, res, next) => {
  try {
    const { access_token } = req.headers
    const decoded = verifyToken(access_token)

    if (!access_token || !decoded) {
      throw {
        name: 'Unauthorized',
        status: 401,
        message: 'Unauthorized access!'
      }
    }

    const payload = decoded

    User
      .findOne({ email: payload.email })
      .then(user => {

        if (!user) {
          throw {
            name: 'Unauthorized',
            status: 401,
            message: 'Unauthorized access!'
          }
        }
        req.user = { id: user._id, email: payload.email, role: user.role }
        next()
      })
      .catch(next)
  }
  catch (err) {
    next(err)
  }
}