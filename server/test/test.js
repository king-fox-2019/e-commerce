'use strict'

const { User } = require('../models')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)
const expect = chai.expect

let newUser = {
  fullName: 'Brahmantya Sukma',
  email: 'brahmantyasukma@gmail.com',
  password: 'prajanji88',
  nationalityId: 3306090606970003
}
let newUserError = {
  fullName: 'Brahmantya Prajanji',
  email: 'sukmabrahmantya@gmail.com',
  password: 'prajanji',
  nationalityId: 3306090606970001
}

let userLogin = {
  email: newUser.email,
  password: newUser.password
}

//middleware test
before(() => {
  const data = {
    fullName: 'Testing',
    email: 'testing@gmail.com',
    password: 'testing',
    nationalityId: 3306090606970002
  }
  User
    .create(data)
    .then(user => {console.log('testing: success create initial user')})
    .catch(console.log)
})

// delete data after testing
after(function (done) {
  if (process.env.NODE_ENV === 'testing') {
    User.deleteMany({})
      .then(_ => {
        console.log('testing: delete data user success!')
        done()
      })
      .catch(console.log)
  }
})

describe("User Routes", function () {
  describe("POST /users/register", function(){
    describe("Success Process", function(){
      it("Should send an object (id, fullName, email, nationalityId, token) with 201 status code", function(done){
        chai.request(app)
          .post('/users/register')
          .send(newUser)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object').to.have.any.keys('id', 'fullName', 'email', 'nationalityId', 'token')
            expect(res.body.fullName).equal(newUser.fullName)
            expect(res.body.email).equal(newUser.email)
            expect(res.body.nationalityId).equal(newUser.nationalityId)
            done()
          })
      })
    })
    describe("Error Process", function(){
      it("should send an error with 400 status code because missing full name value", function(done){
        const withOutFullName = {...newUserError}
        delete withOutFullName.fullName
        chai.request(app)
          .post('/users/register')
          .send(withOutFullName)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('status', 'message')
            expect(res.body.message).to.equal('User validation failed: fullName: Fullname cannot be empty!')
            done()
          })
      })
      it("should send an error with 400 status code because missing email value", function(done){
        const withOutEmail = {...newUserError}
        delete withOutEmail.email
        chai.request(app)
          .post('/users/register')
          .send(withOutEmail)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('status', 'message')
            expect(res.body.message).to.equal('User validation failed: email: Email cannot be empty!')
            done()
          })
      })
      it("should send an error with 400 status code because missing password value", function(done){
        const withOutPassword = {...newUserError}
        delete withOutPassword.password
        chai.request(app)
          .post('/users/register')
          .send(withOutPassword)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('status', 'message')
            expect(res.body.message).to.equal('User validation failed: password: Password cannot be empty!')
            done()
          })
      })
      it("should send an error with 400 status code because missing nationality id value", function(done){
        const withOutNationalityID = {...newUserError}
        delete withOutNationalityID.nationalityId
        chai.request(app)
          .post('/users/register')
          .send(withOutNationalityID)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('status', 'message')
            expect(res.body.message).to.equal('User validation failed: nationalityId: Nationality ID cannot be empty!')
            done()
          })
      })
      it("should send an error with 400 status code because missing full name and email value", function(done){
        const withOutFullNameAndEmail = {...newUserError}
        delete withOutFullNameAndEmail.fullName
        delete withOutFullNameAndEmail.email
        chai.request(app)
          .post('/users/register')
          .send(withOutFullNameAndEmail)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('status', 'message')
            expect(res.body.message).to.equal('User validation failed: email: Email cannot be empty!, fullName: Fullname cannot be empty!')
            done()
          })
      })
      it("should send an error with 400 status code because missing full name and password value", function(done){
        const withOutFullNameAndPassword = {...newUserError}
        delete withOutFullNameAndPassword.fullName
        delete withOutFullNameAndPassword.password
        chai.request(app)
          .post('/users/register')
          .send(withOutFullNameAndPassword)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('status', 'message')
            expect(res.body.message).to.equal('User validation failed: password: Password cannot be empty!, fullName: Fullname cannot be empty!')
            done()
          })
      })
      it("should send an error with 400 status code because missing full name and nationality id value", function(done){
        const withOutFullNameAndNationalityId = {...newUserError}
        delete withOutFullNameAndNationalityId.fullName
        delete withOutFullNameAndNationalityId.nationalityId
        chai.request(app)
          .post('/users/register')
          .send(withOutFullNameAndNationalityId)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('status', 'message')
            expect(res.body.message).to.equal('User validation failed: fullName: Fullname cannot be empty!, nationalityId: Nationality ID cannot be empty!')
            done()
          })
      })
      it("should send an error with 400 status code because missing email and password value", function(done){
        const withOutEmailAndPassword = {...newUserError}
        delete withOutEmailAndPassword.email
        delete withOutEmailAndPassword.password
        chai.request(app)
          .post('/users/register')
          .send(withOutEmailAndPassword)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('status', 'message')
            expect(res.body.message).to.equal('User validation failed: email: Email cannot be empty!, password: Password cannot be empty!')
            done()
          })
      })
      it("should send an error with 400 status code because missing email and nationality id value", function(done){
        const withOutEmailAndNationalityID = {...newUserError}
        delete withOutEmailAndNationalityID.email
        delete withOutEmailAndNationalityID.nationalityId
        chai.request(app)
          .post('/users/register')
          .send(withOutEmailAndNationalityID)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('status', 'message')
            expect(res.body.message).to.equal('User validation failed: email: Email cannot be empty!, nationalityId: Nationality ID cannot be empty!')
            done()
          })
      })
      it("should send an error with 400 status code because missing password and nationality id value", function(done){
        const withOutPasswordAndNationalityID = {...newUserError}
        delete withOutPasswordAndNationalityID.password
        delete withOutPasswordAndNationalityID.nationalityId
        chai.request(app)
          .post('/users/register')
          .send(withOutPasswordAndNationalityID)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('status', 'message')
            expect(res.body.message).to.equal('User validation failed: password: Password cannot be empty!, nationalityId: Nationality ID cannot be empty!')
            done()
          })
      })
      it("should send an error with 400 status code because nationality id value less than 16 digit", function(done){
        const nationalityIdLessThan = {...newUserError}
        nationalityIdLessThan.nationalityId = 330609060697000
        chai.request(app)
          .post('/users/register')
          .send(nationalityIdLessThan)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('status', 'message')
            expect(res.body.message).to.equal('User validation failed: nationalityId: Nationality ID cannot less than 16 Digit!')
            done()
          })
      })
      it("should send an error with 400 status code because email already taken", function(done){
        const emailValidation = {...newUserError}
        emailValidation.email = 'brahmantyasukma@gmail.com'
        chai.request(app)
          .post('/users/register')
          .send(emailValidation)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('status', 'message')
            expect(res.body.message).to.equal('User validation failed: email: Email already taken!')
            done()
          })
      })
      it("should send an error with 400 status code because email is not valid", function(done){
        const emailValidation = {...newUserError}
        emailValidation.email = 'brahmantyasukma'
        chai.request(app)
          .post('/users/register')
          .send(emailValidation)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('status', 'message')
            expect(res.body.message).to.equal('User validation failed: email: Email is not valid!')
            done()
          })
      })
      it("should send an error with 400 status code because email and nationality id already taken", function(done){
        const emailAndNationalityIdValidation = {...newUserError}
        emailAndNationalityIdValidation.email = 'brahmantyasukma@gmail.com'
        emailAndNationalityIdValidation.nationalityId = 3306090606970003
        chai.request(app)
          .post('/users/register')
          .send(emailAndNationalityIdValidation)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('status', 'message')
            done()
          })
      })
      it("should send an error with 400 status code because nationality id already taken", function(done){
        const nationalityIdLessThan = {...newUserError}
        nationalityIdLessThan.nationalityId = 3306090606970003
        chai.request(app)
          .post('/users/register')
          .send(nationalityIdLessThan)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('status', 'message')
            expect(res.body.message).to.equal('User validation failed: nationalityId: Nationality ID already taken!')
            done()
          })
      })
    })
  })
  describe("POST /users/login", function() {
    describe("Success Process", function () {
      it("Should send an object (id, fullName, email, nationalityId, token) with 200 status code", function (done) {
        chai.request(app)
          .post('/users/login')
          .send(userLogin)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('id', 'fullName', 'email', 'nationalityId', 'token')
            expect(res.body.fullName).equal(newUser.fullName)
            expect(res.body.email).equal(newUser.email)
            expect(res.body.nationalityId).equal(newUser.nationalityId)
            done()
          })
      })
    })
    describe("Error Process", function () {
      it("should send an error with 400 status code because missing email value", function (done) {
        const withOutEmail = { ...userLogin }
        delete withOutEmail.email
        chai.request(app)
          .post('/users/login')
          .send(withOutEmail)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message')
            expect(res.body.message).to.equal('Password / Username is wrong')
            done()
          })
      })
    })
  })
})