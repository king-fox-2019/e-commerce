const { Schema, model, models } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name Item cannot be empty"]
    },
    price: {
      type: Number,
      required: [true, "Price cannot be empty"]
    },
    image: {
      type: String,
      required: [true, "Image cannot be empty"]
    },
    stock: {
      type: Number,
      required: [true, "Stock cannot be empty"]
    }
  },
  { versionKey: false, timestamps: true }
);

const Product = model("Product", productSchema);

module.exports = Product;
