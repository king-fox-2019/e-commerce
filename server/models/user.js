const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/passwordGenerator')
const Schema = mongoose.Schema

const UserSchema = new Schema({

    fullname : {
        type : String,
        required : [true,'fullname is required'],
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email invalid format'],
        unique: true,
    },
    password : {
        type : String,
        required : [true,'password is required']
    },
    role : {
        type : String,
        required : [true,'position is required'],
        default : 'customer'
    }

})

// validation
UserSchema.path('email').validate(function(value) {
  return User.findOne({ email: value })
    .then(user => {
      if(user) return false
    })
}, 'Email user is already registered!')

// hashPassword
UserSchema.pre('save', function(next) {
  // kalo udah ke save
  this.password = hashPassword(this.password)
  next()
})

const User = mongoose.model('User',UserSchema)


  
module.exports = User;