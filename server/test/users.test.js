const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')
const Product = require('../models/Product')
const User = require('../models/User')
const Cart = require('../models/Cart')

const expect = chai.expect
chai.use(chaiHttp)

let currentAccessToken = ''

const correctInput = {
  name: 'Keanu Reeves',
  email: 'keanureeves@mail.com',
  password: 'keanureeves'
}

describe('CRUD users routes', function () {
  this.timeout(5000)

  before(function (done) {
    chai
      .request(app)
      .post('/users/register')
      .send({
        name: 'initialinput',
        email: 'initialinput@mail.com',
        password: 'initialinput'
      })
      .end(function (err, res) {
        if (err) console.log(err)
        currentAccessToken = res.body.access_token
        done()
      })
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
          done()
        })
        .catch(err => console.log(err)
        )
    }
  })

  describe('Register a user', function () {

    it('should return an access_token with the message: \'Successfully registered!\'', function (done) {

      chai
        .request(app)
        .post('/users/register')
        .send(correctInput)
        .end(function (err, res) {
          // console.log("ini response dari user register", res.body)
          expect(err).to.be.null
          expect(res).to.have.status(201)

          expect(res.body).to.be.an('object')
          expect(res.body.user).to.be.an('object')
          expect(res.body.message).to.be.a('string')
          expect(res.body.access_token).to.be.a('string')

          expect(res.body.user.name).to.be.a('string')
          expect(res.body.user.email).to.be.a('string')
          expect(res.body.user.password).to.be.a('undefined')

          done()
        })

    })

    it(`ERROR: 'Email address has already been used!' when registering with an already registered email`, function (done) {

      chai
        .request(app)
        .post('/users/register')
        .send(correctInput)
        .end(function (err, res) {

          // console.log("ini response dari user register", res.body)
          
          expect(err).to.be.null
          expect(res).to.have.status(400)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')
          expect(res.body.messages[0]).to.eql('Email address has already been used!')

          done()
        })

    })

    it (`ERROR: 'Please input your name!' when name is not filled`, function (done) {

      chai
        .request(app)
        .post('/users/register')
        .send({
          name: '',
          email: 'emptyname@mail.com',
          password: 'emptyname'
        })
        .end(function (err, res) {

          // console.log("ini response dari user register", res.body)
          
          expect(err).to.be.null
          expect(res).to.have.status(400)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')
          expect(res.body.messages[0]).to.eql('Please input your name!')

          done()
        })      

    })

    it (`ERROR: 'Please input your email!' when email is not filled`, function (done) {

      chai
        .request(app)
        .post('/users/register')
        .send({
          name: 'empty email',
          email: '',
          password: 'emptyemail'
        })
        .end(function (err, res) {

          // console.log("ini response dari user register", res.body)
          
          expect(err).to.be.null
          expect(res).to.have.status(400)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')
          expect(res.body.messages[0]).to.eql('Please input your email!')

          done()
        })      

    })

    it (`ERROR: '... is not a valid email address!' when wrong email format is given`, function (done) {

      chai
        .request(app)
        .post('/users/register')
        .send({
          name: 'wrong email format',
          email: 'wrongemailformat',
          password: 'wrongemailformat'
        })
        .end(function (err, res) {

          // console.log("ini response dari user register", res.body)
          
          expect(err).to.be.null
          expect(res).to.have.status(400)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')
          expect(res.body.messages[0]).to.contain('is not a valid email address!')

          done()
        })      

    })

    it (`ERROR: 'Please input your password!' when password is not filled`, function (done) {

      chai
        .request(app)
        .post('/users/register')
        .send({
          name: 'empty password',
          email: 'emptypassword@mail.com',
          password: ''
        })
        .end(function (err, res) {

          // console.log("ini response dari user register", res.body)
          
          expect(err).to.be.null
          expect(res).to.have.status(400)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')
          expect(res.body.messages[0]).to.eql('Please input your password!')

          done()
        })      

    })

    it (`ERROR: 'Your password is too short! Please input a password between 5 to 15 characters.' when password length is less than 5 characters`, function (done) {

      chai
        .request(app)
        .post('/users/register')
        .send({
          name: 'short password',
          email: 'shortpassword@mail.com',
          password: '1234'
        })
        .end(function (err, res) {

          // console.log("ini response dari user register", res.body)
          
          expect(err).to.be.null
          expect(res).to.have.status(400)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')
          expect(res.body.messages[0]).to.eql('Your password is too short! Please input a password between 5 to 15 characters.')

          done()
        })      

    })

    it (`ERROR: 'Your password is too long! Please input a password between 5 to 15 characters.' when password length is more than 15 characters`, function (done) {

      chai
        .request(app)
        .post('/users/register')
        .send({
          name: 'long password',
          email: 'longpassword@mail.com',
          password: '1234fewjgioj239u9hwefeiu9wut90weutweuiwehwegwetwy98'
        })
        .end(function (err, res) {

          // console.log("ini response dari user register", res.body)
          
          expect(err).to.be.null
          expect(res).to.have.status(400)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')
          expect(res.body.messages[0]).to.eql('Your password is too long! Please input a password between 5 to 15 characters.')

          done()
        })      

    })

  })

  describe('User log in', function () {

    it('should return an access_token from user with the message: \'Successfully logged in!\'', function (done) {

      chai
        .request(app)
        .post('/users/login')
        .send({
          email: correctInput.email, password: correctInput.password
        })
        .end(function (err, res) {
          // console.log("ini response dari user register", res.body)
          currentUserId = res.body.user._id
          currentAccessToken = res.body.access_token
          // console.log("access token pas user log in", currentAccessToken);

          expect(err).to.be.null
          expect(res).to.have.status(200)

          expect(res.body).to.be.an('object')
          expect(res.body.user).to.be.an('object')
          expect(res.body.message).to.be.a('string')
          expect(res.body.access_token).to.be.a('string')

          expect(res.body.user.name).to.be.a('string')
          expect(res.body.user.email).to.be.a('string')
          expect(res.body.user.password).to.be.a('string')

          done()
        })
    })

    it('ERROR: when the user is not found, error message: \'Wrong email/password!\'', function (done) {

      chai
        .request(app)
        .post('/users/login')
        .send({
          email: 'wrong email address', password: correctInput.password
        })
        .end(function (err, res) {
          // console.log("ini response dari user login pas user not found", res.body)
          expect(err).to.be.null
          expect(res).to.have.status(404)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')

          done()
        })
    })

    it('ERROR: when the password is wrong, error message: \'Wrong email/password!\'', function (done) {
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: correctInput.email, password: 'wrong password'
        })
        .end(function (err, res) {
          // console.log("ini response dari user login pas salah password", res.body)
          expect(err).to.be.null
          expect(res).to.have.status(404)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')

          done()
        })
    })
  })

  describe('Find a user by id', function () {

    it('should return the currently logged in user', function (done) {
      chai
        .request(app)
        .get(`/users/user`)
        .set('access_token', currentAccessToken)
        .end(function (err, res) {
          // console.log("ini response dari user findbyid", res.body)
          expect(err).to.be.null
          expect(res).to.have.status(200)

          done()
        })
    })

    it('ERROR: when user not found should return message: \'Unauthorized access!\'', function (done) {
      const wrongAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkY2FkZjE4NmEyMjgwMjA2M2Q0MTgyZSIsIm5hbWUiOiJyaXNhbnRvIiwiZW1haWwiOiJyaXNhbnRvQG1haWwuY29tIiwiaWF0IjoxNTczNTc2NDczfQ.dGTkMP15gtF7RM7seRtahrsYb-DfTa0YmOAu_HB5p2M'

      chai
        .request(app)
        .get(`/users/user`)
        .set('access_token', wrongAccessToken)
        .end(function (err, res) {
          // console.log("ini response dari user findbyid", res.body)
          expect(err).to.be.null
          expect(res).to.have.status(401)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')

          done()
        })
    })
  })

})
