const chai = require('chai')
const { expect } = chai
const chaiHttp = require('chai-http')
const { User, Item } = require('../models')
const { sign } = require('jsonwebtoken')

const app = require('../app')

chai.use(chaiHttp)

const server = chai.request(app).keepOpen()

describe('Item', function() {
  const registeredUser = {
    username: 'dummy',
    email: 'dummy@mail.com',
    password: '123456'
  }

  let access_token

  before('Mocking registered user and access_token', function(done) {
    User.create(registeredUser)
      .then(user => {
        console.log('User mock created')
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
        done()
      })
      .catch(done)
  })

  after('Close server connection', function() {
    server.close()
    console.log('Server closed')
  })

  describe('Get All Items', function() {
    context('Success:', function() {
      it('Should response 200 with data of all items (mocking 3 items)', function() {
        return server
          .get('/items')
          .set({ access_token })
          .then(res => {
            expect(res).to.have.status(200)
            expect(res).to.have.property('body')
            expect(res.body).to.have.property('data')
            expect(res.body.data)
              .to.be.an('array')
              .of.length(3)
          })
      })
    })

    context('Fail:', function() {
      it('Sends no access_token and should response 401 with message "Require valid access_token"', function() {
        return server.get('/items').then(res => {
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
              .get('/items')
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

  describe('Get One Item', function() {
    const oneItem = {
      name: 'topi',
      image: 'topi.jpg',
      price: 140000,
      stock: 120
    }
    let itemId

    beforeEach("Get an item's id", function(done) {
      Item.create(oneItem)
        .then(item => {
          itemId = item._id
          done()
        })
        .catch(done)
    })

    afterEach('Delete item', function(done) {
      Item.deleteOne(oneItem)
        .then(() => {
          done()
        })
        .catch(done)
    })

    context('Success:', function() {
      it('Should response 200 with data of an item correctly', function() {
        return server
          .get(`/items/${itemId}`)
          .set({ access_token })
          .then(res => {
            expect(res).to.have.status(200)
            expect(res).to.have.property('body')
            expect(res.body).to.have.property('data')
            expect(res.body.data)
              .to.have.property('name')
              .equals(oneItem.name)
            expect(res.body.data)
              .to.have.property('image')
              .equals(oneItem.image)
            expect(res.body.data)
              .to.have.property('price')
              .equals(oneItem.price)
            expect(res.body.data)
              .to.have.property('stock')
              .equals(oneItem.stock)
          })
      })
    })

    context('Fail:', function() {
      it('Should response 404 with message "Item not found"', function() {
        return Item.deleteOne(oneItem).then(() => {
          return server
            .get(`/items/${itemId}`)
            .set({ access_token })
            .then(res => {
              expect(res).to.have.status(404)
              expect(res).to.have.property('body')
              expect(res.body)
                .to.have.property('message')
                .equals('Item not found')
            })
        })
      })

      it('Sends no access_token and should response 401 with message "Require valid access_token"', function() {
        return server.get(`/items/${itemId}`).then(res => {
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
              .get(`/items/${itemId}`)
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
