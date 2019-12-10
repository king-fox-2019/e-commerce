'use strict'; 
const { Article } = require('../models');

module.exports = (req, res, next) => {
    let { id } = req.body
    Article
        .findById(id)
        .populate({
            path: 'user',
            select: '-passowrd'
        })
        .then((data) => {
            if (data.author._id == req.token.id ) {
                next();
            } else {
                next({ isThrow: true, status: 401, message: "Product" });
            }
        })
        .catch(next)
}