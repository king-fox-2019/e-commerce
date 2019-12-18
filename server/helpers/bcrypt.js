const bcrypt = require('bcryptjs')

const hash = (password) => {
  let salt = bcrypt.genSaltSync(6)
  return bcrypt.hashSync(password, salt)
}

const compare = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

module.exports = {
  hash,
  compare
}