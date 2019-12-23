const Item = require("../models/item");

class ItemController {
  static create(req, res, next) {
    const { name, stock, category, price, image } = req.body;
    Item.create({
      name,
      stock: Number(stock),
      category,
      price: Number(price),
      image
    })
      .then(response => {
        res.status(201).json({
          response,
          message: "Success Create Item"
        });
      })
      .catch(next);
  }

  static getAll(req, res, next) {
    Item.find()
      .then(response => {
        res.status(200).json(response);
      })
      .catch(next);
  }

  static getDetail(req, res, next) {
    Item.findById({
      _id: req.params.id
    })
      .then(response => {
        res.status(200).json(response);
      })
      .catch(next);
  }

  static remove(req, res, next) {
    Item.deleteOne({
      _id: req.params.id
    })
      .then(response => {
        res.status(200).json({
          message: "Success Remove Item"
        });
      })
      .catch(next);
  }

  static update(req, res, next) {
    const { name, stock, category, price, image } = req.body;
    const id = req.params.id;
    Item.findByIdAndUpdate(
      {
        _id: id
      },
      {
        name,
        stock,
        category,
        price,
        image
      },
      {
        new: true
      }
    )
      .then(response => {
        res.status(200).json({
          response,
          message: "Success update item"
        });
      })
      .catch(next);
  }
}

module.exports = ItemController;
