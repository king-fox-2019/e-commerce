const User = require('../models/user')
const comparePassword = require('../helpers/passwordEncryptor').comparePassword
const generateToken = require('../helpers/tokenMaker').generateToken

class UserController {
  static register(req, res, next) {
    let objUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }
    User.create(objUser)
      .then(result => {
        let payload = {
          id: result._id,
          username: result.username,
          email: result.email,
          role: result.role
        }
        let token = generateToken(payload)
        res.status(201).json({ token, username: result.username })
      })
      .catch(next)
  }

  static login(req, res, next) {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400).json({ message: 'bad request' })
    } else {
      const invalidLoginError = {
        status: 404,
        message: 'Invalid Email or Password'
      }
      User.findOne({ email })
        .then(user => {
          if (user && comparePassword(password, user.password)) {
            let payload = {
              id: user._id,
              email: user.email,
              role: user.role
            }
            let token = generateToken(payload)
            let userData = {
              token: token,
              role: user.role,
              username: user.username
            }
            res.status(200).json(userData)
          } else {
            next(invalidLoginError)
          }
        })
        .catch(next)
    }
  }

  static addToCart(req, res, next) {
    let { product_id, quantity } = req.body
    let loggedUser = req.loggedUser
    let cartQuantity
    let isDuplicate = false
    if (!product_id || !quantity) {
      res.status(400).json({ message: 'bad request' })
    } else {
      User.findOne({ _id: loggedUser.id })
        .populate('cart.product_id')
        .then(user => {
          user.cart.forEach(product => {
            if (product.product_id._id == product_id) {
              cartQuantity = product.quantity
              isDuplicate = true
            }
          })

          if (isDuplicate) {
            const totalQuantity = Number(cartQuantity) + Number(quantity)
            User.updateOne({ _id: loggedUser.id, 'cart.product_id': product_id }, { $set: { 'cart.$.quantity': totalQuantity } })
              .then(result => {
                res.status(200).json(result)
              })
              .catch(next)
          } else {
            let newItem = {
              product_id,
              quantity
            }
            User.updateOne({ _id: loggedUser.id }, { $push: { cart: newItem } })
              .then(result => {
                res.status(200).json(result)
              })
              .catch(next)
          }
        })
        .catch(next)
    }
  }

  static substractFromCart(req, res, next) {
    let { product_id } = req.body
    let loggedUser = req.loggedUser
    let isExist = false
    let quantity = -1
    if (!product_id) {
      res.status(400).json({ message: 'bad request' })
    } else {
      User.findOne({ _id: loggedUser.id })
        .then(user => {
          user.cart.forEach(product => {
            if (product.product_id == product_id) {
              quantity = Number(product.quantity) - 1
              isExist = true
            }
          })

          if (isExist && quantity > 0) {
            return User.updateOne({ _id: loggedUser.id, 'cart.product_id': product_id }, { $set: { 'cart.$.quantity': quantity } })
          } else {
            if (quantity == 0) {
              return User.updateOne({ _id: loggedUser.id }, { $pull: { cart: { product_id } } })
            } else {
              next({
                status: 404,
                message: `No such product found in your cart`
              })
            }
          }
        })
        .then(result => {
          res.status(200).json(result)
        })
        .catch(next)
    }
  }

  static viewCart(req, res, next) {
    const user_id = req.loggedUser.id
    User.findById({ _id: user_id })
      .populate('cart.product_id')
      .then(result => {
        console.log(result)
        res.status(200).json(result.cart)
      })
      .catch(next)
  }

  static removeCart(req, res, next) {
    const userId = req.loggedUser.id
    const { product_id } = req.body
    if (!product_id) {
      res.status(400).json({ message: 'bad request' })
    } else {
      User.updateOne({ _id: userId }, { $pull: { cart: { product_id } } })
        .then(result => {
          res.status(200).json(result)
        })
        .catch(next)
    }
  }
}

module.exports = UserController