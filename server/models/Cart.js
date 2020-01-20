const mongoose = require("mongoose")
const { Schema, model, models } = mongoose

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId must be filled out"]
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "productId must be filled out"]
  },
  amount: {
    type: Number,
    min: [1, "cart must contain at minimum one product"]
  }
})

const Cart = model("Cart", cartSchema)

module.exports = Cart