const Cart = require("../models/cart");
const Transaction = require("../models/transaction");
const User = require("../models/user");
const Item = require("../models/item");

class CartController {
  static create(req, res, next) {
    let totalPrice = Number(req.body.price) * Number(req.body.count);
    Item.findById({
      _id: req.body.itemId
    })
      .then(response => {
        if (response.stock < Number(req.body.count)) {
          throw {
            status: 400,
            message: "Out Of Stock"
          };
        } else {
          return Cart.findOne({
            itemId: req.body.itemId
          });
        }
      })
      .then(response => {
        if (response && response.purchesed == false) {
          let newTotalPrice = response.totalPrice + totalPrice;
          let newCount = response.count + Number(req.body.count);
          return Cart.updateOne(
            {
              itemId: req.body.itemId
            },
            {
              count: newCount,
              totalPrice: newTotalPrice
            },
            {
              new: true
            }
          );
        } else {
          return Cart.create({
            userId: req.decoded.id,
            itemId: req.body.itemId,
            count: Number(req.body.count),
            totalPrice
          });
        }
      })
      .then(response => {
        res.status(201).json({
          response,
          message: "Success Add Item To Cart"
        });
      })
      .catch(next);
  }

  static infoCart(req, res, next) {
    Cart.find({
      userId: req.decoded.id
    })
      .populate("itemId")
      .then(response => {
        res.status(200).json(response);
      })
      .catch(next);
  }

  static removeItem(req, res, next) {
    Cart.deleteOne({
      itemId: req.params.itemId,
      purchesed: false
    })
      .then(_ => {
        res.status(200).json({
          message: "Success delete item from your cart"
        });
      })
      .catch(next);
  }

  static accItem(req, res, next) {
    Cart.findOneAndUpdate(
      {
        itemId: req.params.itemId,
        accepted: false
      },
      {
        $set: { accepted: true }
      },
      {
        new: true
      }
    )
      .then(response => {
        res.status(200).json({
          response,
          message: "Item Accepted"
        });
      })
      .catch(next);
  }

  static checkout(req, res, next) {
    let cash = Number(req.body.cash);
    let detailTransaction = [];
    let updateCash = 0;
    let updateStock = [];
    Cart.find({
      purchesed: false
    })
      .then(response => {
        if (response.length == 0) {
          throw {
            status: 400,
            message: "No Have Item For Checkout"
          };
        } else {
          return Cart.find({
            userId: req.decoded.id,
            purchesed: false
          }).populate("itemId");
        }
      })
      .then(response => {
        response.forEach(element => {
          let newCount = Number(element.itemId.stock) - Number(element.count);
          updateStock.push({
            itemId: element.itemId._id,
            count: newCount
          });
          detailTransaction.push(element._id);
          updateCash += element.totalPrice;
        });
        if (cash < updateCash) {
          let topUp = updateCash - cash;
          throw {
            status: 400,
            message: `Your cash is not enough, you need top up ${topUp}`
          };
        } else {
          cash -= updateCash;
          return User.findByIdAndUpdate(
            {
              _id: req.decoded.id
            },
            {
              cash
            },
            {
              new: true
            }
          );
        }
      })
      .then(_ => {
        return Cart.updateMany(
          {
            userId: req.decoded.id
          },
          {
            purchesed: true
          },
          { new: true }
        );
      })
      .then(_ => {
        let async = require("async");

        async.eachSeries(
          updateStock,
          function updateObject(obj, done) {
            Item.updateOne(
              { _id: obj.itemId },
              { $set: { stock: obj.count } },
              done
            );
          },
          function allDone(err) {
            if (err) {
              throw {
                status: 400,
                message: err
              };
            } else {
              return Transaction.create({
                detailTransaction,
                userId: req.decoded.id
              });
            }
          }
        );
      })
      .then(response => {
        res.status(200).json({
          message: `Success checkout, Your Cash Now ${cash}`,
          response
        });
      })
      .catch(next);
  }
}

module.exports = CartController;
