'use strict'

const { Schema, model, models } = require('mongoose')
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Fullname cannot be empty!']
  },
  email: {
    type: String,
    required: [true, `Email cannot be empty!`],
    validate: [{
      validator: (value) => {
        return models.User.findOne({ email: value })
          .then(user => {
            if (user) return false
          })
      },
      msg: `Email already taken!`
    }, {
      validator: (value) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
      },
      msg: `Email is not valid!`
    }]
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty!']
  },
  nationalityId: {
    type: Number,
    required: [true, 'Nationality ID cannot be empty!'],
    validate: [{
      validator: (value) => {
        return models.User.findOne({ nationalityId: value })
          .then(user => {
            if (user) return false
          })
      },
      msg: `Nationality ID already taken!`
    },
    {
      validator: (value) => {
        if(String(value).length !== 16) return false
      },
      msg: `Nationality ID cannot less than 16 Digit!`
    }]
  }
})

userSchema.pre('save', function (next) {
  let pass = hashPassword(this.password)
  this.password = pass
  next()
})

const User = model('User', userSchema)

module.exports = User