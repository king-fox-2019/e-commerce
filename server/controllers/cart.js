const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const Transaction = require('../models/Transaction')

class ControllerCart {
  static fetchMany(req, res, next) {
    const user = req.user.id

    Cart
      .find({ user })
      .populate('products.product')
      .then(cart => {
        // console.log('ini cart dari fetchOne', cart);
        res.status(200).json({ cart })
      })
      .catch(next)
  }

  static fetchOne(req, res, next) {
    // console.log("ini user", req.user)
    const user = req.user.id

    Cart
      .findOne({ user, isCheckedOut: false })
      .populate('products.product')
      .then(cart => {
        // console.log('ini cart dari fetchOne', cart);
        res.status(200).json({ cart })
      })
      .catch(next)
  }

  static async addOrUpdateQtyInCart(req, res, next) {
    try {
      const { productId, productInputQty } = req.params
      const user = req.user.id

      // -> Check whether the product actually exists or not
      let product = await Product
        .findById(productId)

      if (!product) throw {
        status: 404,
        message: 'Product not found!'
      }

      // -> Check whether the inputQty exceeds the actual stock
      if (productInputQty > product.qty) throw {
        status: 400,
        message: 'The quantity of products you requested exceeded our stock!'
      }

      // -> Find an active cart
      let activeCart = await Cart.findOne(
        { user, isCheckedOut: false }
      )
      let cart

      // -> When there's none, create one and fill it with selected products
      if (!activeCart) {
        cart = await Cart.create(
          {
            user,
            products: [
              {
                product: productId,
                qty: productInputQty
              }
            ]
          }
        )
        res.status(201).json(
          { message: 'Added product(s) to cart!', cart }
        )
        return
      }
      // console.log('ini product id nya', productId)

      // -> If there's an active cart, find one with the selected product
      let activeCartWithProduct = await Cart.findOne(
        { user, isCheckedOut: false, 'products.product': productId }
      )

      // -> If there's no product with the same id, push it to the cart
      if (!activeCartWithProduct) {
        // console.log('masuk !product')
        cart = await Cart
          .findOneAndUpdate(
            { _id: activeCart._id },
            {
              $push:
              {
                products: {
                  product: productId,
                  qty: productInputQty
                }
              }
            }, { runValidator: true, new: true }
          )
        // console.log('ini cart pas add/updateQtyInCart', cart);
      } else {

        // -> If the product already exist, update its quantity with the new value
        cart = await Cart
          .findOneAndUpdate(
            {
              _id: activeCartWithProduct._id,
              'products.product': productId
            },
            {
              '$set':
              {
                'products.$.qty': productInputQty
              }
            }, { runValidator: true, new: true }
          )
        // console.log('ini cart yg direturn', cart)
      }

      res.status(201).json(
        { message: 'Added product(s) to cart!', cart }
      )

    } catch (error) {

      next(error)
    }
  }

  static async removeProductFromCart(req, res, next) {
    try {
      const user = req.user.id
      const { productId } = req.params

      let productFound = await Cart
        .findOne(
          { user, isCheckedOut: false, 'products.product': productId }
        )
      // console.log('productFound di removeProductFromCart', productFound)
      if (!productFound) throw {
        status: 404,
        message: 'Product not found!'
      }

      let cart = await Cart
        .findOneAndUpdate(
          { user, isCheckedOut: false, 'products.product': productId },
          { '$pull': { 'products': { 'product': productId } } },
          { runValidators: true, new: true }
        )

      res.status(200).json({
        message: 'Removed item(s) from the cart!', cart
      })

    } catch (error) {
      next(error)
    }
  }

  static async checkout(req, res, next) {
    try {
      const { id } = req.params
      // console.log('4 >>> masuk cart checkout, ini id', id)
      let cart = await Cart
        .findById(id)
        .populate('products.product')
      // console.log('3 >>> ini isi dari cart pas checkout', cart)
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
      
      transaction = await transaction
        .populate('cart').execPopulate()
      // console.log('ini transaction pas di cart checkout', cart)
      res.status(201).json({
        message: 'Successfully checked out your cart!', transaction
      })

    } catch (error) {
      next(error)
    }
  }
}

module.exports = ControllerCart