const {model, models, Schema} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "user name min 3 character length"],
        maxlength: [30, "user name max 30 character length"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, 'Email must unique'],
        validate: [{
            validator: function (email) {
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(email);
            }, message: "Email is not valid"
        },{
            validator: function (email) {
                return models.User.findOne({
                    email: email
                }).then(result => {
                    return !result;
                })
            }, message: "Email has been registered"
        }]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "password min 8 character length"],
        validate: {
            validator: function (password) {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
                return passwordRegex.test(password);
            }, message: "Password must contain at least 1 number, letters, symbol, Uppercase and lowercase"
        }
    },
    cart: [
        {
            item: {type: Schema.Types.ObjectId, ref: 'Item'},
            stock: {type: Number, default: 1},
            totalPrice: {type: Number}
        }
    ]
});

userSchema.pre("save", function (next) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(this.password, salt);

    this.password = hash;
    next()
});

const User = model('User', userSchema);

module.exports = User;

