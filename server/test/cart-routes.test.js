const chai = require('chai')
const { expect } = chai
const chaiHttp = require('chai-http')
const { User, Item, Cart } = require('../models')
const { sign } = require('jsonwebtoken')

const app = require('../app')

chai.use(chaiHttp)

const server = chai.request(app).keepOpen()

describe.only('Cart', function() {
  const registeredUser = {
    username: 'dummy',
    email: 'dummy@mail.com',
    password: '123456'
  }

  let access_token
  let userId

  before('Mocking registered user, cart and access_token', function(done) {
    User.create(registeredUser)
      .then(user => {
        console.log('User mock created')
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
        return Cart.create({ customer: user._id })
      })
      .then(() => {
        console.log('User cart created')
        done()
      })
      .catch(done)
  })

  before('Mocking Items', function(done) {
    Item.create(
      {
        name: 'Sepatu',
        image: 'sepatu.jpg',
        price: 240000,
        stock: 130
      },
      {
        name: 'Tas',
        image: 'tas.jpg',
        price: 320000,
        stock: 200
      },
      {
        name: 'Jaket',
        image: 'jaket.jpg',
        price: 180000,
        stock: 210
      }
    )
      .then(() => done())
      .catch(done)
  })

  after('Erasing all data', function(done) {
    User.deleteMany({})
      .then(() => {
        console.log('All user data deleted')
        return Item.deleteMany({})
      })
      .then(() => {
        console.log('All items deleted')
        return Cart.deleteMany({})
      })
      .then(() => {
        console.log('All carts deleted')
        done()
      })
      .catch(done)
  })

  after('Close server connection', function() {
    server.close()
    console.log('Server closed')
  })

  describe('Get User Cart', function() {
    context('Success:', function() {
      it('Should response 200 with data of customer cart', function() {
        return server
          .get('/user/cart')
          .set({ access_token })
          .then(res => {
            expect(res).to.have.status(200)
            expect(res).to.have.property('body')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.have.property('customer')

            expect(res.body.data.customer)
              .to.have.property('_id')
              .equals(String(userId))
            expect(res.body.data.customer)
              .to.have.property('username')
              .equals(registeredUser.username)
            expect(res.body.data.customer)
              .to.have.property('email')
              .equals(registeredUser.email)

            expect(res.body.data)
              .to.have.property('items')
              .of.an('array')
          })
      })
    })

    context('Fail:', function() {
      it('Sends no access_token and should response 401 with message "Require valid access_token"', function() {
        return server.get('/user/cart').then(res => {
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
              .get('/user/cart')
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
