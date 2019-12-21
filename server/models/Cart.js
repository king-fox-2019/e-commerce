"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  products: []
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
