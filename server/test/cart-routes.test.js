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
      .then(() => {
        console.log('Dummy items created')
        done()
      })
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

  describe('Add and remove items of Cart', function() {
    const itemAdd = {
      name: 'kaos',
      image: 'kaos.jpg',
      price: 120000,
      stock: 310
    }
    let itemId

    before('Get one product id', function(done) {
      Item.create(itemAdd)
        .then(item => {
          itemId = item._id
          done()
        })
        .catch(done)
    })

    context('Success:', function() {
      it('Sends item kaos, amount 1, and should response 200 with message "Cart item updated" and data of cart with items have item only kaos and amount 1, and reduce stock of kaos by 1', function() {
        return server
          .patch('/user/cart')
          .set({ access_token })
          .send({ item: itemId, amount: 1 })
          .then(res => {
            expect(res).to.have.status(200)
            expect(res).to.have.property('body')
            expect(res.body)
              .to.have.property('message')
              .equals('Cart item updated')
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
              .of.length(1)
            expect(res.body.data.items).to.contain({
              item: { _id: itemId, ...itemAdd, stock: undefined },
              amount: 1
            })

            return Item.findById(itemId)
          })
          .then(item => {
            expect(item)
              .to.have.property('name')
              .equals(itemAdd.name)
            expect(item)
              .to.have.property('image')
              .equals(itemAdd.image)
            expect(item)
              .to.have.property('price')
              .equals(itemAdd.price)
            expect(item)
              .to.have.property('stock')
              .equals(itemAdd.stock - 1)
          })
      })

      it('Sends item kaos, amount 5, and should response 200 with message "Cart item updated" and data of cart with items have item only kaos (not duplicated) and amount 5, and reduce stock of kaos by 5', function() {
        return server
          .patch('/user/cart')
          .set({ access_token })
          .send({ item: itemId, amount: 5 })
          .then(res => {
            expect(res).to.have.status(200)
            expect(res).to.have.property('body')
            expect(res.body)
              .to.have.property('message')
              .equals('Cart item updated')
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
              .of.length(1)
            expect(res.body.data.items).to.contain({
              item: { _id: itemId, ...itemAdd, stock: undefined },
              amount: 5
            })

            return Item.findById(itemId)
          })
          .then(item => {
            expect(item)
              .to.have.property('name')
              .equals(itemAdd.name)
            expect(item)
              .to.have.property('image')
              .equals(itemAdd.image)
            expect(item)
              .to.have.property('price')
              .equals(itemAdd.price)
            expect(item)
              .to.have.property('stock')
              .equals(itemAdd.stock - 5)
          })
      })

      const itemJubah = {
        name: 'jubah',
        image: 'jubah.jpg',
        price: 110000,
        stock: 90
      }
      let jubahId
      it('Sends item jubah, amount 2, and should response 200 with message "Cart item updated" and data of cart with items have item kaos (from before, not removed) with amount 5, and item jubah with amount 2, and reduce items stock accordingly', function() {
        return Item.create(itemJubah)
          .then(item => {
            jubahId = item._id
            return server
              .patch('/user/cart')
              .set({ access_token })
              .send({ item: jubahId })
          })
          .then(res => {
            expect(res).to.have.status(200)
            expect(res).to.have.property('body')
            expect(res.body)
              .to.have.property('message')
              .equals('Cart item updated')
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
              .of.length(2)
            expect(res.body.data.items).to.contain({
              item: { _id: itemId, ...itemAdd, stock: undefined },
              amount: 5
            })
            expect(res.body.data.items).to.contain({
              item: { _id: jubahId, ...itemJubah, stock: undefined },
              amount: 2
            })

            return Promise.all([Item.findById(itemId), Item.findById(jubahId)])
          })
          .then(([item, jubah]) => {
            expect(item)
              .to.have.property('name')
              .equals(itemAdd.name)
            expect(item)
              .to.have.property('image')
              .equals(itemAdd.image)
            expect(item)
              .to.have.property('price')
              .equals(itemAdd.price)
            expect(item)
              .to.have.property('stock')
              .equals(itemAdd.stock - 5)

            expect(jubah)
              .to.have.property('name')
              .equals(itemJubah.name)
            expect(jubah)
              .to.have.property('image')
              .equals(itemJubah.image)
            expect(jubah)
              .to.have.property('price')
              .equals(itemJubah.price)
            expect(jubah)
              .to.have.property('stock')
              .equals(itemJubah.stock - 2)
          })
      })

      it('Sends item kaos, amount 0, and should response 200 with message "Cart item updated" and data of cart with items have item only jubah (kaos removed) with amount 2, and update items stock accordingly', function() {
        return server
          .patch('/user/cart')
          .set({ access_token })
          .send({ item: itemId, amount: 0 })
          .then(res => {
            expect(res).to.have.status(200)
            expect(res).to.have.property('body')
            expect(res.body)
              .to.have.property('message')
              .equals('Cart item updated')
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
              .of.length(1)
            expect(res.body.data.items).to.contain({
              item: { _id: jubahId, ...itemJubah, stock: undefined },
              amount: 2
            })

            return Item.findById(itemId)
          })
          .then(item => {
            expect(item)
              .to.have.property('name')
              .equals(itemAdd.name)
            expect(item)
              .to.have.property('image')
              .equals(itemAdd.image)
            expect(item)
              .to.have.property('price')
              .equals(itemAdd.price)
            expect(item)
              .to.have.property('stock')
              .equals(itemAdd.stock)
          })
      })
    })
  })
})
