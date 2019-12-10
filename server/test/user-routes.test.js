const chai = require('chai')
const { expect } = chai
const chaiHttp = require('chai-http')
const { User } = require('../models')
const { sign } = require('jsonwebtoken')

const app = require('../app')

chai.use(chaiHttp)

const server = chai.request(app).keepOpen()

describe('User', function() {
  const registeredUser = {
    username: 'dummy',
    email: 'dummy@mail.com',
    password: '123456'
  }

  before('Mocking registered user', function(done) {
    User.create(registeredUser)
      .then(() => {
        console.log('User mock created')
        done()
      })
      .catch(done)
  })

  after('Erasing all user data', function(done) {
    User.deleteMany({})
      .then(() => {
        console.log('All user data deleted')
        done()
      })
      .catch(done)
  })

  after('Close server connection', function() {
    server.close()
    console.log('Server closed')
  })

  describe('User Sign Up', function() {
    const user = {
      username: 'foo',
      email: 'foo@mail.com',
      password: 'foobar'
    }

    afterEach('Remove registering User', function(done) {
      User.deleteOne({
        $or: [{ username: 'foo' }, { email: 'foo@mail.com' }]
      })
        .then(() => done())
        .catch(done)
    })

    context('Success:', function() {
      it('Should response 201 with message "User registered" and User data', function() {
        return server
          .post('/signup')
          .send(user)
          .then(res => {
            expect(res).to.have.status(201)
            expect(res).to.have.property('body')
            expect(res.body)
              .to.have.property('message')
              .equals('User registered')
            expect(res.body).to.have.property('data')
            expect(res.body.data)
              .to.have.property('username')
              .equals(user.username)
            expect(res.body.data)
              .to.have.property('email')
              .equals(user.email)
            expect(res.body.data)
              .to.have.property('password')
              .equals(user.password)
          })
          .catch(err => {
            throw err
          })
      })
    })

    context('Fail:', function() {
      it('Should response 422 with required validation error message', function() {
        return server.post('/signup').then(res => {
          expect(res).to.have.status(422)
          expect(res).to.have.property('body')
          expect(res.body)
            .to.have.property('message')
            .to.be.an('array')
            .of.length(3)
          expect(res.body.message).to.contain('Username required')
          expect(res.body.message).to.contain('Email required')
          expect(res.body.message).to.contain('Password required')
        })
      })

      it('Should response 422 with unique validation error message', function() {
        return server
          .post('/signup')
          .send(registeredUser)
          .then(res => {
            expect(res).to.have.status(422)
            expect(res).to.have.property('body')
            expect(res.body)
              .to.have.property('message')
              .to.be.an('array')
              .of.length(2)
            expect(res.body.message).to.contain('Username already taken')
            expect(res.body.message).to.contain('Email already registered')
          })
      })

      it('Should response 422 with message "Username can contain only alphanumerics, underscores, and dots"', function() {
        return server
          .post('/signup')
          .send({ ...user, username: '@ ?-~' })
          .then(res => {
            expect(res).to.have.status(422)
            expect(res).to.have.property('body')
            expect(res.body).to.have.property('message')
            expect(res.body.message)
              .to.be.an('array')
              .of.length(1)
            expect(res.body.message).to.contain(
              'Username can contain only alphanumerics, underscores, and dots'
            )
          })
      })

      it('Should response 422 with message "Invalid email format"', function() {
        return server
          .post('/signup')
          .send({ ...user, email: 'dummythisiswrongemailformat' })
          .then(res => {
            expect(res).to.have.status(422)
            expect(res).to.have.property('body')
            expect(res.body).to.have.property('message')
            expect(res.body.message)
              .to.be.an('array')
              .of.length(1)
            expect(res.body.message).to.contain('Invalid email format')
          })
      })

      it('Should response 422 with message "Password length must be at least 6"', function() {
        return server
          .post('/signup')
          .send({ ...user, password: '123' })
          .then(res => {
            expect(res).to.have.status(422)
            expect(res).to.have.property('body')
            expect(res.body).to.have.property('message')
            expect(res.body.message)
              .to.be.an('array')
              .of.length(1)
            expect(res.body.message).to.contain(
              'Password length must be at least 6'
            )
          })
      })
    })
  })

  describe('User Sign In', function() {
    context('Succes:', function() {
      it('Sends username, email password and should response 200 with message "Sign in success" and data containing access_token', function() {
        return server
          .post('/signin')
          .send(registeredUser)
          .then(res => {
            expect(res).to.have.status(200)
            expect(res).to.have.property('body')
            expect(res.body)
              .to.have.property('message')
              .equals('Sign in success')
            expect(res.body).to.have.property('data')
            expect(res.body.data)
              .to.have.property('access_token')
              .to.be.a('string')
          })
      })

      it('Sends username and password and should response 200 with message "Sign in success" and data containing access_token', function() {
        return server
          .post('/signin')
          .send({ ...registeredUser, email: undefined })
          .then(res => {
            expect(res).to.have.status(200)
            expect(res).to.have.property('body')
            expect(res.body)
              .to.have.property('message')
              .equals('Sign in success')
            expect(res.body).to.have.property('data')
            expect(res.body.data)
              .to.have.property('access_token')
              .to.be.a('string')
          })
      })

      it('Sends email and password and should response 200 with message "Sign in success" and data containing access_token', function() {
        return server
          .post('/signin')
          .send({ ...registeredUser, username: undefined })
          .then(res => {
            expect(res).to.have.status(200)
            expect(res).to.have.property('body')
            expect(res.body)
              .to.have.property('message')
              .equals('Sign in success')
            expect(res.body).to.have.property('data')
            expect(res.body.data)
              .to.have.property('access_token')
              .to.be.a('string')
          })
      })

      it('Sends emailUsername and password and should response 200 with message "Sign in success" and data containing access_token', function() {
        return server
          .post('/signin')
          .send({
            emailUsername: registeredUser.username,
            password: registeredUser.password
          })
          .then(res => {
            expect(res).to.have.status(200)
            expect(res).to.have.property('body')
            expect(res.body)
              .to.have.property('message')
              .equals('Sign in success')
            expect(res.body).to.have.property('data')
            expect(res.body.data)
              .to.have.property('access_token')
              .to.be.a('string')
          })
      })
    })

    context('Fail:', function() {
      it('Sends nothing and should response 422 with message "Wrong username/email/password"', function() {
        return server.post('/signin').then(res => {
          expect(res).to.have.status(422)
          expect(res).to.have.property('body')
          expect(res.body)
            .to.have.property('message')
            .equals('Wrong username/email/password')
        })
      })

      it('Sends invalid username and should response 422 with message "Wrong username/email/password"', function() {
        return server
          .post('/signin')
          .send({ username: 'wrong', password: registeredUser.password })
          .then(res => {
            expect(res).to.have.status(422)
            expect(res).to.have.property('body')
            expect(res.body)
              .to.have.property('message')
              .equals('Wrong username/email/password')
          })
      })

      it('Sends invalid email and should response 422 with message "Wrong username/email/password"', function() {
        return server
          .post('/signin')
          .send({ email: 'wrong', password: registeredUser.password })
          .then(res => {
            expect(res).to.have.status(422)
            expect(res).to.have.property('body')
            expect(res.body)
              .to.have.property('message')
              .equals('Wrong username/email/password')
          })
      })

      it('Sends invalid emailUsername and should response 422 with message "Wrong username/email/password"', function() {
        return server
          .post('/signin')
          .send({ emailUsername: 'wrong', password: registeredUser.password })
          .then(res => {
            expect(res).to.have.status(422)
            expect(res).to.have.property('body')
            expect(res.body)
              .to.have.property('message')
              .equals('Wrong username/email/password')
          })
      })

      it('Sends invalid password and should response 422 with message "Wrong username/email/password"', function() {
        return server
          .post('/signin')
          .send({ ...registeredUser, password: 'wrong' })
          .then(res => {
            expect(res).to.have.status(422)
            expect(res).to.have.property('body')
            expect(res.body)
              .to.have.property('message')
              .equals('Wrong username/email/password')
          })
      })
    })
  })

  describe('Check Session', function() {
    let access_token
    let userId

    before('Generating access_token', function(done) {
      User.findOne({ email: registeredUser.email })
        .then(user => {
          userId = user._id
          access_token = sign(
            {
              _id: user._id,
              username: user.username,
              email: user.email
            },
            process.env.JWT_SECRET
          )
          console.log('Access token generated')
          done()
        })
        .catch(done)
    })

    context('Success:', function() {
      it('Should response 200 with data containing user payload', function() {
        return server
          .get('/user/checksession')
          .set({ access_token })
          .then(res => {
            expect(res).to.have.status(200)
            expect(res).to.have.property('body')
            expect(res.body).to.have.property('data')
            expect(res.body.data)
              .to.have.property('_id')
              .equals(String(userId))
            expect(res.body.data)
              .to.have.property('username')
              .equals(registeredUser.username)
            expect(res.body.data)
              .to.have.property('email')
              .equals(registeredUser.email)
          })
      })
    })
    context('Fail:', function() {
      it('Sends no access_token and should response 401 with message "Require valid access_token"', function() {
        return server.get('/user/checksession').then(res => {
          expect(res).to.have.status(401)
          expect(res).to.have.property('body')
          expect(res.body)
            .to.have.property('message')
            .equals('Require valid access_token')
        })
      })

      it('Sends valid access_token of banned user and should response 401 with message "User banned"', function() {
        let banned_token

        return User.create({
          username: 'banned',
          email: 'banned@mail.com',
          password: '123456'
        })
          .then(user => {
            banned_token = sign(
              {
                _id: user._id,
                username: user.username,
                email: user.email
              },
              process.env.JWT_SECRET
            )
            return User.deleteOne({ username: 'banned' })
          })
          .then(() => {
            return server
              .get('/user/checksession')
              .set({ access_token: banned_token })
              .then(res => {
                expect(res).to.have.status(401)
                expect(res).to.have.property('body')
                expect(res.body)
                  .to.have.property('message')
                  .equals('User banned')
              })
          })
      })
    })
  })
})

// describe("Signup endpoint", function() {
//   it("should return 201", function() {
//     request({ username: "Dimitri", password: "secret" })
//       .then(function(res) {
//         expect(res).to.have.status(201);
//         expect(res.body).to.have.property("username");
//         expect(res.body).to.have.property("password");
//         expect(res.body.username).to.equal("Dimitri");
//         expect(res.body.password).to.equal("secret");
//       });
//   });

//   it("should return 400", function() {
//     request({ username: "", password: "secret" })
//       .then(function(res) {
//         expect(res).to.have.status(400);
//         expect(res.body).to.have.property("errors");
//         expect(res.body.errors).to.be.an("array");
//         expect(res.body.errors).to.contain("Username is required");

//       });
//   });
// });
