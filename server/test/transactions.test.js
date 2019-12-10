const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')
const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const Transaction = require('../models/Transaction')

const generateToken = require('../helpers/generateToken')

const expect = chai.expect
chai.use(chaiHttp)

let currentCustomerAccessToken = ''
let currentAdminAccessToken = ''

let customerInfo = {
  name: 'initial',
  email: 'initial@mail.com',
  password: '12345678',
  role: 'customer'
}

let adminInfo = {
  name: 'admin',
  email: 'admin@mail.com',
  password: 'admin123',
  role: 'admin'
}

let productInfo = {
  name: 'Harry Potter',
  price: 78000, qty: 9,
  author: 'J.K. Rowling'
}

let product, cart, transaction

describe('CRUD transaction routes', function () {
  before(async function () {

    try {
      // CUSTOMER
      let customer = await User.create(customerInfo)

      let customerPayload = {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        role: customer.role
      }

      currentCustomerAccessToken = generateToken(customerPayload)

      // ADMIN
      let admin = await User.create(adminInfo)

      let adminPayload = {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }

      currentAdminAccessToken = generateToken(adminPayload)

      // PRODUCT
      product = await Product.create(productInfo)
      currentProductId = product._id

      // CART
      cart = await Cart
        .create({
          products: [{ product: product._id, qty: 2 }],
          user: customer._id,
        })

      // TRANSACTION
      transaction = await Transaction
        .create({
          cart: cart._id,
          totalPrice: product.price * 2
        })

      // console.log('masuk before pas test userTransaction', transaction);

    } catch (error) {

      console.log(error)
    }
  })

  after(function (done) {
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
          return Transaction.deleteMany()
        })
        .then(() => {
          done()
        })
        .catch(err => console.log(error)
        )
    }
  })

  describe('fetch all existing transactions > GET /transactions', function () {
    it('should fetch all transactions history', function (done) {
      chai
        .request(app)
        .get(`/transactions`)
        .set('access_token', currentAdminAccessToken)
        .end(function (err, res) {

          expect(err).to.be.null
          expect(res).to.have.status(200)

          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.an('undefined')

          expect(res.body.transactions).to.be.an('array')
          
          done()
        })
    })

    it('ERROR: unauthorized access when given customer\'s access token', function (done) {
      chai
        .request(app)
        .get(`/transactions`)
        .set('access_token', currentCustomerAccessToken)
        .end(function (err, res) {

          expect(err).to.be.null
          expect(res).to.have.status(401)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')

          done()
        })
    })

    it('ERROR: unauthorized access when not given any access token', function (done) {
      chai
        .request(app)
        .get(`/transactions`)
        .end(function (err, res) {

          expect(err).to.be.null
          expect(res).to.have.status(401)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')

          done()
        })
    })
  })

  describe('fetch a specific customer\'s transaction > GET /transactions/:id', function () {
    it('should fetch a specific transaction history when given customer\'s access token', function (done) {

      // console.log('ini transaction id', transaction._id)

      chai
        .request(app)
        .get(`/transactions/${transaction._id}`)
        .set('access_token', currentCustomerAccessToken)
        .end(function (err, res) {

          // console.log('ini res body pas get transaction by id', res.body)
          
          expect(err).to.be.null
          expect(res).to.have.status(200)

          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.an('undefined')
          
          done()
        })
    })

    it ('should fetch a specific transaction history when given admin\'s access token', function(done) {
      
      chai
        .request(app)
        .get(`/transactions/${transaction._id}`)
        .set('access_token', currentAdminAccessToken)
        .end(function (err, res) {
          
          expect(err).to.be.null
          expect(res).to.have.status(200)

          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.an('undefined')
          
          done()
        })
    })

    it('ERROR: unauthorized access when not given any access token', function (done) {
      chai
        .request(app)
        .get(`/transactions/${transaction._id}`)
        .end(function (err, res) {

          expect(err).to.be.null
          expect(res).to.have.status(401)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')

          done()
        })
    })

    it ('ERROR: transaction not found when given a non-existing transaction id', function(done) {
      chai
        .request(app)
        .get(`/transactions/wrongtransactionid`)
        .set('access_token', currentAdminAccessToken)
        .end(function (err, res) {

          // console.log('ini res body pas GET /transactions/wrongtransactionid', res.body)
          
          expect(err).to.be.null
          expect(res).to.have.status(404)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')
          
          done()
        })
    })
  })

  describe('update status of a transaction > PATCH /transactions/:id', function () {

    it ('should return an updated transaction with the message: \'Updated transaction status!\'', function(done) {
      
      chai
        .request(app)
        .patch(`/transactions/${transaction._id}`)
        .send({ status: 'delivered' })
        .set('access_token', currentAdminAccessToken)
        .end(function (err, res) {
          
          expect(err).to.be.null
          expect(res).to.have.status(200)

          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.a('string')
          expect(res.body.message).to.eql('Updated transaction status!')

          expect(res.body.transaction).to.be.an('object')
          expect(res.body.transaction.status).to.eql('delivered')
          
          done()
        })
    })

    it ('ERROR: unauthorized access when given customer\'s access token', function (done) {

      chai
        .request(app)
        .patch(`/transactions/${transaction._id}`)
        .send({ status: 'delivered' })
        .set('access_token', currentCustomerAccessToken)
        .end(function (err, res) {

          expect(err).to.be.null
          expect(res).to.have.status(401)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')

          done()
        })
    })

    it ('ERROR: unauthorized access when not given any access token', function (done) {

      chai
        .request(app)
        .patch(`/transactions/${transaction._id}`)
        .send({ status: 'delivered' })
        .end(function (err, res) {

          expect(err).to.be.null
          expect(res).to.have.status(401)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')

          done()
        })
    })

    it ('ERROR: transaction not found when given a non-existing transaction id', function(done) {
      
      chai
        .request(app)
        .patch(`/transactions/wrongtransactionid`)
        .send({ status: 'delivered' })
        .set('access_token', currentAdminAccessToken)
        .end(function (err, res) {
          
          expect(err).to.be.null
          expect(res).to.have.status(404)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')
          
          done()
        })
    })

    it (`ERROR: bad request when patched with any status other than 'undelivered', 'delivered', 'received'`, function(done) {
      
      chai
        .request(app)
        .patch(`/transactions/${transaction._id}`)
        .send({ status: 'nonexistingstatus' })
        .set('access_token', currentAdminAccessToken)
        .end(function (err, res) {

          // console.log('ini res body pas dikasih nonexisting delivery status pas patch', res.body)
          
          expect(err).to.be.null
          expect(res).to.have.status(400)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')

          expect(res.body.messages[0]).to.include('is not a valid enum value for path')
          
          done()
        })
    })
  })

  describe('confirm that the order is received by the customer > PATCH /transactions/:id/received', function () {
    
    it (`should return a transaction with updated delivery status to 'received' with the message: 'Updated transaction status!' when given customer access token`, function(done) {
      
      chai
        .request(app)
        .patch(`/transactions/${transaction._id}/received`)
        .set('access_token', currentCustomerAccessToken)
        .end(function (err, res) {
          
          expect(err).to.be.null
          expect(res).to.have.status(200)

          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.a('string')
          expect(res.body.message).to.eql('Updated transaction status!')

          expect(res.body.transaction).to.be.an('object')
          expect(res.body.transaction.status).to.eql('received')
          
          done()
        })
    })

    it (`should return a transaction with updated delivery status to 'received' with the message: 'Updated transaction status!' when given admin access token`, function(done) {
      
      chai
        .request(app)
        .patch(`/transactions/${transaction._id}/received`)
        .set('access_token', currentAdminAccessToken)
        .end(function (err, res) {
          
          expect(err).to.be.null
          expect(res).to.have.status(200)

          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.a('string')
          expect(res.body.message).to.eql('Updated transaction status!')

          expect(res.body.transaction).to.be.an('object')
          expect(res.body.transaction.status).to.eql('received')
          
          done()
        })
    })

    it ('ERROR: unauthorized access when not given any access token', function (done) {
      
      chai
        .request(app)
        .patch(`/transactions/${transaction._id}/received`)
        .end(function (err, res) {

          expect(err).to.be.null
          expect(res).to.have.status(401)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')

          done()
        })
    })

    it ('ERROR: transaction not found when given a non-existing transaction id', function(done) {
      
      chai
        .request(app)
        .patch(`/transactions/nonexistingtransactionid/received`)
        .end(function (err, res) {
          
          expect(err).to.be.null
          expect(res).to.have.status(404)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')
          
          done()
        })
    })
  })

})