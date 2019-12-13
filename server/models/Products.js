'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  price: Number,
  stock: Number,
  wear: String,
  image: String,
  about: String,
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
