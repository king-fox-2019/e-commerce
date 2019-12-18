"use strict";

const { Cart } = require("../models");

class CartController {
  static cart(req, res, next) {
    const { id } = req.token
    Cart
      .findOne({ user: id })
      .then((cart) => {
        res.status(200).json(cart);
      })
      .catch(next);
  };
  static create(req, res, next) {
    console.log('masuk?')
    const { qty, product } = req.body;
    const { id } = req.token;
    product.qty = Number(qty)
    Cart.findOne({ user: id })
      .then(cart => {
        if (cart) {
          let isExist = false
          cart.products.forEach((item, i) => {
            if(item._id == product._id) {
                item.qty += product.qty
                isExist = true
              }
            });
           if(!isExist) {
            return Cart.findOneAndUpdate({user: id}, {$push: { products: product }})
           } else {
             return Cart.findOneAndUpdate({user: id}, cart)
           }
        } else {
          return Cart.create({
            user: id,
            products: [product]
          });
        }
      })
      .then(_ => {
        res.status(200).json({ message: "Item added to cart" });
      })
      .catch(err=> {
        console.log(err)
      });
  }
}

module.exports = CartController;
