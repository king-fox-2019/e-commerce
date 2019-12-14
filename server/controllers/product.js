'use strict'

const { Product } = require('../models')

class productController {
  static create(req, res, next) {
    const { name, weight, quantity, image, price } = req.body
    Product
      .create({ name, weight, quantity, image, price })
      .then( product => {
        res.status(201).json(product)
      })
      .catch(next)
  }

  static read(req, res, next) {
    Product
      .find()
      .then( product => {
        res.status(200).json(product)
      })
      .catch(next)
  }

  static readOne(req, res, next) {
    let id = req.params.id
    Product
      .findById(id)
      .then( product => {
        res.status(200).json(product)
      })
      .catch(next)
  }

  static update(req, res, next) {

  }

  static delete(req, res, next) {

  }
}

module.exports = productController