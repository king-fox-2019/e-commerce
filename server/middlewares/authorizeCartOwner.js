const Cart = require('../models/Cart')

module.exports = (req, res, next) => {
  try {
    const user = req.user.id

    Cart
      .findOne({ user })
      .then(user => {

        // console.log("ini user di authorize", user)

        if (!user) throw {
          name: 'Unauthorized',
          errStatus: 401,
          message: 'Unauthorized access!'
        }
        next()
      })
      .catch(next)

  } catch (error) {
    next(error) 
  }
}