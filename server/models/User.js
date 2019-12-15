const mongoose = require('mongoose')
const generateHash = require('../helpers/generateHash')
const { Schema } = mongoose

const userSchema = new Schema({

  name: {
    type: String,
    required: [true, 'Please input your name!']
  },

  email: {
    type: String,
    required: [true, 'Please input your email!'],
    unique: true,
    validate: [{
      validator: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
      message: props => `${props.value} is not a valid email address!`
    }]
  },

  password: {
    type: String,
    required: [true, 'Please input your password!'],
    minlength: [5, 'Your password is too short! Please input a password between 5 to 15 characters.'],
    maxlength: [15, 'Your password is too long! Please input a password between 5 to 15 characters.']
  },

  role: {
    type: String,
    default: 'customer'
  }

}, { timestamps: true })

userSchema.pre('save', function (next) {
  const hash = generateHash(this.password)
  this.password = hash
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User 