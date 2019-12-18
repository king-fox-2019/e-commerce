const {Schema, models, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const emailRegex =
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    validate: [
      {
        validator: function(val) {
          return new Promise(function(resolve, reject) {
            models.User.findOne({email: val})
              .then(function(user) {
                if (user) resolve(false);
                resolve(true);
              })
              .catch(reject);
          });
        },
        msg: 'email already registered',
      },
      {
        validator: function(val) {
          const regex = new RegExp(emailRegex);
          return regex.test(val);
        },
        msg: 'invalid email format',
      },
    ],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [6, 'password length at least 6 characters'],
  },
  cart: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      amount: {
        type: Number,
      },
    },
  ],
});

userSchema.post('validate', function(user) {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
});

const User = model('User', userSchema);

module.exports = {User};
