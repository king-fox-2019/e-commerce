const User = require('../models/User')
const Cart = require('../models/Cart')

const generateToken = require('../helpers/generateToken')
const verifyHash = require('../helpers/verifyHash')

class ControllerUser {
  static register(req, res, next) {

    const { name, email, password } = req.body

    let access_token, user

    User
      .create({ name, email, password, role: 'customer' })
      .then(userCreated => {
        user = { id: userCreated._id, name, email }
        access_token = generateToken(user)

        return Cart
        .create({
          user: user.id,
          products: []
        })
      })
      .then(() => {
        res.status(201).json({
          message: 'Successfully registered!',
          access_token, user
        })
      })
      .catch(next)
  }

  static login(req, res, next) {
    const { email, password } = req.body
    User
      .findOne({ email })
      .then(user => {
        if (!user) throw {
          name: 'NotFound',
          status: 404,
          message: 'Wrong email/password!',
        }

        if (user.role === 'customer' && !verifyHash(password, user.password)) throw {
          name: 'NotFound',
          status: 404,
          message: 'Wrong email/password!',
        }

        const payload = { id: user._id, name: user.name, email: user.email, role: user.role }
        const access_token = generateToken(payload)

        res.status(200).json({
          message: 'Successfully logged in!',
          access_token, user
        })
      })
      .catch(next)
  }

  static findById(req, res, next) {
    User
      .findById(req.user.id)
      .populate('user.cart')
      .then(user => {
        if (!user) throw {
          name: 'NotFound',
          status: 404,
          message: 'Cannot find a user!'
        }
        res.status(200).json({ user })
      })
      .catch(next)
  }
  
  static googleSignIn(req, res, next) {
    const { googleidtoken } = req.headers
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    
    let payload, name, email, password, picture

    client
      .verifyIdToken({
        idToken: googleidtoken,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      .then(ticket => {

        // console.log('ini ticket pas google sign in', ticket);
        
        payload = ticket.getPayload()
        name = payload.name
        email = payload.email
        password = process.env.DEFAULT_USER_PASSWORD
        picture = payload.picture

        return User
          .findOne({ email })
      })
      .then(user => {

        // console.log('ini user yg ditemuin pas google sign in', user)
        
        if (!user) {

          // console.log('masuk !user pas google sign in', name, email, password);
          
          User
            .create({ name, email, password, role: 'customer' })
            .then(user => {

              // console.log('ini user pas create di google sign in', user);
              
              const id = user._id
              const payload = { name, email, id }
              const access_token = generateToken(payload)

              // console.log('ini token yg digenerate pas google sign in', access_token);

              res.status(201).json({
                message: 'Successfully registered!',
                access_token, user
              })
            })
            .catch(next)
        }
        else {
          payload = { name, email, id: user._id }
          
          const access_token = generateToken(payload)

          res.status(200).json({
            message: 'Successfully logged in!',
            access_token, user
          })
        }
      })
      .catch(next)
  }
}

module.exports = ControllerUser