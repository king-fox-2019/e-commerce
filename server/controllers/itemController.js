const Item = require('../models/Item')
const User = require('../models/User')

class ItemController{
  static showAll(req, res, next){
    Item.find({})
      .then((items) => {
        res.status(200).json(items)
      })
      .catch(next)
  }

  static showOne(req, res, next){
    Item.findOne({
      _id: req.params.id
    })
      .then((item) => {
        res.status(200).json(item)
      })
      .catch(next)
  }

  static showMyItem(req, res, next){
    Item.find({
      UserId: req.user._id
    })
      .then((items) => {
        res.status(200).json(items)
      })
      .catch(next)
  }

  static myCart(req, res, next){
    User.findById(req.user._id)
      .populate('cart.ItemId')
      .then((user) => {
        res.status(200).json(user.cart)
      })
      .catch(next)
  }

  static addToCart(req, res, next){
    let query = {_id: req.user._id}
    // let query = { "cart.ItemId": req.params.id}
    let updateObj = 
    // {}
    {$push: {cart: {ItemId: req.params.id, amount: 1}}}
    let options =  {new: true}
    // User.findOne(query)
    User.findOneAndUpdate(query, updateObj, options)
    .then((userData) => {
      res.status(201).json(userData)
    })
    .catch(next)
  }

  static deleteFromCart(req, res, next){
    User.findOneAndUpdate({
      _id: req.user._id
    }, {
      $pull: {
        cart: {
          ItemId: req.params.id
        }
      }
    }, {
      new: true
    })
      .then((userData) => {
        res.status(200).json(userData)
      })
      .catch(next)
  }

  static postItem(req, res, next){
    let { name, price, image, description, stock } = req.body
    Item.create({ name, price, image, description, stock, UserId: req.user._id })
      .then((item) => {
        res.status(201).json(item)
      })
      .catch(next)
  }

  static editItem(req, res, next){
    let { name, price, image, description, stock } = req.body
    Item.findByIdAndUpdate(req.params.id, 
      { name, price, image, description, stock },
      {omitUndefined: true, new: true}
    )
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static deleteItem(req, res, next){
    Item.deleteOne({
      _id: req.params.id
    })
      .then(() => {
        res.status(200).json()
      })
      .catch(next)
  }

}

module.exports = ItemController