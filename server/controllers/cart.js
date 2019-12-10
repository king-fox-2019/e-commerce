const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const Transaction = require('../models/Transaction')

class ControllerCart {
  static fetchOne(req, res, next) {
    // console.log("ini user", req.user)
    const user = req.user.id

    Cart
      .findOne({ user })
      .populate('products.product')
      .then(cart => {
        // console.log('ini cart dari fetchOne', cart);
        res.status(200).json({ cart })
      })
      .catch(next)
  }

  static addOrUpdateQtyInCart(req, res, next) {
    const { id, qty } = req.params
    const user = req.user.id

    // console.log('ini product id', id)
    // console.log("ini user", req.user.id);
    // console.log('ini product', product);

    Product
      .findById(id)
      .then(product => {

        // console.log('ini product dari hasil POST /carts', product)

        if (!product) throw {
          name: 'NotFound',
          status: 404,
          message: 'Product not found!'
        }
        else if (product.qty < qty) throw {
          name: 'ExceededStock',
          status: 400,
          message: 'The quantity of products you requested exceeded our stock!'
        }

        return Cart.findOne({ user })
      })

      .then(cart => {
        if (!cart) {
          return Cart
            .create({
              user,
              products: [{ product: id, qty }]
            })
        }

        // console.log('3 >>> ini cart products', cart.products)

        let updatedProducts = []
        updatedProducts.push({ product: id, qty })

        // console.log('6 >>> ini updatedProducts', updatedProducts)

        cart.products.forEach(product => {

          // console.log('ini product forEach', product.product, id)

          if (String(product.product) === String(id)) {

            // console.log('5 >>> ini product', product.product, product._id)

            product.qty += Number(qty)
          }
          updatedProducts.push(product)
        })

        cart.products = updatedProducts
        const newCart = cart.products

        // console.log('4 >>> ini new cart', updatedProducts)

        return Cart
          .findOneAndUpdate({ user }, {
            products: newCart
          }, { runValidator: true, new: true })
      })

      .then(cart => {

        res.status(201).send({
          message: 'Successfully added/updated item(s) into the cart!',
          cart
        })

      })
      .catch(next)
  }

  static updateProductQtyInCart(req, res, next) {
    const { id, qty } = req.params
    const user = req.user.id
    Cart
      .findOne({ user })
      .then(cart => {
        let updatedProducts = []
        cart.products.forEach(product => {
          // console.log('1 >>> ini product._id', id, product._id);
          if (String(id) === String(product._id)) {
            // console.log('2 >>> ini product_id', product_id);
            product.qty = qty
          }
          updatedProducts.push(product)
        })

        // console.log('ini updated products', updatedProducts)

        return Cart.findOneAndUpdate({ user }, {
          products: updatedProducts
        }, { runValidator: true, new: true })
      })
      .then(cart => {
        res.status(200).send({
          message: 'Successfully updated product\'s quantity!',
          cart
        })
      })
      .catch(next)
  }

  static async checkout(req, res, next) {
    try {
      const { id } = req.params

      let cart = await Cart
        .findById(id)
        .populate('products.product')

      if (cart.isCheckedOut) throw {
        name: 'NoActiveCart',
        status: 400,
        message: 'This cart has already been checked out!'
      }

      await Cart
        .findByIdAndUpdate(id, {
          isCheckedOut: true
        })
      // console.log('ini cart yg ditemuin', cart)
      for (const product of cart.products) {
        // console.log('ini product dalam loop card.products', product.product.price)
        await Cart
          .findOneAndUpdate({ '_id': id, 'products._id': product._id }, {
            '$set': {
              'products.$.checkoutPrice': product.product.price
            }
          })
      }

      cart = await Cart.findById(id).populate('products.product')

      let totalPrice = 0

      for (const product of cart.products) {
        totalPrice += product.checkoutPrice * product.qty
      }

      let transaction = await Transaction
        .create({
          cart: id, totalPrice
        }) 

      res.status(201).json({
        message: 'Successfully checked out your cart!', transaction
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ControllerCart