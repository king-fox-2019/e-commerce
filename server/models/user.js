"use strict";

const mongoose = require("mongoose");
const { hashPass } = require("../helpers/bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Username already registered"],
      required: [true, "Username required"]
    },
    email: {
      type: String,
      unique: [true, "Email address already registered"],
      required: [true, "Email address required"],
      validate: {
        validator: function(v) {
          return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },
    password: {
      type: String,
      minlength: [8, "Password should be at least 8 characters in length"],
      required: [true, "Password required"]
    },
    cart: [{
      ProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: Number
    }]
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", function(next) {
  this.password = hashPass(this.password);
  this.email = this.email.toLowerCase();
  this.username = this.username.toLowerCase();
  next();
});

module.exports = mongoose.model("User", UserSchema);
