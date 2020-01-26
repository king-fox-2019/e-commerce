const Transaction = require('../model/transaction');

const authentication = (req, res, next) => {
    Transaction.find({
        user: req._id
    }).then(response => {
        if (response) {
            next()
        } else {
            throw ({code: 401});
        }
    });
};

module.exports = authentication;