const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')

chai.use(chaiHttp)
const expect = chai.expect

// create initial data
let userSignin = {
    email: 'angela@mail.com',
    password: '123456'  
}

let newProduct = {
  name: 'test123',
  price: 20000,
  image: 'image.jpg',
  stock: 200
}

let userToken = ''
let userId, newCart, newCart2, createdCart;
let falseId = '5d63b24530a316a809302c57'
let invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

describe('Cart Routes', function() {
    // this.timeout(10000)
  before(function(done){
    
    Product.create({
      name: 'caramel123',
      price: 20000,
      image: 'image.jpg',
      stock: 200
    })
    .then( product => {
        newCart = {
            item: product._id,
            quantity: 3
        }

        return Product.create(newProduct);
    })
    .then(data => {
        newCart2 = {
            item: data._id,
            quantity: 20
        }

        chai.request(app)
        .post('/login')
        .send(userSignin)
        .end(function(err, res) {
            userToken = JSON.parse(res.text).token;

            done()
        })
    })
    .catch(err => console.log(err));
  })
  describe('POST /carts', function() {
    describe('success process', function() {
      it('should send an object (_id, UserId, ProductId, isActive) with 201 status code', function(done) {
        chai.request(app)
        .post('/carts')
        .send(newCart)
        .set('authorization', userToken)
        .end(function(err, res) {
          createdCart = res.body;
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object').to.have.any.keys('_id', 'user', 'products', 'isActive')
          expect(res.body.user).to.be.a('string')
          expect(res.body.products).to.be.an('array')
          expect(res.body.isActive).to.equal(true)
          done()
        })
      })
    })
    describe('success process --Add same product to existing cart', function() {
      it('should send an object (_id, UserId, ProductId, isActive) with 200 status code', function(done) {
        chai.request(app)
        .post('/carts')
        .send(newCart)
        .set('authorization', userToken)
        .end(function(err, res) {
          createdCart = res.body;
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('_id', 'user', 'products', 'isActive')
          expect(res.body.user).to.be.a('string')
          expect(res.body.products).to.be.an('array')
          expect(res.body.isActive).to.equal(true)
          done()
        })
      })
    })
    describe('success process --Add different product to existing cart', function() {
      it('should send an object (_id, UserId, ProductId, isActive) with 200 status code', function(done) {
        chai.request(app)
        .post('/carts')
        .send(newCart2)
        .set('authorization', userToken)
        .end(function(err, res) {
          createdCart = res.body;
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('_id', 'user', 'products', 'isActive')
          expect(res.body.user).to.be.a('string')
          expect(res.body.products).to.be.an('array')
          expect(res.body.isActive).to.equal(true)
          done()
        })
      })
    })
    describe('errors process', function() {
      it('should send an error with 401 status code because token undefined', function(done) {
        chai.request(app)
        .post('/carts')
        .send(newCart)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('jwt must be provided')
          done()
        })
      })
      it('should send an error with 401 status code because invalid token', function(done) {
        chai.request(app)
        .post('/carts')
        .send(newCart)
        .set('authorization', invalidToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('invalid signature')
          done()
        })
      })
    })
  })
  describe('PUT /carts', function() {
    describe('success process --Remove from cart - update quantity', function() {
      it('should send an object (_id, UserId, ProductId, isActive) with 201 status code', function(done) {
        chai.request(app)
        .put('/carts')
        .send(newCart)
        .set('authorization', userToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('_id', 'user', 'products', 'isActive')
          expect(res.body.user).to.be.a('string')
          expect(res.body.products).to.be.an('array')
          expect(res.body.isActive).to.equal(true)
          done()
        })
      })
    })
    describe('success process --Remove from cart - remove product', function() {
      it('should send an object (_id, UserId, ProductId, isActive) with 201 status code', function(done) {
        chai.request(app)
        .put('/carts')
        .send(newCart)
        .set('authorization', userToken)
        .end(function(err, res) {
          createdCart = res.body;
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('_id', 'user', 'products', 'isActive')
          expect(res.body.user).to.be.a('string')
          expect(res.body.products).to.be.an('array')
          expect(res.body.isActive).to.equal(true)
          done()
        })
      })
    })
  })
})