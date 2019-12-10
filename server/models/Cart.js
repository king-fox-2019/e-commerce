"use strict";
/* 
  Satu cart mewakili satu user
  Field products berupa Array of object
      [
        {
          idProduct: productid001,
          qty: 10
        },
        {
          idProduct: productid002,
          qty: 3
        }
      ]
  
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  products: []
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
