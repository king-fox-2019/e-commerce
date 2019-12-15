const mongoose = require('mongoose')
const { Schema } = mongoose

const transactionSchema = new Schema({
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['preparing', 'delivering', 'received'],
    required: true,
    default: 'preparing'
  }
}, { timestamps: true })

const Transaction = mongoose.model ('Transaction', transactionSchema)
module.exports = Transaction