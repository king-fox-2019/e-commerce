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
                message: 'You must login first'
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
    console.log(req.params.cartId, 'params.cartid')
    console.log(req.decodedId, 'req.decodedId')
    Cart
      .findOne({_id: req.params.cartId})
        .then(item => {
          
          if(item.length <= 0) {
          
            throw ({
              status: 404,
              message: 'Product not found'
            })
          
          } else {
            console.log(item)
            if (item.userId.equals(req.decodedId)) {

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