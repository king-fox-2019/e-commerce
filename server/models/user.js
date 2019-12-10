const { hashPassword } = require('../helpers/bcrypt')
const mongoose = require('mongoose')
const { Schema, model  } = mongoose
const UserSchema = new Schema({
    name : {
        type : String,
        required: [true, 'name is required'],
    },
    email : {
        type : String,
        required: [true, 'email is required'],
        match: [/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/, 'Invalid Email Format'],
        unique:true
    },
    password : {
        type : String,
        required: [true, 'password is required'],
        minlength: [5, 'Password Minimum Contain 5 Character']
    },
    role : {
        type : String,
        enum: ['customer', 'admin'],
        default : 'customer'
    },
    image : {
        type : Array,
        validate : {
            validator : function(value){
                return value.length < 0 ? false : true
            },
            message : props => `image profil required!`
        }
    },
    money : {
        type : Number,
        default : 100000,
        validate : {
            validator : function(value){
                return value < 0 ? false : true
            },
            message : props => `price is under 0!`
        }
    },
    bookmark : [{
        type : Schema.Types.ObjectId,
        ref : 'Product'
    }],
    checkout : [{
        type : Schema.Types.ObjectId,
        ref : 'Product'
    }]
},{
    versionKey: false,
    timestamps: true
})

UserSchema.pre('save',function(next){
    this.password = hashPassword(this.password)
    next()
})
module.exports = model('User',UserSchema)