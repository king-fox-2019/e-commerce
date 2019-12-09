const { Schema, model, models } = require('mongoose')
const { hashSync } = require('bcryptjs')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username required'],
      validate: [
        {
          validator(val) {
            return models.User.findOne({ username: val }).then(user => {
              if (user) return false
              return true
            })
          },
          msg: 'Username already taken'
        },
        {
          validator(val) {
            return /^[a-z0-9_.]+$/.test(val)
          },
          msg: 'Username can contain only alphanumerics, underscores, and dots'
        }
      ]
    },
    email: {
      type: String,
      required: [true, 'Email required'],
      validate: [
        {
          validator(val) {
            return models.User.findOne({ email: val }).then(user => {
              if (user) return false
              return true
            })
          },
          msg: 'Email already registered'
        },
        {
          validator(val) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              val
            )
          },
          msg: 'Invalid email format'
        }
      ]
    },
    password: {
      type: String,
      required: [true, 'Password required'],
      minlength: [6, 'Password length must be at least 6']
    }
  },
  { versionKey: false }
)

userSchema.post('validate', function(doc, next) {
  doc.password = hashSync(doc.password)
  next()
})

const User = model('User', userSchema)

module.exports = User
