'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name cant be empty'],
  },
  price: {
    type: Number,
    required: [true, 'Product price cant be empty']
  },
  stock: {
    type: Number,
    required: [true, 'Product stock cant be empty']
  },
  wear: String,
  image: String,
  about: String,
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
