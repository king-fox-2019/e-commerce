// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const app = require('../app')
// const fs = require('fs')
// const User = require('../models/user')
// const Transaction = require('../models/transaction')
// const Product = require('../models/product')

// chai.use(chaiHttp)
// const expect = chai.expect

// let adminToken = ''
// let customerToken = ''

// let admin = {
//   username: 'nath',
//   email: "nath@admin.com",
//   password: '12345678',
//   role: 'admin'
// }

// let customer = {
//   username: 'leona',
//   email: "leona@mail.com",
//   password: '12345',
//   role: 'customer'
// }

// let product = {
//   name: 'Ceramic',
//   price: 5000,
//   stock: 10,
//   image: 'url'
// }

// let productData = {
//   name: "Miilian",
//   price: "650000",
//   stock: "5"
// }

// let updateProductData = {
//   name: "Jurgen Leh'l",
//   price: "9850000",
//   stock: "1"
// }

// let removedProductId = ''

// before('register user as admin', function (done) {
//   chai.request(app)
//     .post('/users/register')
//     .send(admin)
//     .end(function (err, res) {
//       if (err) {
//         done(err)
//       } else {
//         adminToken = res.body.token
//         console.log(res.body, "registerrrrrrrr admin");
//         done()
//       }
//     })
// })

// before('register user as customer', function (done) {
//   chai.request(app)
//     .post('/users/register')
//     .send(customer)
//     .end(function (err, res) {
//       if (err) {
//         done(err)
//       } else {
//         customerToken = res.body.token
//         console.log(res.body, 'registerrrrrrrr customer');
//         done()
//       }
//     })
// })

// // before('create gonna be deleted product', function (done) {
// //   this.timeout(10000)
// //   Product.create({
// //     name: 'dummy product',
// //     price: 9000,
// //     stock: '12',
// //     image: 'asdasdasd'
// //   })
// //     .then(data => {
// //       gonnaBeDeletedProductId = data._id
// //       done()
// //     })
// //     .catch(err => {
// //       console.log(err)
// //       done()
// //     })
// // })

// after(function(done) {
//   User.deleteMany({}, () => {
//     console.log(`testing : success deleting user data`);
//     done()
//   })
// })

// after(function(done) {
//   Transaction.deleteMany({}, () => {
//     console.log(`testing : success deleting transaction data`);
//     done()
//   })
// })

// after(function(done) {
//   Product.deleteMany({}, () => {
//     console.log(`testing : success deleting product data`);
//     done()
//   })
// })

// describe('Transactions', function () {
//   this.timeout(10000)
//   describe('Find user\'s transaction', function () {
//     describe('success process', function () {
//       it('should return an array of objects with status code 200', function (done) {
//         chai.request(app)
//           .get('/transactions')
//           .set('token', customerToken)
//           .send(product)
//           .end(function (err, res) {
//             expect(err).to.be.null
//             expect(res).to.have.status(200)
//             expect(res.body).to.be.an('array')
//             done()
//           })
//       })
//     })
//     describe('error process', function () {
//       it('should return an object with message jwt must be provided (missing token) and status 401', function (done) {
//         chai.request(app)
//           .get('/transactions')
//           .end(function (err, res) {
//             expect(err).to.be.null
//             expect(res).to.have.status(401)
//             expect(res.body).to.be.an('object').to.have.any.keys('message')
//             expect(res.body.message).to.equal('you have to login first')
//             done()
//           })
//       })
//     })
//   })
//   describe('admin find all', function () {
//     describe('success process', function () {
//       it('should return an array of objects with status code 200', function (done) {
//         chai.request(app)
//           .get('/transactions/admin')
//           .set('token', adminToken)
//           .end(function (err, res) {
//             expect(err).to.be.null
//             expect(res).to.have.status(200)
//             expect(res.body).to.be.an('array')
//             done()
//           })
//       })
//     })
//     describe('error process', function () {
//       it('should return an object with message jwt must be provided (missing token) and status 401', function (done) {
//         chai.request(app)
//           .get('/transactions/admin')
//           .end(function (err, res) {
//             expect(err).to.be.null
//             expect(res).to.have.status(401)
//             expect(res.body).to.be.an('object').to.have.any.keys('message')
//             expect(res.body.message).to.equal('you have to login first')
//             done()
//           })
//       })
//       it('should return an object with message "You are not authorized" and status 401 when using customer token', function (done) {
//         chai.request(app)
//           .get('/transactions/admin')
//           .set('token', customerToken)
//           .end(function (err, res) {
//             expect(err).to.be.null
//             expect(res).to.have.status(401)
//             expect(res.body).to.be.an('object').to.have.any.keys('message')
//             expect(res.body.message).to.equal('You are not authorized')
//             done()
//           })
//       })
//     })
//   })
// })