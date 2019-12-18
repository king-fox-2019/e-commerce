const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const cartSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User"
    },
    itemId: {
      type: ObjectId,
      ref: "Item"
    },
    count: {
      type: Number,
      required: [true, "Please input item count"],
      min: [1, "Count minimum 1"]
    },
    totalPrice: {
      type: Number
    },
    purchesed: {
      type: Boolean
    },
    accepted: {
      type: Boolean
    }
  },
  {
    versionKey: false
  }
);

cartSchema.pre("save", function(next) {
  this.purchesed = false;
  next();
});

cartSchema.pre("save", function(next) {
  this.accepted = false;
  next();
});

const Cart = model("Cart", cartSchema);

module.exports = Cart;
