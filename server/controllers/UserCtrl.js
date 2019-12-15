const User = require('../models/User')
const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserCtrl {

  static login(req, res, next) {

    const { email,password } = req.body
    
    User.findOne({
        email
    })
    .then(user => {
      if(user){
        const { name, _id } = user
        let match = compare(password, user.password)
        if(match){
          let token = generateToken({id: _id})
          res.status(200).json({
              name,
              access_token: token
          })
        } else {
          next({
            status: 400,
            message: 'Invalid email or password'
          })
        }
      } else {
        next({
          status: 404,
          message: 'User not found'
        })
      }
    })
    .catch(next)
  }


  static register(req,res,next){

    const { name, email, password } = req.body

    User.create({
      name,
      email,
      password,
    })
      .then( user => {
        const { _id, name } = user

        let token = generateToken({id: _id})
          res.status(201).json({
              name,
              access_token: token
          })
      })
    .catch(next)
  }

}

module.exports = UserCtrl