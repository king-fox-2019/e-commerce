const {Schema, model} = require('mongoose')
const { hash } = require('../helpers/bcrypt')

const userSchema = new Schema ({
  name: {
    type: String,
    required: [true, 'Name cannot be empty']
  },
  email: {
    type: String,
    required: [true, 'Email cannot be empty'],
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Your email is not valid'],
      validate:{
        validator(value){
          return User.findOne({
            email: value
          })
          .then(user => {
            return user ? false: true
          })
        },
        message: 'Email is already registered'
      }
  },
  password:{
    type: String,
    required: [true, 'Password cannot be empty'],
    minlength: [6, 'Password at least have 6 character']
  },
  role:{
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer'
  }
})

userSchema.pre('save', function(next){
  this.password = hash(this.password)
  next()
})

const User = model('User', userSchema)
module.exports = User