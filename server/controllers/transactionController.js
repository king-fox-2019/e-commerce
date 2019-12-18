const Transaction = require("../models/transaction");

class TransactionController {
  static getTransaction(req, res, next) {
    Transaction.find()
      .populate({
        path: "detailTransaction",
        select: "count totalPrice accepted",
        populate: { path: "itemId", select: "image name" }
      })
      .populate({ path: "userId", select: "name" })
      .then(response => {
        res.status(200).json(response);
      })
      .catch(next);
  }
}

module.exports = TransactionController;
