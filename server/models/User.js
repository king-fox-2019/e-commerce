const { Schema, models, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name cannot be empty"]
    },
    email: {
      type: String,
      required: [true, "Email cannot be empty"],
      validate: [
        {
          validator: value => {
            const condition = {
              email: value
            };
            return models.User.findOne(condition).then(user => {
              if (user) return false;
            });
          },
          msg: "Email is unavailable"
        },
        {
          validator: value => {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              value
            );
          },
          msg: "Email is not valid"
        }
      ]
    },
    password: {
      type: String,
      required: [true, "Password cannot be empty"]
    },
    status: {
      type: String
    }
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("save", function(next) {
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(this.password, salt);
  this.password = hashed;
  next();
});

const User = model("User", userSchema);

module.exports = User;
