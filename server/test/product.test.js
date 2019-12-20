const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const fs = require('fs')
const Product = require('../models/product')
const User = require('../models/user')

chai.use(chaiHttp)

const expect = chai.expect

let admin = {
  username: 'nath',
  email: "nath@admin.com",
  password: '12345678',
  role: 'admin'
}

let customer = {
  username: 'leo',
  email : 'leo@mail.com',
  password : '12345'
}

let adminToken = ''
let customerToken = ''

before('register user as customer', function (done) {
  chai.request(app)
    .post('/users/register')
    .send(customer)
    .end(function (err, res) {
      if (err) {
        done(err)
      } else {
        customerToken = res.body.token
        console.log(res.body, 'registerrrrrrrr customer');
        done()
      }
    })
})


before('register user as admin', function (done) {
  chai.request(app)
    .post('/users/register')
    .send(admin)
    .end(function (err, res) {
      if (err) {
        done(err)
      } else {
        adminToken = res.body.token
        console.log(res.body, "registerrrrrrrr admin");
        console.log(adminToken, "dari post product");
        done()
      }
    })
})

          

after(function(done) {
  User.deleteMany({}, () => {
    // console.log(`testing : success deleting user data`);
    done()
  })
})

after(function(done) {
  Product.deleteMany({}, () => {
    // console.log(`testing : success deleting user data`);
    done()
  })
})

