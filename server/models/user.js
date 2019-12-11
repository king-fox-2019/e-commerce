const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcrypt')

const UserSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        validate: {
            validator: function (v) {
                return User.findOne({ email: v })
                    .then((user) => {
                        if (user) return false
                    })
            },
            message: "Email has used"
        },
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone_number: {
        type: String,
        require: true,
        minlength: 9,
        maxlength: 14
    },
    password: {
        // match: [/[A-Za-z0-9]+$/, "Password must contain atleast one uppercase, lowercase and number"],
        type: String,
        minlength: 6,
        maxlength: 12
    },
    cart: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

UserSchema.pre('save', function (next) {
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User