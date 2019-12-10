const { Schema, model, models } = require('mongoose')
const { hash } = require('../helpers/password')

const userSchema = new Schema({
    username:{
        type: String,
        required: [true, 'Username cannot be empty']
    },
    email:{
        type: String,
        required: [true, 'Email cannot be empty'],
        match: [/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,'Your email is not valid'],
        validate:{
            validator(value){
                return models.User.findOne({
                    email: value
                })
                .then(user => {
                    if(user) return false
                    else return true
                })
            },
            message: 'Your email is already registered'
        }
    },
    password:{
        type: String,
        required: [true, 'Password cannot be empty'],
        minlength: [5, 'Password min 5 digits']
    },
    wishlist:[{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    role:{
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    balance:{
        type: Number,
        default: 0
    },
    avatar:{
        type: String
    },
    address:{
        type: String,
        required: [true, 'Address cannot be empty']
    }
})

userSchema.pre('save', function(next){
    this.password = hash(this.password)
    next()
})

const User = model('User', userSchema)

module.exports = User