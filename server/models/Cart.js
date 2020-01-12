const mongoose = require('mongoose')
const { Schema } = mongoose

const cartSchema = new Schema({
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Please input a product id!']
    },
    checkoutPrice: {
      type: Number,
      default: null
    },
    qty: {
      type: Number,
      required: [true, 'Please input a product quantity!']
    }
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please input a user id!']
  },
  isCheckedOut: {
    type: Boolean,
    default: false // when cart checkOut status is true -> push it to transactions
  }
}, { timestamps: true })

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart