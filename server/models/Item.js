const { Schema, model } = require('mongoose')

const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  }
})

const Item = model('Item', itemSchema)

module.exports = Item
