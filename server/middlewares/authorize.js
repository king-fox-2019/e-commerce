const Cart = require('../models/Cart')

module.exports = (req, res, next) => {
  try {
    // console.log("masuk authorize");
    const _id = req.params.id
    const user = req.user.id

    // console.log("ini id, user", _id, user)

    Cart
      .findOne({ _id, user })
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
  }
  catch (error) {
    next(error)
  }
}