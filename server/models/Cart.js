const { Schema, model, models } = require('mongoose')

const cartSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator(val) {
          return models.Cart.findOne({ customer: val }).then(cart => {
            if (cart) return false
            else return true
          })
        }
      }
    },
    Items: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: 'Item',
          required: true
        },
        amount: {
          type: Number,
          required: true,
          default: 1,
          min: 1
        }
      }
    ]
  },
  { versionKey: false, timestamps: true }
)

const Cart = model('Cart', cartSchema)

module.exports = Cart
