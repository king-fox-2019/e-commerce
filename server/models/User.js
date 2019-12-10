"use strict";

const { hash, compare } = require("../helpers/bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: String,
  email: {
    type: String,
    unique: [true],
    validate: {
      validator: function(value) {
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
          value
        );
      },
      msg: "Please enter correct email address"
    }
  },
  password: {
    type: String,
    minlength: [6, "Your password is too short (min 6 characters)"],
    maxlength: [12, "Hold up, your password is too long! (max 12 charactes)"]
  }
});

UserSchema.pre("save", function(next) {
  let user = this;
  let securePassword = hash(user.password);
  this.password = securePassword;
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
