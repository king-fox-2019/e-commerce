const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const{Product} = require('../models')

chai.use(chaiHttp)

describe('Testing product router', function () {
  describe('Testing add new product', function () {
    afterEach(function () {
      Product.deleteOne({ name: 'Barang coba'})
        .then(console.log)
        .catch(console.log)
    })

    it('should return success message with status 201', function (done) {
      chai.request(app)
        .post('/products')
        .send({
          name: 'Barang coba',
          price: 10000,
          stock: 100
        })
        .then(function (res) {
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('message')
          expect(res.body.message).equal('Success add new product')
          done()
        })
        .catch(done)
    })
  })
})
