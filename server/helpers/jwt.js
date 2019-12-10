const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' })
}

const verifyToken = (token) => {
  return jwt.verify(payload, process.env.SECRET)
}

module.exports = {
  generateToken,
  verifyToken
}