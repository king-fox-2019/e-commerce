const {User} = require('../models');

class CartController {
  static getAllCart(req, res, next) {
    User.findById(req.payload.id)
      .populate('cart.product')
      .then(function(user) {
        res.json(user.cart);
      })
      .catch(next);
  }

  static upsertCart(req, res, next) {
    const {productId, amount} = req.body;

    User.findById(req.payload.id)
      .populate('cart.product')
      .then(function(user) {
        const product = user.cart.find(item => {
          return item.product._id == productId;
        });
        if (product) {
          // update to mongo
          return User.findOneAndUpdate(
            {_id: req.payload.id, 'cart.product': productId},
            {$set: {'cart.$.amount': amount}},
            {new: true},
          ).populate('cart.product');
        } else {
          // insert cart
          return User.findOneAndUpdate(
            {_id: req.payload.id},
            {$push: {cart: {product: productId, amount}}},
            {new: true},
          ).populate('cart.product');
        }
      })
      .then(function(result) {
        res.json(result);
      })
      .catch(next);
  }

  static deleteCart(req, res, next) {
    const {productId} = req.query;

    if (!productId) next({name: 'BadRequest', message: 'Missing product Id'});

    User.findOneAndUpdate(
      {_id: req.payload.id},
      {$pull: {cart: {product: productId}}},
      {new: true},
    )
      .populate('cart.product')
      .then(function(result) {
        res.json(result);
      })
      .catch(next);
  }
}

module.exports = {CartController};
