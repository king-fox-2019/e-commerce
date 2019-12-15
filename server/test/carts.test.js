const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')
const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')

const generateToken = require('../helpers/generateToken')

const expect = chai.expect
chai.use(chaiHttp)

let currentAccessToken = 'initialvalue'
let currentProductId = 'initialId'

let falseProductId = '5dca8ec2d156447b4d42cc24'
let prevQty = 1

let currentCartId = ''
let checkedOutCartId = ''

describe('CRUD cart routes', function () {

  this.timeout(5000)
  // console.log('masuk hooks')

  before(function (done) {
    User.create({
      name: 'initial',
      email: 'initial@mail.com',
      password: '12345678',
      role: 'customer'
    })
      .then((user) => {
        // console.log('dapet user', user);
        let payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
        currentAccessToken = generateToken(payload)
        // console.log('ini current access token', currentAccessToken);
        return Product.create({ name: 'Harry Potter', price: 78000, qty: 9, author: 'J.K. Rowling' })
      })
      .then(product => {
        // console.log('ini productId di before CRUD cart routes', product._id);
        currentProductId = product._id
        // console.log('ini current product id', currentProductId)
        done()
      })
      .catch(err => console.log(err))
  })

  after(function (done) {
    // console.log('masuk ke after hooks');
    if (process.env.NODE_ENV === 'testing') {
      
      User.deleteMany()
        .then(() => {
          console.log('\nsuccessfully deleted users');
          return Product.deleteMany()
        })
        .then(() => {
          console.log('successfuly deleted products');
          return Cart.deleteMany()
        })
        .then(() => {
          console.log('successfully deleted carts');
          done()
        })
        .catch(err => console.log(err)
        )
    }
  })

  describe('add a product to cart > POST /carts', function () {
    // this.timeout(5000)
    it.only('should return the newly added items with the message: \'Successfully added item(s) to the cart!\'', function (done) {

      // console.log('ini current product id pas add product', currentProductId)

      chai
        .request(app)
        .post(`/carts/products/${currentProductId}/${prevQty}`)
        .set('access_token', currentAccessToken)
        .end(function (err, res) {
          // console.log("ini response dari product add", res.body)

          prevQty = res.body.cart.products[res.body.cart.products.length - 1].qty

          expect(err).to.be.null
          expect(res).to.have.status(201)

          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.a('string')

          expect(res.body.cart).to.be.an('object')
          expect(res.body.cart.products).to.be.an('array')

          done()
        })
    })

    it.only('should return the previously added item with updated quantity when the item id already existed in the cart', function (done) {
      const newQty = 2

      chai
        .request(app)
        .post(`/carts/products/${currentProductId}/${newQty}`)
        .set('access_token', currentAccessToken)
        .end(function (err, res) {

          // console.log('ini currentProductId', currentProductId);

          expect(err).to.be.null
          expect(res).to.have.status(201)

          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('message', 'cart')

          expect(res.body.message).to.be.a('string')
          expect(res.body.cart).to.be.an('object')
          expect(res.body.cart).to.have.any.keys('_id', 'userId', 'products')

          expect(res.body.cart.products[res.body.cart.products.length - 1].qty).to.eql(newQty)

          done()
        })
    })

    it.only('ERROR: item not found, should return an error message \'Product not found!\'', function (done) {
      chai
        .request(app)
        .post(`/carts/products/${falseProductId}/${prevQty}`)
        .set('access_token', currentAccessToken)
        .end(function (err, res) {
          // console.log('ini res body pas expected 404', JSON.stringify(res.body, nullprevQty + newQty, 2));
          expect(err).to.be.null
          expect(res).to.have.status(404)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')
          expect(res.body.messages[0]).to.eql('Product not found!')

          done()
        })
    })

    it.only('ERROR: requested quantity of products is unavailable, should return an error message \'The quantity of products you requested exceeded our stock!\'', function (done) {
      chai
        .request(app)
        .post(`/carts/products/${currentProductId}/100`)
        .set('access_token', currentAccessToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')
          expect(res.body.messages[0]).to.eql('The quantity of products you requested exceeded our stock!')

          done()
        })
    })
  })

  describe('fetch user\'s cart > GET /carts', function () {
    it.only('should return a cart populated with products', function (done) {
      chai
        .request(app)
        .get('/carts')
        .set('access_token', currentAccessToken)
        .end(function (err, res) {
          currentCartId = res.body.cart._id
          // console.log('ini response fetch user\'s cart', JSON.stringify(res.body, null, 2));
          expect(err).to.be.null
          expect(res).to.have.status(200)

          expect(res.body).to.be.an('object')
          expect(res.body.cart).to.be.an('object')

          done()
        })
    })

    it.only('ERROR: unauthorized, should return this when the user has no access token', function (done) {
      chai
        .request(app)
        .get('/carts')
        .end(function (err, res) {
          // console.log('ini res body pas error unauthorized', res.body);
          expect(err).to.be.null
          expect(res).to.have.status(401)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')

          done()
        })
    })
  })

  describe('check out a cart > GET carts/:cartId/checkout', function () {
    it.only('should return new transaction populated with user cart', function (done) {
      chai
        .request(app)
        .patch(`/carts/${currentCartId}/checkout`)
        .set('access_token', currentAccessToken)
        .end(function (err, res) {
          // console.log('1 >>> ini res body pas cart checkout', res.body)
          checkedOutCartId = res.body.transaction.cart._id
          // console.log('2 >>> ini checkedOutCartId', checkedOutCartId)
          
          expect(err).to.be.null
          expect(res).to.have.status(201)

          expect(res.body).to.be.an('object')
          expect(res.body.message).to.eql('Successfully checked out your cart!')

          expect(res.body.transaction).to.be.an('object')
          expect(res.body.transaction.status).to.eql('preparing')
          expect(res.body.transaction.totalPrice).to.be.above(0)

          done()
        })
    })

    it.only('ERROR: this cart has already been checked out, should return this when the user has no cart to checkout', function (done) {
      chai
        .request(app)
        .patch(`/carts/${checkedOutCartId}/checkout`)
        .end(function (err, res) {
          // console.log('ini res body pas tes ERROR: this cart has already been checked out', res.body);
          expect(err).to.be.null
          expect(res).to.have.status(401)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')

          done()
        })
    })

    it.only('ERROR: unauthorized, should return this when the user has no access token', function (done) {
      chai
        .request(app)
        .patch(`/carts/${currentCartId}/checkout`)
        .end(function (err, res) {

          expect(err).to.be.null
          expect(res).to.have.status(401)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')

          done()
        })
    })
  })

  // describe('update product\'s quantity in cart > PATCH /carts/')
})
