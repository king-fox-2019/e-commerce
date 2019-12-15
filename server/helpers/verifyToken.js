const jwt = require('jsonwebtoken')

function verifyToken(token) {
  // console.log('ini token dan secret nya', token, process.env.JWT_SECRET)
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = verifyToken