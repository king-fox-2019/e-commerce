const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const Transaction = require('../models/Transaction')

chai.use(chaiHttp)
const expect = chai.expect

// create initial data
let userSignin = {
    email: 'angela@mail.com',
    password: '123456'  
}

let cartToCheckout, initialTransaction;

let falseId = '5d63b24530a316a809302c57'
let invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

// delete data after testing
after(function(done) {
  if(process.env.NODE_ENV === 'testing') {
    Product.deleteMany({})
      .then(_ => {
        console.log('testing: delete data products success!')
        return User.deleteMany({})
      })
      .then(_ => {
        console.log('testing: delete data users success!')
        return Cart.deleteMany({})
      })
      .then(_ => {
        console.log('testing: delete cart success!')
        return Transaction.deleteMany({})
      })
      .then(_ => {
        console.log('testing: delete transaction success!')
        done()
      })
      .catch(console.log)
  }
})

describe('Transaction Routes', function() {
  before(function(done){

    User
        .findOne({ email: userSignin.email })
        .then(user => {
            return Cart.findOne({ user: user._id })
        })
        .then(cart => {
            cartToCheckout = cart;

            chai.request(app)
            .post('/login')
            .send(userSignin)
            .end(function(err, res) {
                userToken = JSON.parse(res.text).token;
    
                done()
            })
        })
        .catch(err => console.log(err))
    
  })

  describe('POST /transactions', function() {
    describe('success process', function() {
      it('should send an object (_id) with 201 status code', function(done) {
        chai.request(app)
        .post('/transactions')
        .send({cart: cartToCheckout})
        .set('authorization', userToken)
        .end(function(err, res) {
          initialTransaction = res.body
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object').to.have.any.keys('_id', 'user', 'products', 'total', 'status')
          expect(res.body.user).to.be.a('string')
          expect(res.body.products).to.be.an('array')
          done()
        })
      })
    })
    describe('error messages --OUT OF STOCK', function() {
      it('should send an object (_id) with 400 status code', function(done) {
        cartToCheckout.products[0].quantity = 300;
        chai.request(app)
        .post('/transactions')
        .send({cart: cartToCheckout})
        .set('authorization', userToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('array')
          done()
        })
      })
    })
  })
  describe('GET /transactions', function() {
    describe('success process', function() {
      it('should send an array of object with 200 status code', function(done) {
        chai.request(app)
        .get('/transactions')
        .set('authorization', userToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
      })
    })
  })
  describe('GET /transactions/:id', function() {
    describe('errors process', function() {
      it('should send an object with message product not found and 404 status code because _id', function(done) {
        chai.request(app)
        .get('/transactions/' + falseId)
        .set('authorization', userToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('Transaction not found')
          done()
        }) 
      })
    })
    describe('success process', function() {
      it('should send correct data with 200 status code', function(done) {
        chai.request(app)
        .get('/transactions/' + initialTransaction._id)
        .set('authorization', userToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('_id', 'user', 'products', 'total', 'status')
          expect(res.body.products).to.be.an('array')
          done()
        })
      })
    })
  })
})
