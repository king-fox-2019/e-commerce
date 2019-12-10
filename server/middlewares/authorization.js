const Cart = require('../models/Cart')
const Transaction = require('../models/Transaction')

const checkTransactionOwner = (req, res, next) => {
  try {
    
    Transaction
      .findById({_id: req.params.id})
        .then(transaction => {
          
          if(!transaction) {
          
            throw ({
              status: 404,
              message: 'Transaction not found'
            })
          
          } else {
            
            if (transaction.owner.equals(req.decodedId)) {
            
              next()
            
            } else {
              
              throw ({
                status: 401,
                message: 'You are unauthorized'
              })

            }
          }

        })
        .catch(next)

  } catch (error) {
    next(error)
  }

}

const checkCartOwner = (req, res, next) => {
  try {
    
    Cart
      .findById({_id: req.params.id})
        .then(cart => {
          
          if(!cart) {
          
            throw ({
              status: 404,
              message: 'Cart not found'
            })
          
          } else {
            
            if (Cart.owner.equals(req.decodedId)) {
            
              next()
            
            } else {
              
              throw ({
                status: 401,
                message: 'You are unauthorized'
              })

            }
          }

        })
        .catch(next)

  } catch (error) {
    next(error)
  }

}

module.exports = {
  checkTransactionOwner,
  checkCartOwner
}