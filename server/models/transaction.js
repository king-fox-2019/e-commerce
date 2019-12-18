const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const transactionSchema = new Schema(
  {
    detailTransaction: {
      type: [{ type: ObjectId, ref: "Cart" }]
    },
    userId: {
      type: ObjectId,
      ref: "User"
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
