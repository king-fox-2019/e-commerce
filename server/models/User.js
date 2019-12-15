const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const { hashPassword } = require("../helpers/bcrypt")

const userSchema = new Schema({
  username: {
    type: String, 
    required: [true, "username must be filled out"], 
    validate: {
      validator: function(v) {
        return models.User.findOne({ username: v })
          .then(user => {
            if (user) {
              return false;
            } else {
              return true;
            }
          })
      },
      message: "username has been registered!"
    }
  },
  email: {
    type: String,
    required: [true, "email must be filled out"],
    validate: [
      {
        validator: function(v) {
          return models.User.findOne({ email: v })
            .then(user => {
              if (user) {
                return false;
              } else {
                return true;
              }
            })
        }, 
        message: "email has been registered!"
      }, {
        validator: function(v) {
          return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
        },
        message: "invalid email input!"
      }
    ]
  },
  password: {
    type: String, 
    required: [true, "password must be filled out"],
    minlength: [6, "minimum password character is 6"]
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
});

userSchema.pre("save", function() {
  this.password = hashPassword(this.password);
  next();
});


const User = model("User", userSchema);
module.exports = User;