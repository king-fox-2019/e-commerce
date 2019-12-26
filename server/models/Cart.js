const { Schema, model, models } = require('mongoose')

const cartItemSchema = new Schema(
  {
    item: {
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
  },
  { versionKey: false, _id: false }
)

const cartSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator(val) {
          return models.Cart.findOne({ customer: val }).then(cart => {
            if (cart && !this._id) return false
            else return true
          })
        },
        msg: 'One customer can only have one cart'
      }
    },
    items: [cartItemSchema]
  },
  { versionKey: false, timestamps: true }
)

const Cart = model('Cart', cartSchema)

module.exports = Cart
