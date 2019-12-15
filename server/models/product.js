const mongoose = require('mongoose'),
  { Schema } = mongoose

productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'product name required']
  },
  price: {
    type: Number,
    required: [true, 'please enter price']
  },
  image: {
    type: String,
    required: [true, 'please insert picture']
  },
  stock: {
    type: Number,
    default: 1
  }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product