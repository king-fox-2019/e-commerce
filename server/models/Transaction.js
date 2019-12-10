const { Schema, model } = require('mongoose')

const transactionSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [
      {
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
        amount: {
          type: Number,
          required: true,
          default: 1,
          min: 1
        }
      }
    ],
    totalPrice: {
      type: Number,
      required: true,
      default() {
        let price = 0
        for (const item of this.items) {
          price += item.price * item.amount
        }
        return price
      }
    },
    status: {
      type: String,
      required: true,
      enum: ['confirming', 'delivering', 'done', 'failed'],
      default: 'confirming'
    }
  },
  { versionKey: false, timestamps: true }
)

const Transaction = model('Transaction', transactionSchema)

module.exports = Transaction
