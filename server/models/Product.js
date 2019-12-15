const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "product name must be filled out"]
  },
  description: {
    type: String,
    required: [true, "product description must be filled out"]
  },
  stock: {
    type: Number,
    required: [true, "stock must be filled out"]
  },
  price: {
    type: Number,
    required: [true, "price must be filled out"]
  },
  image: {
    type: String,
    required: [true, "image link must be filled out"]
  }
})

const Product = model("Product", productSchema);

module.exports = Product;