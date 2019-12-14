const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcrypt')

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true,"Name may not blank"]
    },
    email: {
        type: String,
        required: [true,"Please input your email"],
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
        // required: true,
        minlength: 9,
        maxlength: 14
    },
    password: {
        // match: [/[A-Za-z0-9]+$/, "Password must contain atleast one uppercase, lowercase and number"],
        type: String,
        required: [true, "password, please!"],
        minlength: [6, "Password must longer than 6 character"],
        maxlength: [12, "Sir, its to long, even for me to remember it"]
    },
    cart: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

UserSchema.pre('save', function (next) {
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User