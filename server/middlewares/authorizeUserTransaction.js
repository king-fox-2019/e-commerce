const Transaction = require('../models/Transaction')

module.exports = (req, res, next) => {
  try {
    const _id = req.params.id
    const user = req.user.id

    // console.log('ini id pas authorizeUserTransaction', _id)
    // console.log('ini user pas authorizeUserTransaction', user)

    if (req.user.role === 'admin') return next()

    Transaction
      .findById(_id)
      .populate('cart')
      .then(transaction => {

        // console.log('ini transaction pas authorizeUserTransaction', transaction)
        // console.log('ini user pas authorizeUserTransaction', user)
        
        if (String(transaction.cart.user) !== String(user)) throw {
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