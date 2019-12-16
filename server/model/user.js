const {model, models, Schema} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: "Name is required"
    },
    email: {
        type: String,
        required: "Email is required",
        unique: true,
        validate: {
            validator: function (email) {
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(email);
            }, message: "Email is not valid"
        }
    },
    password: {
        type: String,
        required: "Password is required"
    },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
});

userSchema.pre("save", function (next) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(this.password, salt);

    this.password = hash;
    next()
});

const User = model('User', userSchema);

module.exports = User;

