const { Product } = require('../models');

const Chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = Chai.expect;
let id = ''

Chai.use(chaiHttp);

describe('# /product', function() {
  before(async function() {
    await Product.deleteMany();
    await Product.create({
      name: 'Product test',
      price: 1111,
      stock: 1000,
      wear: 'Factory New',
      image: 'https://cdn.productplan.com/wp-content/uploads/2019/10/product-led-vs-revenue-driven-800x500.png',
      'about': 'In marketing, a product is an object or system made available for consumer use; it is anything that can be offered to a market to satisfy the desire or need of a customer.',
    }).then((created) => {
      id = created._id;
    }).catch()
  })
  after(async function() {
    await Product.deleteMany();
  })
  describe('POST /product', function() {
    it('Should create new product - (Status: 201)', async function() {
      const productCreate = {
        name: 'create produck',
        price: 99,
        stock: 10,
        wear: 'Factory New',
        image: 'https://miro.medium.com/max/2834/0*f81bU2qWpP51WWWC.jpg',
        about: 'product for testing'
      };

      const response = await Chai
        .request(app)
        .post('/product')
        .send(productCreate)

      expect(response).to.have.status(201);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('price');
      expect(response.body).to.have.property('stock');
      expect(response.body).to.have.property('wear');
      expect(response.body).to.have.property('image');
      expect(response.body).to.have.property('about');
      expect(response.body.name).to.equal(productCreate.name);
      expect(response.body.stock).to.equal(productCreate.stock);
      expect(response.body.price).to.equal(productCreate.price);
      expect(response.body.wear).to.equal(productCreate.wear);
      expect(response.body.image).to.equal(productCreate.image);
      expect(response.body.about).to.equal(productCreate.about);
    })
    it('Should error when name is empty - (status: 400)', async function() {
      const productCreate = {
        name: '',
        price: 99,
        stock: 10,
        wear: 'Factory New',
        image: 'https://miro.medium.com/max/2834/0*f81bU2qWpP51WWWC.jpg',
        about: 'product for testing'
      };
      const response = await Chai
        .request(app)
        .post('/product')
        .send(productCreate);

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.be.an('Array');
      expect(response.body.errors).to.include('Product name cant be empty')
    })
    it('Should error when price is empty - (status: 400)', async function() {
      const productCreate = {
        name: 'product',
        stock: 10,
        wear: 'Factory New',
        image: 'https://miro.medium.com/max/2834/0*f81bU2qWpP51WWWC.jpg',
        about: 'product for testing'
      };
      const response = await Chai
        .request(app)
        .post('/product')
        .send(productCreate);

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.be.an('Array');
      expect(response.body.errors).to.include('Product price cant be empty')
    })
    it('Should error when stock is empty - (status: 400)', async function() {
      const productCreate = {
        name: 'product',
        price: 5000,
        wear: 'Factory New',
        image: 'https://miro.medium.com/max/2834/0*f81bU2qWpP51WWWC.jpg',
        about: 'product for testing'
      };
      const response = await Chai
        .request(app)
        .post('/product')
        .send(productCreate);

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.be.an('Array');
      expect(response.body.errors).to.include('Product stock cant be empty')
    })
    it('Should error if price is contain alphabet - (status: 400)', async function() {
      const productCreate = {
        name: 'product',
        price: 'limaribu',
        stock: 100,
        wear: 'Factory New',
        image: 'https://miro.medium.com/max/2834/0*f81bU2qWpP51WWWC.jpg',
        about: 'product for testing'
      };
      const response = await Chai
        .request(app)
        .post('/product')
        .send(productCreate);

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.be.an('Array');
    })
    it('Should error if price is contain alphabet - (status: 400)', async function() {
      const productCreate = {
        name: 'product',
        price: 20,
        stock: 'seratus',
        wear: 'Factory New',
        image: 'https://miro.medium.com/max/2834/0*f81bU2qWpP51WWWC.jpg',
        about: 'product for testing'
      };
      const response = await Chai
        .request(app)
        .post('/product')
        .send(productCreate);

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.be.an('Array');
    })
  })
  describe('GET /product', function() {
    it('Shoud send products in array - (status: 200)', async function() {
      const response = await Chai
        .request(app)
        .get('/product')
      expect(response).to.have.status(200);
      expect(response.body).to.be.an('Array');
    })
  })
  describe('GET /product/:id', function() {
    it('Should send object of product - (status: 200)', async function() {
      const response = await Chai
        .request(app)
        .get(`/product/${id}`)

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('price');
      expect(response.body).to.have.property('stock');
      expect(response.body).to.have.property('wear');
      expect(response.body).to.have.property('image');
      expect(response.body).to.have.property('about');
    })
    it('Should send error when product id is not found - (status: 404)', async function() {
      const response = await Chai
        .request(app)
        .get('/product/5dec21bfe2199e62c1896c9b')
      expect(response).to.have.status(404);
      expect(response.body).to.be.have.property('errors');
      expect(response.body.errors).to.be.an('Array');
      expect(response.body.errors).to.include('Product not found')
    })
    it('Should send error when product id is not valid - (status: 500)', async function() {
      const response = await Chai
        .request(app)
        .get(`/product/5dec21dasd6c9b`)
      expect(response).to.have.status(500);
      expect(response.body).to.be.have.property('errors');
    })
  })
  describe('DELETE /product/:id', function() {
    it('Should delete product - (status: 200)', async function() {
      const response = await Chai
        .request(app)
        .delete('/product/5dec21bfe2199e62c1896c9b')
      expect(response).to.have.status(200);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.a('String');
      expect(response.body.message).to.equal('Product deleted!');
    })
    it('Should error when product id is not valid - (status: 500)', async function() {
      const response = await Chai
        .request(app)
        .delete('/product/5asdadaec21896c9b')
      expect(response).to.have.status(500);
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.be.an('Array');
    })
  })
})