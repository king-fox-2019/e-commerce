const jwt = require('jsonwebtoken')
const Item = require('../models/Item')

function authentication (req, res, next) {
   try {
      if(!req.headers.access_token) throw {
         code: 400,
         message: 'You are not authenticated'
      }

      jwt.verify(req.headers.access_token, process.env.JWT_SECRET, (err, decoded) => {
         if(err) {
            console.log('ada error')
            if(err.name == 'TokenExpiredError') throw {
               code: 400,
               message: 'Your authentication has expired, please sign in again.'
            }
            else if(err.name == 'JsonWebTokenError') throw {
               code: 400,
               message: 'Invalid access token'
            }
         }
         else {
            req.decoded = decoded
            next()
         }
      })
   }
   catch(err) {
      next(err)
   }
}

function authorization (req, res, next) {
   if(!req.params.id) next({
      code: 401,
      message: 'You are not authorized to perform this action.'
   })
   else {
      Item
      .findOne({_id: req.params.id})
      .then(item => {
         if(!item) throw {
            code: 404,
            message: 'Resource not found'
         }
         else if(item.shop != req.decoded.shopId) throw {
            code: 401,
            message: 'Unauthorized'
         }
         else {
            next()
         }
      })
      .catch(next)
   }
}

module.exports = {authentication, authorization}