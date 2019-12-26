const chai = require('chai')
const { expect } = chai
const chaiHttp = require('chai-http')
const { User, Item, Cart, Transaction } = require('../models')
const { sign } = require('jsonwebtoken')
const mongoose = require('mongoose')

const app = require('../app')

chai.use(chaiHttp)

const server = chai.request(app).keepOpen()

describe('Transaction', function() {
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

  const sepatuItem = {
    name: 'Sepatu',
    image: 'sepatu.jpg',
    price: 240000,
    stock: 130
  }

  before('Mocking Items', function(done) {
    Item.create(
      sepatuItem,
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

  before('Mocking Cart', function(done) {
    let stockAmountUpdate
    let session
    let sepatuId
    mongoose
      .startSession()
      .then(_session => {
        session = _session
        session.startTransaction()
        return Item.findOne({ name: 'Sepatu' })
      })
      .then(item => {
        sepatuId = item._id
        return Cart.findOne({ customer: userId })
      })
      .then(cart => {
        stockAmountUpdate = 1
        cart.items.push({ item: sepatuId, amount: 1 })
        return cart.save()
      })
      .then(cart => {
        return Item.findById(sepatuId)
          .then(item => {
            item.stock = item.stock - stockAmountUpdate
            return item.save()
          })
          .then(() => {
            session.commitTransaction()
            console.log('Dummy cart with item added')
            done()
          })
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
        return Transaction.deleteMany({})
      })
      .then(() => {
        console.log('All transactions deleted')
        done()
      })
      .catch(done)
  })

  after('Close server connection', function() {
    server.close()
    console.log('Server closed')
  })

  describe('Create User Transaction', function() {
    context('Success:', function() {
      it('Should response 201 with message "Transaction created" and data of the transaction with status "confirming", and also remove all items in cart', function() {
        return server
          .post('/user/transactions')
          .set({ access_token })
          .then(res => {
            expect(res).to.have.status(201)
            expect(res).to.have.property('body')
            expect(res.body).to.have.property('message', 'Transaction created')
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
            expect(res.body.data.items).to.have.deep.members([
              {
                name: sepatuItem.name,
                image: sepatuItem.image,
                price: sepatuItem.price,
                amount: 1
              }
            ])

            expect(res.body.data).to.have.property('totalPrice', 240000)
            expect(res.body.data).to.have.property('status', 'confirming')

            return Cart.findOne({ customer: userId })
          })
          .then(cart => {
            expect(cart)
              .to.have.property('items')
              .of.an('array')
              .of.length(0)
          })
      })

      it('Should response 200 with message "Items delivered" and data of the transaction when transaction\'s status changed to "done"', function() {
        let transactionId
        return Transaction.create({
          customer: userId,
          items: [
            {
              name: sepatuItem.name,
              image: sepatuItem.image,
              price: sepatuItem.price,
              amount: 1
            }
          ],
          status: 'delivering'
        })
          .then(transaction => {
            transactionId = transaction._id
            return server
              .patch(`/transactions/${transactionId}`)
              .set({ access_token })
              .send({ status: 'done' })
          })
          .then(res => {
            expect(res).to.have.status(200)
            expect(res).to.have.property('body')
            expect(res.body).to.have.property(
              'message',
              'Transaction status updated'
            )
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
            expect(res.body.data.items).to.have.deep.members([
              {
                name: sepatuItem.name,
                image: sepatuItem.image,
                price: sepatuItem.price,
                amount: 1
              }
            ])

            expect(res.body.data).to.have.property('totalPrice', 240000)
            expect(res.body.data).to.have.property('status', 'done')
          })
      })
    })
  })
})
