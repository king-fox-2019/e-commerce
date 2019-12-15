const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/User');
const expect = chai.expect;
chai.use(chaiHttp);

let newUser = {
    name: 'Angela',
    email: 'angela@mail.com',
    password: '123456'
}

let newUserLogin = {
    email: 'angela@mail.com',
    password: '123456'  
}

let newAdmin = {
    name: 'Admin',
    email: 'admin@mail.com',
    password: '654321',
    adminPass: process.env.ADMIN_PASS
}

let newAdminLogin = {
    email: 'admin@mail.com',
    password: '654321'
}

before(function() {
    const initUser = {
      name: 'Dummy',
      email: 'dummy@mail.com',
      password: '123456'
    }

    User
        .create(initUser)
        .then(user => console.log('testing: success create initial user'))
        .catch(console.log)
})
  
describe('User Routes', function() {
    describe('POST /register', function() {
        describe('success process -NON ADMIN', function() {
            it('should send an object (name, email, token, isAdmin) with 201 status code', function(done) {
                chai
                    .request(app)
                    .post('/register')
                    .send(newUser)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('object').to.have.any.keys('_id', 'name', 'email', 'token', 'isAdmin')
                        expect(res.body.name).to.be.a('string').to.equal('Angela')
                        expect(res.body.email).to.be.a('string').to.equal('angela@mail.com')
                        expect(res.body.token).to.be.a('string')
                        expect(res.body.isAdmin).to.equal(false)
                        done()
                    })
            })
        })
        describe('success process -ADMIN', function() {
            it('should send an object (name, email, token, isAdmin) with 201 status code', function(done) {
                chai
                    .request(app)
                    .post('/register')
                    .send(newAdmin)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('object').to.have.any.keys('_id', 'name', 'email', 'token', 'isAdmin')
                        expect(res.body.name).to.be.a('string').to.equal('Admin')
                        expect(res.body.email).to.be.a('string').to.equal('admin@mail.com')
                        expect(res.body.token).to.be.a('string')
                        expect(res.body.isAdmin).to.equal(true)
                        done()
                    })
            })
        })
        describe('errors process', function() {
            it('should send an error with 400 status code because missing name value', function(done) {
              const userWithoutName = {
                  email: 'without@name.com',
                  password: '123456'
              }
              
              chai.request(app)
              .post('/register')
              .send(userWithoutName)
              .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(422)
                expect(res.body).to.be.an('object').to.have.any.keys('message')
                expect(res.body.message).to.be.an('array').that.includes('Name can not be empty')
                done()
              })
            })
            it('should send an error with 400 status code because missing email value', function(done) {
              const withoutEmail = { ...newUser }
              delete withoutEmail.email
              chai.request(app)
              .post('/register')
              .send(withoutEmail)
              .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(422)
                expect(res.body).to.be.an('object').to.have.any.keys('message')
                expect(res.body.message).to.be.an('array').that.includes('Email can not be empty')
                done()
              })
            })
            it('should send an error with 400 status code because missing password value', function(done) {
              const userWithoutPass = {
                  name: 'withoutPass',
                  email: 'user@withoutpass.com'
              } 
      
              chai.request(app)
              .post('/register')
              .send(userWithoutPass)
              .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res.body).to.be.an('object').to.have.any.keys('message')
                expect(res.body.message).to.equal('Password should not be empty.')
                done()
              })
            })
            it('should send an error with 400 status code because format email invalid', function(done) {
              const falseEmailFormat = { ...newUser, email: 'salahformat.com' }
              chai.request(app)
              .post('/register')
              .send(falseEmailFormat)
              .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(422)
                expect(res.body).to.be.an('object').to.have.any.keys('message')
                expect(res.body.message).to.be.an('array').that.includes('Invalid email')
                done()
              })
            })
            it('should send an error with 400 status code because duplicate data', function(done) {
              chai.request(app)
              .post('/register')
              .send(newUser)
              .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res.body).to.be.an('object').to.have.any.keys('message')
                expect(res.body.message).to.equal('Email user is already registered!')
                done()
              })
            })
            it('should send an error with 400 status code because invalid admin pass', function(done) {        
              const falseAdminPass = { ...newAdmin, email: 'wrong@admin.com', adminPass: 'salahpassworddong' }
              chai.request(app)
              .post('/register')
              .send(falseAdminPass)
              .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res.body).to.be.an('object').to.have.any.keys('message')
                expect(res.body.message).to.equal('Invalid admin pass')
                done()
              })
            })
        })
    })
    describe('POST /login', function() {
        describe('success process -NON ADMIN', function() {
          it('should send an object (message, token) with 200 status code', function(done) {
            chai.request(app)
            .post('/login')
            .send(newUserLogin)
            .end(function(err, res) {
              expect(err).to.be.null
              expect(res).to.have.status(200)
              expect(res.body).to.be.an('object').to.have.any.keys('name', 'email', 'token', 'isAdmin')
              expect(res.body.name).to.be.a('string').to.equal('Angela')
              expect(res.body.email).to.be.a('string').to.equal('angela@mail.com')
              expect(res.body.token).to.be.a('string')
              expect(res.body.isAdmin).to.equal(false)
              done()
            })
          })
        })
        describe('success process -ADMIN', function() {
          it('should send an object (message, token) with 200 status code', function(done) {
            chai.request(app)
            .post('/login')
            .send(newAdminLogin)
            .end(function(err, res) {
              expect(err).to.be.null
              expect(res).to.have.status(200)
              expect(res.body).to.be.an('object').to.have.any.keys('_id', 'name', 'email', 'token', 'isAdmin')
              expect(res.body.name).to.be.a('string').to.equal('Admin')
              expect(res.body.email).to.be.a('string').to.equal('admin@mail.com')
              expect(res.body.token).to.be.a('string')
              expect(res.body.isAdmin).to.equal(true)
              done()
            })
          })
        })
        describe('errors process', function() {
          it('should send an error with 400 status code because missing email value', function(done) {
            const withoutEmail = { ...newUserLogin }
            delete withoutEmail.email
            chai.request(app)
            .post('/login')
            .send(withoutEmail)
            .end(function(err, res) {
              expect(err).to.be.null
              expect(res).to.have.status(400)
              expect(res.body).to.be.an('object').to.have.any.keys('message')
              expect(res.body.message).to.equal('Bad Request')
              done()
            })
          })
          it('should send an error with 400 status code because missing password value', function(done) {
            const withoutPassword = { ...newUserLogin }
            delete withoutPassword.password
            chai.request(app)
            .post('/login')
            .send(withoutPassword)
            .end(function(err, res) {
              expect(err).to.be.null
              expect(res).to.have.status(400)
              expect(res.body).to.be.an('object').to.have.any.keys('message')
              expect(res.body.message).to.equal('Bad Request')
              done()
            })
          })
          it('should send an error with 404 status code because invalid email', function(done) {
            const falseEmail = { ...newUserLogin }
            falseEmail.email = 'false@mail.com'
            chai.request(app)
            .post('/login')
            .send(falseEmail)
            .end(function(err, res) {
              expect(err).to.be.null
              expect(res).to.have.status(404)
              expect(res.body).to.be.an('object').to.have.any.keys('message')
              expect(res.body.message).to.equal('Invalid Email/Password')
              done()
            })
          })
          it('should send an error with 404 status code because invalid password', function(done) {
            const falsePassword = { ...newUserLogin }
            falsePassword.password = 'passwordNgasal'
            chai.request(app)
            .post('/login')
            .send(falsePassword)
            .end(function(err, res) {
              expect(err).to.be.null
              expect(res).to.have.status(404)
              expect(res.body).to.be.an('object').to.have.any.keys('message')
              expect(res.body.message).to.equal('Invalid Email/Password')
              done()
            })
          })
        })
    })
})