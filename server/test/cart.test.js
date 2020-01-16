// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const app = require('../app')
// const Product = require('../models/product')
// const User = require('../models/user')


// chai.use(chaiHttp)

// const expect = chai.expect


// let customer = {
//   username: 'leo',
//   email : 'leo@mail.com',
//   password : '12345'
// }

// let cart = {}
// let cartId = ''

// let customerToken = ''

// before('register user as customer', function (done) {
//   chai.request(app)
//     .post('/users/register')
//     .send(customer)
//     .end(function (err, res) {
//       if (err) {
//         done(err)
//       } else {
//         customerToken = res.body.token
//         // console.log(res.body, 'registerrrrrrrr customer');
//         done()
//       }
//     })
// })

// after(function(done) {
//   User.deleteMany({}, () => {
//     // console.log(`testing : success deleting user data`);
//     done()
//   })
// })

// after(function(done) {
//   Product.deleteMany({}, () => {
//     // console.log(`testing : success deleting user data`);
//     done()
//   })
// })


// describe('add cart', function (done) {
//   it('should return a cart object', function (done) {
//     let body = {
//       user: '5dcb3cd77cc6e91b0590e154',
//       product: '5dcb4e584552be29c3c8c5e5',
//       amount: 3
//     }
    
//     let adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZDE4MDM0YTQwNzJlMTM0ZWQzZmI0NCIsImVtYWlsIjoibmF0aEBhZG1pbi5jb20iLCJpYXQiOjE1NzY3ODU2MDR9.wMaATgd79gxgjM-rWtWTeyVdpof7tCmw2sU0blQn79o'
//     chai
//       .request(app)
//       .post('/carts')
//       .set('token', customerToken)
//       .send(body)
//       .end((err, res) => {
//         expect(err).to.be.null
//         expect(res).status(201)
//         // console.log(res.body, "POST CARTTTTTTTTTTTTTTTTTTT");
//         cart = res.body
//         expect(res.body).to.be.an('object')
//         expect(res.body).to.have.all.keys('_id', 'user', 'product', 'amount', 'createdAt', 'updatedAt')
//         expect(res.body._id).to.be.a('string')
//         expect(res.body.user).to.be.a('string')
//         expect(res.body.product).to.be.a('string')
//         expect(res.body.amount).to.be.a('number')

//         cartId = res.body._id

//         expect(res.body._id).to.be.not.empty
//         expect(res.body.user).to.be.not.empty
//         expect(res.body.product).to.be.not.empty

//         expect(res.body._id).to.exist
//         expect(res.body.user).to.exist
//         expect(res.body.product).to.exist
//         expect(res.body.amount).to.exist
//         done()
//       })
//   })
// })

// describe('delete cart', function() {
//   it('should return deleted object', function(done) {
//     chai.request(app)
//       .delete(`/carts/${cart._id}`)
//       .set('token', customerToken)
//       .end((err, res) => {
//         expect(err).to.be.null
//         expect(res).status(200)
//         console.log(res.body, "MAU DELETE BODY NYA APA");
        
//         expect(res.body).to.be.an('object')
//         expect(res.body).to.have.all.keys('_id', 'user', 'product', 'amount', 'createdAt', 'updatedAt')
//         expect(res.body._id).to.be.a('string')
//         expect(res.body.user).to.be.a('string')
//         expect(res.body.product).to.be.a('string')
//         expect(res.body.amount).to.be.a('number')

//         expect(res.body._id).to.be.not.empty
//         expect(res.body.user).to.be.not.empty
//         expect(res.body.product).to.be.not.empty

//         expect(res.body._id).to.exist
//         expect(res.body.user).to.exist
//         expect(res.body.product).to.exist
//         expect(res.body.amount).to.exist
//         done()
//       })
//   })
// })