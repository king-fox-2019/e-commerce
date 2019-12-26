const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { generateHashed } = require('../helpers/bcryptjs')




const userSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: [ true, 'usernamessss is required' ]
    },
    email:{
        type: String,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email invalid format'],
        required: [ true, 'email is required' ]
    },
    password:{
        type: String,
        unique: true,
        required: [ true, 'password is required' ]
    },
    role:{
       type: String,
       enum: ['buyer', 'seller'],
       required: [true, 'role is required']
   }

})

userSchema.pre('save', function(){
    this.password = generateHashed(this.password)
})

const User = mongoose.model('User', userSchema)
module.exports = User