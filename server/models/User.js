const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { encrypt } = require('../helpers/bcrypt')

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email is taken'],
    validate: {
      validator: function(v) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(v).toLowerCase());
      },
      message: 'Email is wrong'
    },
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: [true, 'Username is taken']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  cart: [{ 
    _id: false,
    ItemId: {
      type: Schema.Types.ObjectId, 
      ref: 'Item' 
    }, 
    amount: {
      type: Number
    }
  }],
  role: {
    type: String,
    default: 'user'
  }
}, {
  timestamps:true
})

userSchema.pre('save', function(next){
  this.password = encrypt(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User