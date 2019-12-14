'use strict'

const { Schema, model, models } = require('mongoose')

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'product name cannot be empty']
  },
  weight: {
    type: Number,
    required: [true, 'weight cannot be empty']
  },
  quantity: {
    type: Number,
    required: [true, 'quantity cannot be empty']
  },
  image: {
    type: String,
    required: [true, 'image cannot be empty']
  }
})

const Product = model('Product', productSchema)

module.exports = Product