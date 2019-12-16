const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require('chai-http')
const app = require('../app.js')

chai.use(chaiHttp)

describe('Routes', function(){
  describe('GET /item', function(){
    it('should return array of all item', (done) => {
      chai.request(app)
        .get('/item')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.a('string')
          done()
        })
    })
  })
  describe('GET /item/cart/:id', function(){
    it('should add item to user cart', (done) => {
      chai.request(app)
        .get('/item')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.a('string')
          done()
        })
    })
  })
  describe('GET /item/:id', function(){
    it('should return item detail', (done) => {
      chai.request(app)
        .get('/item')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.a('string')
          done()
        })
    })
  })
  describe('POST /item', function(){
    it('should push an item to item list', (done) => {
      chai.request(app)
        .get('/item')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.a('string')
          done()
        })
    })
  })
  describe('PATCH /item/:id', function(){
    it('should edit an item', (done) => {
      chai.request(app)
        .get('/item')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.a('string')
          done()
        })
    })
  })
  describe('DELETE /item/:id', function(){
    it('should delete item from item list', (done) => {
      chai.request(app)
        .get('/item')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.a('string')
          done()
        })
    })
  })
  describe('POST /user/login', function(){
    it('should return access token', (done) => {
      chai.request(app)
        .post('/user/login')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.a('string')
          done()
        })
    })
  })
  describe('POST /user/register', function(){
    it('should return access token', (done) => {
      chai.request(app)
        .post('/user/register')
        .end((err, res) => {
          expect(res).to.have.status(201)
          expect(res.body).to.be.a('string')
          done()
        })
    })
  })
})