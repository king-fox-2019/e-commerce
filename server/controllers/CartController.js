const Cart = require("../models/Cart");
const Product = require("../models/Product");

class CartController {
  static fetchCartUser(req, res, next) {
    const customer = req.decoded._id;
    const status = "Pending";
    const condition = {
      customer,
      status
    };
    Cart.findOne(condition)
      .populate("items")
      .then(cart => {
        res.status(200).json(cart);
      })
      .catch(err => {
        next(err);
      });
  }
  static createCart(req, res, next) {
    const customer = req.decoded._id;
    const status = "Pending";
    const docs = {
      customer,
      items: [],
      status
    };
    Cart.create(docs)
      .then(cart => {
        const responses = {
          message: "Success create user cart",
          cart
        };
        res.status(201).json(responses);
      })
      .catch(err => {
        next(err);
      });
  }
  static updateCart(req, res, next) {
    const customer = req.decoded._id;
    const status = "Pending";
    let condition = {
      customer,
      status
    };
    const { qty, item, command } = req.body;
    Cart.findOne(condition)
      .populate("items")
      .then(cart => {
        if (command === "add") {
          for (let i = 0; i < qty; i++) {
            cart.items.push(item);
          }
          cart.save();
          const id = item._id;
          const update = {
            stock: Number(item.stock) - Number(qty)
          };
          Product.findByIdAndUpdate(id, update)
            .then(() => {
              const responses = {
                message: "Success add item to cart"
              };
              res.status(200).json(responses);
            })
            .catch(err => {
              next(err);
            });
        } else if (command === "reduce") {
          let indexItem = -1;
          let items = cart.items;
          for (let i = 0; i < items.length; i++) {
            if (item._id == items[i]._id) {
              indexItem = i;
            }
          }
          if (indexItem != -1) {
            cart.items.splice(indexItem, 1);
            cart.save();
            const id = item._id;
            const update = {
              stock: Number(item.stock) + 1
            };
            Product.findByIdAndUpdate(id, update)
              .then(() => {
                const responses = {
                  message: "Success remove item from cart"
                };
                res.status(200).json(responses);
              })
              .catch(err => {
                next(err);
              });
          }
        } else if (command === "clear") {
          cart.items.pull(item._id);
          cart.save();
          const id = item._id;
          const update = {
            stock: Number(item.stock) + Number(item.qty)
          };
          Product.findByIdAndUpdate(id, update)
            .then(() => {
              const responses = {
                message: "Success remove item from cart"
              };
              res.status(200).json(responses);
            })
            .catch(err => {
              next(err);
            });
        } else if (command === "paid") {
          const id = cart._id;
          const update = {
            status: "Paid"
          };
          Cart.findByIdAndUpdate(id, update)
            .then(() => {
              const responses = {
                message: "All item is success paid"
              };
              res.status(200).json(responses);
            })
            .catch(err => {
              next(err);
            });
        }
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = CartController;
