"use strict";

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name required"]
    },
    price: {
      type: Number,
      required: [true, "Product price required"],
      min: [1, "Product price can not be lower than 1"]
    },
    stock: {
      type: Number,
      required: [true, "Product stock required"],
      min: [1, "Product stock can not be lower than 1"]
    },
    image: String,
    description: String,
    category: String,
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", ProductSchema);
