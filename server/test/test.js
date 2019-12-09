const chai = require('chai')
const { expect } = chai
const chaiHttp = require('chai-http')
const { User } = require('../models')

const app = require('../app')

chai.use(chaiHttp)

const server = chai.request(app)

describe('User Routes', function() {
  describe('User Sign Up', function() {
    const user = {
      username: 'foo',
      email: 'foo@mail.com',
      password: 'foobar'
    }

    before('Mocking registered user', function(done) {
      User.create({
        username: 'dummy',
        email: 'dummy@mail.com',
        password: '123456'
      })
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
          })
      })
    })

    context('Success:', function() {
      it('Should response 422 with message "User registered" and User data', function() {
        return server
          .post('/signup')
          .send(user)
          .then(res => {
            expect(res).to.have.status(201)
            expect(res).to.have.property('body')
            expect(res.body)
              .to.have.property('message')
              .equals('User registered')
          })
      })
    })
  })
})
