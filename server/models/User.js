const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name can not be empty']
    },
    email:  {
        type: String,
        required: [true, 'Email can not be empty']
    },
    password: {
        type: String,
        required: [true, 'Password can not be empty']
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

userSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
 }, 'Invalid email')

userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    next()
})

var User = mongoose.model('User', userSchema);

module.exports = User;