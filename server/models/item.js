const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please input name item"]
    },
    stock: {
      type: Number,
      required: [true, "Please input stock item"],
      min: [1, "Input must be Higher then 0"]
    },
    category: {
      type: String,
      required: [true, "Please input category item"]
    },
    price: {
      type: Number,
      required: [true, "Please input price item"],
      min: [1, "Input must be Higher then 0"]
    },
    image: {
      type: String,
      required: [true, "Please input image item"]
    }
  },
  {
    versionKey: false
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;
