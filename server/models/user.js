const mongoose = require('mongoose'),
  { Schema } = mongoose,
  { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'please enter email'],
    validate: {
      validator: function(value) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
      },
      message: props => 'please input a valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'please enter password']
  },
  carts: [
    {
      ProductId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        min: 1
      },
      productName: String,
      productPrice: Number
    }
  ],
  isGoogle: {
    // semoga sempat bikin oauth
    type: Boolean,
    default: false
  },
  isAdmin: {
    // semoga sempat bikin role admin
    type: Boolean,
    default: false
  }
})

userSchema.pre('save', function(next) {
  this.password = hash(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User