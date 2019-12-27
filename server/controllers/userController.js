const User = require('../models/User')
const { compare } = require('../helpers/bcrypt')
const { sign, verify } = require('../helpers/token')

class UserController{
  static getUsername(req, res, next){
    let userId = verify(req.body.token)
    User
      .findById(userId.id)
      .then((userData) => {
        res.status(200).json(userData.username)
      })
      .catch(next)
  }

  static login(req, res, next){
    let { email, password } = req.body
    User.findOne({
      email
    })
      .then((userData) => {
        if (userData){
          if (compare(password, userData.password)){
            let token = sign({
              id: userData._id
            })
            res.status(200).json({access_token: token, username: userData.username})
          }
          else {
            throw new Error ('Email or password wrong')
          }
        }
        else {
          throw new Error ('Email or password wrong')
        }
      })
      .catch(next)
  }

  static register(req, res, next){
    let { email, username, password } = req.body
    User.create({ email, username, password })
      .then((data) => {
        let token = sign({
          id: data._id
        })
        res.status(201).json({access_token: token, username: data.username})
      })
      .catch(next)
  }
}

module.exports = UserController