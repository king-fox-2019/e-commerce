const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/User')
const Product = require('../models/Product')
const jwt = require('jsonwebtoken')

chai.use(chaiHttp)
const expect = chai.expect

let initialProduct, adminToken, userToken;
// create initial data
let userSignin = {
  email: 'angela@mail.com',
  password: '123456'
}

let newProduct = {
  name: 'product1',
  price: 20000,
  image: 'image.jpg',
  stock: 1000
}

let falseId = '5d63b24530a316a809302c57'
let invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

// middleware testing
before(function(done) {
    // generateToken
    User.create({
        name: 'Admin2',
        email: 'admin2@mail.com',
        password: '654321',
        isAdmin: true
    })
    .then(user => {
        adminToken = jwt.sign({
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET);

        console.log('success generate token')
        return Product.create({
            name: 'product-hooks',
            price: 20000,
            image: 'image',
            stock: 200
        })
    })
    .then(product => {
        initialProduct = product
        done()
    })
    .catch(console.log)
})

describe('Products Routes', function() {
  before(function(done){
    chai.request(app)
      .post('/login')
      .send(userSignin)
      .end(function(err, res) {
          userToken = JSON.parse(res.text).token;
          done()
    })
  })
  describe('POST /products', function() {
    describe('success process', function() {
      it('should send an object (_id, name, price, image, stock) with 201 status code', function(done) {
        chai.request(app)
        .post('/products')
        .send(newProduct)
        .set('authorization', adminToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object').to.have.any.keys('_id', 'name', 'price', 'image', 'stock')
          expect(res.body).to.includes({ 
            name: newProduct.name, 
            price: newProduct.price, 
            image: newProduct.image,
            stock: newProduct.stock
          })
          done()
        })
      })
    })
    describe('errors process', function() {
      it('should send an error with 400 status code because unauthorized token', function(done) {
        chai.request(app)
        .post('/products')
        .send(newProduct)
        .set('authorization', userToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('You are not authorized.')
          done()
        })
      })
      it('should send an error with 422 status code because missing name value', function(done) {
        const withoutName = { ...newProduct }
        delete withoutName.name
        chai.request(app)
        .post('/products')
        .send(withoutName)
        .set('authorization', adminToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.be.an('array').that.includes('Name can not be empty')
          done()
        })
      })
      it('should send an error with 422 status code because missing price value', function(done) {
        const withoutPrice = { ...newProduct }
        delete withoutPrice.price
        chai.request(app)
        .post('/products')
        .send(withoutPrice)
        .set('authorization', adminToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.be.an('array').that.includes('Price can not be empty')
          done()
        })
      })
      it('should send an error with 422 status code because missing stock value', function(done) {
        const withoutStock = { ...newProduct }
        delete withoutStock.stock
        chai.request(app)
        .post('/products')
        .send(withoutStock)
        .set('authorization', adminToken)
        .end(function(err, res) {
          console.log(err)
          expect(err).to.be.null
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.be.an('array').that.includes('Stock can not be empty')
          done()
        })
      })
      it('should send an error with 422 status code because missing category value', function(done) {
        const withoutImage = { ...newProduct }
        delete withoutImage.image
        chai.request(app)
        .post('/products')
        .send(withoutImage)
        .set('authorization', adminToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.be.an('array').that.includes('Image can not be empty')
          done()
        })
      })
      it('should send an error with 401 status code because token undefined', function(done) {
        chai.request(app)
        .post('/products')
        .send(newProduct)
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
        .post('/products')
        .send(newProduct)
        .set('authorization', invalidToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('invalid signature')
          done()
        })
      })
      it('should send an error with 401 status code because non admin token', function(done) {
        chai.request(app)
        .post('/products')
        .send(newProduct)
        .set('authorization', userToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('You are not authorized.')
          done()
        })
      })
    })
  })
  describe('GET /products', function() {
    describe('success process', function() {
      it('should send an array of object with 200 status code', function(done) {
        chai.request(app)
        .get('/products')
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
      })
    })
  })
  describe('GET /products/:id', function() {
    describe('errors process', function() {
      it('should send an object with message product not found and 404 status code because _id', function(done) {
        chai.request(app)
        .get('/products/' + falseId)
        .end(function(err, res) {
            // console.log(res.body)
          expect(err).to.be.null
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('Product not found')
          done()
        }) 
      })
    })
    describe('success process', function() {
      it('should send correct data with 200 status code', function(done) {
        chai.request(app)
        .get('/products/' + initialProduct._id)
        .set('authorization', userToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('_id', 'name', 'price', 'image', 'stock')
          expect(res.body).to.includes({ 
            _id: String(initialProduct._id), 
            name: initialProduct.name, 
            price: initialProduct.price, 
            image: initialProduct.image,
            stock: initialProduct.stock
          })
          done()
        })
      })
    })
  })
  describe('DELETE /products/:id', function() {
    describe('errors process', function() {
      it('should send an object with message unauthorized', function(done) {
        chai.request(app)
        .delete('/products/' + initialProduct._id)
        .set('authorization', userToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('You are not authorized.')
          done()
        })
      })
      it('should send an object with message product not found and 404 status code because _id', function(done) {
        chai.request(app)
        .delete('/products/' + falseId)
        .set('authorization', adminToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(404)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('Product not found')
          done()
        })
      })
      it('should send an error with 401 status code because token undefined', function(done) {
        chai.request(app)
        .delete('/products/' + initialProduct._id)
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
        .delete('/products/' + initialProduct._id)
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
    describe('success process', function() {
      it('should send 200 status code', function(done) {
        chai.request(app)
        .delete('/products/' + initialProduct._id)
        .set('authorization', adminToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          done()
        })
      })
    })
  })
})