describe('product', function() {
 
  describe('POST/products',function() {

    it('should return _id, name, imageSource, price, desription, stock when input is complete and valid', function (done) {
        let body = {
          name : 'Clay Potter',
          price: 2888000,
          stock: 5
        }
        chai.request(app)
          .post('/products')
          .type('form')
          .attach('imageSource', fs.readFileSync('./10.jpg'), './10.jpg')
          .field('name', body.name)
          .field('price', body.price)
          .field('stock', body.stock)
          .set('token', adminToken)
          .send(body)
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).status(201)
            expect(res.body).to.be.an('object')
            expect(res.body).to.habe.all.keys('_id', 'name', 'imageSource', 'price', 'description', 'stock')
            expect(res.body._id).to.be.a('string')
            expect(res.body.name).to.be.a('string')
            expect(res.body.imageSource).to.be.a('string')
            expect(res.body.price).to.be.a('number')
            expect(res.body.description).to.be.a('string')
            expect(res.body.stock).to.be.a('number')

            productId = res.body._id
            expect(res.body._id).to.be.not.empty
            expect(res.body.name).to.be.not.empty
            expect(res.body.imageSource).to.be.not.empty
            expect(res.body.price).to.be.not.empty
            expect(res.body.description).to.be.not.empty
            expect(res.body.stock).to.be.not.empty

            expect(res.body._id).to.exist
            expect(res.body.name).to.exist
            expect(res.body.imageSource).to.exist
            expect(res.body.price).to.exist
            expect(res.body.description).to.exist
            expect(res.body.stock).to.exist
            done()
          })
          done()
    })

    it('should return error message when input is empty string', function(done) {
      let body = {
        name : '',
        price: '',
        stock: ''
      }
      chai
        .request(app)
        .post('/products')
        .type('form')
        .attach('imageSource', fs.readFileSync('./10.jpg'), './10.jpg')
        .field('name', body.name)
        .field('price', body.price)
        .field('stock', body.stock)
        .set('token', adminToken)
        .send(body)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).status(500)
          expect(res.body.messages).to.include('Please define your schema')
          expect(res.body.messages).to.include('Image source cannot be empty')
          expect(res.body.messages).to.include('Price cannot be empty')
          expect(res.body.messages).to.include('Please give your product a description')
          expect(res.body.messages).to.include('Stock cannot be empty')
          done()
        })
        done()
    })

    it('should return error message when input is invalid', function(done) {
      let body = {
        name : '.a',
        price: 0,
        description: 0,
        stock: -1
      }
      chai
        .request(app)
        .post('/products')
        .type('form')
        .attach('imageSource', fs.readFileSync('./10.jpg'), './10.jpg')
        .field('name', body.name)
        .field('price', body.price)
        .field('stock', body.stock)
        .set('token', adminToken)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).status(400)
          expect(res.body.messages).to.include('Price shuld be greater than 0')
          expect(res.body.messages).to.includd('Stock shoild be greater than 0')
          done()
        })
        done()
    })

    // describe('create new product error due to no token', function() {
    //   it('Return an error authorization message with status 401', function(done) {
    //     let newProduct = {
    //       name: 'Clay potter',
    //       imageSource: 'https://i.pinimg.com/564x/7e/c8/41/7ec841162ba6ebe61dd892f0234ffd6c.jpg',
    //       price: 2888000,
    //       stock: 5
    //     }
    //     chai 
    //       .request(app)
    //       .post('/products')
    //       .end(function(err, res) {
    //         expect(err).to.be.null
    //         expect(res).to.have.status(401)
    //         done()
    //       })
    //   })
    // })  
  })

  describe('GET/products', function() {
    
    describe('get all product on success', function() {
      it('App should return status code 200 and an array containing object of each product which has id, name, imageSource, price, description, stock', function(done) {
        chai
          .request(app)
          .get('/products')
          .set('token', customerToken)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body[0]).to.have.all.keys('_id', 'name', 'imageSource', 'price', 'description', 'stock')
            expect(res.body[0]._id).to.be.a('string')
            expect(res.body[0].name).to.be.a('string')
            expect(res.body[0].imageSource).to.be.a('string')
            expect(res.body[0].price).to.be.a('number')
            expect(res.body[0].description).to.be.a('string')
            expect(res.body[0].stock).to.be.a('number')

            expect(res.body[0]._id).to.be.not.empty
            expect(res.body[0].name).to.be.not.empty
            expect(res.body[0].imageSource).to.be.not.empty
            expect(res.body[0].price).to.be.not.empty
            expect(res.body[0].description).to.be.not.empty
            expect(res.body[0].stock).to.be.not.empty

            expect(res.body[0]._id).to.exist
            expect(res.body[0].name).to.exist
            expect(res.body[0].imageSource).to.exist
            expect(res.body[0].price).to.exist
            expect(res.body[0].description).to.exist
            expect(res.body[0].stock).to.exist
            done()
          })
          done()
      })
    })
  })

 

  // describe('PATCH/products', function() {
  //   it('should return _id, name, imageSource, price, desription, stock when input is complete and valid', function (done) {
  //     let body = {
  //       name : 'New Clay Potter',
  //       imageSource: 'https://i.pinimg.com/564x/7e/c8/41/7ec841162ba6ebe61dd892f0234ffd6c.jpg',
  //       price: 2888000,
  //       stock: 5
  //     }
  //     chai.request(app)
  //       .post(`/products/5dcb41d3f1562c211f97378e`)
  //       .set('token', adminToken)
  //       .send(body)
  //       .end((err, res) => {
  //         console.log(res.body, "patch/products")
  //         expect(err).to.be.null
  //         expect(res).status(200)
  //         expect(res.body).to.be.an('object')
  //         expect(res.body).to.habe.all.keys('_id', 'name', 'imageSource', 'price', 'description', 'stock')
  //         expect(res.body._id).to.be.a('string')
  //         expect(res.body.name).to.be.a('string')
  //         expect(res.body.imageSource).to.be.a('string')
  //         expect(res.body.price).to.be.a('number')
  //         expect(res.body.description).to.be.a('string')
  //         expect(res.body.stock).to.be.a('number')

  //         productId = res.body._id
  //         expect(res.body._id).to.be.not.empty
  //         expect(res.body.name).to.be.not.empty
  //         expect(res.body.imageSource).to.be.not.empty
  //         expect(res.body.price).to.be.not.empty
  //         expect(res.body.description).to.be.not.empty
  //         expect(res.body.stock).to.be.not.empty

  //         expect(res.body._id).to.exist
  //         expect(res.body.name).to.exist
  //         expect(res.body.imageSource).to.exist
  //         expect(res.body.price).to.exist
  //         expect(res.body.description).to.exist
  //         expect(res.body.stock).to.exist
  //         done()
  //       })
  //   })
  //   it('should return error message when input is empty string', function(done) {
  //     let body = {
  //       name : '',
  //       imageSource: 'dummylink',
  //       price: '',
  //       stock: ''
  //     }
  //     let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZDE4MDM0YTQwNzJlMTM0ZWQzZmI0NCIsImVtYWlsIjoibmF0aEBhZG1pbi5jb20iLCJpYXQiOjE1NzY3ODU2MDR9.wMaATgd79gxgjM-rWtWTeyVdpof7tCmw2sU0blQn79o'
  //     chai
  //       .request(app)
  //       .post('/products')
  //       .set('token', token)
  //       .send(body)
  //       .end((err, res) => {
  //         expect(err).to.be.null
  //         expect(res).status(400)
  //         expect(res.body.messages).to.include('Please define your schema')
  //         expect(res.body.messages).to.include('Image source cannot be empty')
  //         expect(res.body.messages).to.include('Price cannot be empty')
  //         expect(res.body.messages).to.include('Please give your product a description')
  //         expect(res.body.messages).to.include('Stock cannot be empty')
  //         done()
  //       })
  //   })

  //   it('should return error message when input is invalid', function(done) {
  //     let body = {
  //       name : '.a',
  //       imageSource: 'dummylink',
  //       price: 0,
  //       description: 0,
  //       stock: -1
  //     }
  //     let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZDE4MDM0YTQwNzJlMTM0ZWQzZmI0NCIsImVtYWlsIjoibmF0aEBhZG1pbi5jb20iLCJpYXQiOjE1NzY3ODU2MDR9.wMaATgd79gxgjM-rWtWTeyVdpof7tCmw2sU0blQn79o'
  //     chai
  //       .request(app)
  //       .post('/products')
  //       .set('token', token)
  //       .send(body)
  //       .end((err, res) => {
  //         expect(err).to.be.null
  //         expect(res).status(400)
  //         expect(res.body.messages).to.include('Price shuld be greater than 0')
  //         expect(res.body.messages).to.include('Stock shoild be greater than 0')
  //         done()
  //       })
  //   })

  // })

  // describe('DELETE/products', function() {
  //   it('should return deleted object',function(done) {
  //     chai
  //       .request(app)
  //       .delete(`/products/${productId}`)
  //       .set('token', token)
  //       .end((err, res) => {
  //         expect(err).to.be.null
  //         expect(res).status(200)
  //         expect(res.body).to.be.an('object')
  //         expect(res.body).to.habe.all.keys('_id', 'name', 'imageSource', 'price', 'description', 'stock')
  //         expect(res.body._id).to.be.a('string')
  //         expect(res.body.name).to.be.a('string')
  //         expect(res.body.imageSource).to.be.a('string')
  //         expect(res.body.price).to.be.a('number')
  //         expect(res.body.description).to.be.a('string')
  //         expect(res.body.stock).to.be.a('number')

  //         productId = res.body._id
  //         expect(res.body._id).to.be.not.empty
  //         expect(res.body.name).to.be.not.empty
  //         expect(res.body.imageSource).to.be.not.empty
  //         expect(res.body.price).to.be.not.empty
  //         expect(res.body.description).to.be.not.empty
  //         expect(res.body.stock).to.be.not.empty

  //         expect(res.body._id).to.exist
  //         expect(res.body.name).to.exist
  //         expect(res.body.imageSource).to.exist
  //         expect(res.body.price).to.exist
  //         expect(res.body.description).to.exist
  //         expect(res.body.stock).to.exist
  //         done()
  //       })
  //   })
  // })

})
