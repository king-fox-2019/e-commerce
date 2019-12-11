const { Schema, model } = require('mongoose')
const { hashSync } = require('bcryptjs')

const adminSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

adminSchema.post('validate', function(doc, next) {
  doc.password = hashSync(doc.password, 10)
  next()
})

const Admin = model('Admin', adminSchema)

module.exports = Admin
