const jwt = require('jsonwebtoken')

function generateToken(payload){
    console.log(process.env.JWT_SECRET)
    return jwt.sign(payload,process.env.JWT_SECRET)
}

function verifyToken(payload){
    return jwt.verify(payload,process.env.JWT_SECRET)
}

module.exports = {generateToken,verifyToken}