"use strict";

const { Cart } = require("../models");

class CartController {
  static create(req, res, next) {
    const { product } = req.body;
    const { id } = req.token;
    console.log(id);
    Cart.findOne({ user: id })
      .then(cart => {
        if (cart) {
          let isExist = false
           cart.products.forEach((item, i) => {
             if(item.productId == product.productId) {
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
