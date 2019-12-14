'use strict'

const { Product } = require('../models')

class productController {
  static create(req, res, next) {
    const { name, weight, quantity, image, price, category } = req.body
    Product
      .create({ name, weight, quantity, image, price, category })
      .then( product => {
        res.status(201).json(product)
      })
      .catch(next)
  }

  static read(req, res, next) {
    Product
      .find()
      .then( product => {
        console.log(product)
        res.status(200).json(product)
      })
      .catch(next)
  }

  static readEB(req, res, next) {
    Product
      .find({ category: 'EB' })
      .then( product => {
        console.log(product)
        res.status(200).json(product)
      })
      .catch(next)
  }

  static readSB(req, res, next) {
    Product
      .find({ category: 'SB' })
      .then( product => {
        console.log(product)
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
    let id = req.params.id
    let { name, weight, quantity, image, price } = req.body
    let value = {
      name, weight, quantity, image, price
    }

    Product
      .findByIdAndUpdate(id, value, { new: true, omitUndefined: true})
      .then( item => {
        res.status(200).json(item)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    let id = req.params.id

    Product
      .findByIdAndDelete(id)
      .then( item => {
        res.status(200).json(item)
      })
      .catch(next)
  }
}

module.exports = productController