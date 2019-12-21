'use strict';

const jwt = require('jsonwebtoken');

class JSONWebToken {
    static sign(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET);
    }
    static verify(token) {
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}

module.exports = JSONWebToken