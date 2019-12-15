'use strict'

class cartController {
  static create(req, res, next) {
    console.log(req.decoded)
    console.log(req.body)
  }
  static read(req, res, next) {

  }
  static update(req, res, next) {

  }
  static delete(req, res, next) {

  }
}

module.exports = cartController