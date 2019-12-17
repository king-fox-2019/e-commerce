const { hashPassword } = require('../helpers/bcrypt')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const UserSchema = new Schema({
    name: {
        type:String,
        required:[true,'you must enter your name']
    },
    email: {
        type:String,
        required:[true,'you must enter your email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'],
        validate : {
            validator : function(v) {
                return User.findOne({
                    email : v
                })
                .then(user => {
                    if (user) {
                        return false
                    } else {
                        console.log('masuk')
                        return true
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            },
            msg : `email already registered`
        }
    },
    password: {
        type:String,
        required:[true,'you must enter your password'],
        minlength : [6, "minimum password length is 6 characters"],
    },
    phoneNumber: {
        type:String,
        required:[true,'you must enter your phone number']
    },
});

UserSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User', UserSchema)
module.exports = User