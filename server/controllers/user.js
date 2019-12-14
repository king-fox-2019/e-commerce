const User = require('../models/user'),
  Product = require('../models/product'),
  { compare } = require('../helpers/bcrypt'),
  { generateToken } = require('../helpers/jwt')

class UserController {
  static all(req, res, next) {
    User.find()
      .then(users => res.status(200).json(users))
      .catch(next)
  }
  static one(req, res, next) {
    User.findOne({ _id: req.loggedUser.id })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
  }
  static removeCart(req, res, next) {
    User.findOneAndUpdate({ _id: req.loggedUser.id}, {$pull: { carts: {_id: req.params.id}}})
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static addToCart(req, res, next) {
    // cek apakah barang cukup stok nya
    let { ProductId, quantity } = req.body
    Product.findOne({_id: ProductId})
      .then(product => {
        if(product.stock < quantity){
          throw ({status: 400, message: 'stok tidak cukup'})
        } else {
          return product
        }
      })
      .then((product) => {
        // find one kalau udah ada update
        return User.findOne({ _id: req.loggedUser.id, "carts.ProductId": ProductId })
      })
      .then(user => {
        if(!user){
          return Product.findOne({_id: ProductId})
            .then(product => {
              return User.updateOne({ _id: req.loggedUser.id }, { $push: { carts: { ProductId, quantity, productName: product.name, productPrice: product.price } } })
            })
        }
        else {
          let product = user.carts.filter(function(cart){
            return cart.ProductId == ProductId
          })[0]
          return User.findOneAndUpdate({ _id: req.loggedUser.id}, {$pull: { carts:  {ProductId }}})
            .then(result => {
              return Product.findOne({_id: ProductId})
                .then(cekstok => {
                  if(cekstok.stock < quantity + product.quantity){
                    return User.updateOne({ _id: req.loggedUser.id }, { $push: { carts: { ProductId, quantity: product.quantity, productName: product.productName, productPrice: product.productPrice } } })
                      .then(result => {
                        throw ({status: 400, message: 'stok tidak cukup'})
                      })
                  } else {
                    return User.updateOne({ _id: req.loggedUser.id }, { $push: { carts: { ProductId, quantity: quantity + product.quantity, productName: product.productName, productPrice: product.productPrice } } })
                  }
                })
            })
        }
      })
      .then(result => {
          res.status(200).json(result)
        })
      .catch(next)
  }
  static create(req, res, next) {
    const { email, password } = req.body
    User.findOne({ email })
      .then(user => {
        if(user){
          throw ({status: 400, message: 'email already registered'})
        } else {
          return User.create({ email, password })
        }
      })
      .then(user => res.status(201).json(user))
      .catch(next)
  }
  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({ email })
      .then(user => {
        if(!user) {
          throw ({status: 400, message: "invalid email or password"})
        } else if(!compare(password, user.password)) {
          throw ({status: 400, message: "invalid password or email"})
        } else {
          let token = generateToken({id: user.id, email: user.email})
          res.status(200).json({ token })
        }
      })
      .catch(next)
  }
}

module.exports = UserController