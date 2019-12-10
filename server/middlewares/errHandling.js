'use strict';
const extractor = require('../helpers/errExtractor')

module.exports = (err, req, res, next) => {
    let status = 500
    let msg = []
    if(err.isThrow) {
        status = err.status
        msg.push(err.message)
    } else {
        if (err.name === 'ValidationError') {
            msg = extractor(err)
        }
        else if (err.code == 11000){
            status = 400
            msg.push('Email already taken, please login or sign up!')
        } else {
            status = 500
            msg.push('Internal Server Error')
        }
    }
    res.status(status).json(msg)
}