const { verify } = require('../helpers/token')
const User = require('../models/User')
const Item = require('../models/Item')

class Auth {
  static authenticate(req, res, next){
    try{
      let token = verify(req.headers.access_token)
      User.findById(token.id)
        .then((user) => {
          req.user = user
          next()
        })
        .catch((err) => {
          next(err)
        })
    }
    catch(err){
      next(err)
    }
  }
  static authorize(req, res, next){
    Item.findById(req.params.id)
      .then((item) => {
        if (item.UserId == req.user._id){
          next()
        }
        else {
          next('You are not authorized')
        }
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = Auth