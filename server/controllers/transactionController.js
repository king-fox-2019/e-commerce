const Transaction = require("../models/transaction");

class TransactionController {
  static getTransaction(req, res, next) {
    Transaction.find()
      .populate("detailTransaction")
      .populate("userId")
      .then(response => {
        res.status(200).json(response);
      })
      .catch(next);
  }
}

module.exports = TransactionController;
