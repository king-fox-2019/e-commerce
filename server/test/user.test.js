const { User } = require('../models');

const Chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = Chai.expect;

Chai.use(chaiHttp);

describe('/user', function() {
  before(async function() {
    await User.create({
      fullname: 'Login test',
      email: 'logintest@mail.com',
      password: '12345678',
    })
  })
  after(async function() {
    await User.deleteMany();
  })
  describe('POST /user', function() {
    it('Should create new user - (status: 201)', async function() {
      const data = {
        fullname: 'Muhammad Ilham',
        email: 'iilhamtest@mail.com',
        password: 'password',
      };
      const response = await Chai
        .request(app)
        .post('/user')
        .send(data);

      expect(response).to.have.status(201);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('fullname');
      expect(response.body).to.have.property('email');
      expect(response.body).to.have.property('password');
      expect(response.body.password).to.not.equal(data.password);
    })
    it('Should error when email is duplicate - (status: 400)', async function() {
      const data = {
        fullname: 'test email duplicate',
        email: 'iilhamtest@mail.com',
        password: 'helllotest',
      }
      const response = await Chai
        .request(app)
        .post('/user')
        .send(data)

      expect(response).to.have.status(400);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.be.an('Array');
      expect(response.body.errors).to.include('Email already taken');
      expect(response.body.errors).to.have.length(1);
    })
    it('Should error when password is less than 6 - (status: 400)', async function() {
      const data = {
        fullname: 'password',
        email: 'iitest@mail.com',
        password: 'hst',
      }
      const response = await Chai
        .request(app)
        .post('/user')
        .send(data)

      expect(response).to.have.status(400);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.include('Your password is too short (min 6 characters)');
      expect(response.body.errors).to.have.length(1);
    })
    it('Should error when password is more than 12 - (status: 400)', async function() {
      const data = {
        fullname: 'password too long',
        email: 'iiteddst@mail.com',
        password: 'hssdsdasdasdasdasdasat',
      }
      const response = await Chai
        .request(app)
        .post('/user')
        .send(data)

      expect(response).to.have.status(400);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.include('Hold up, your password is too long! (max 12 charactes)');
      expect(response.body.errors).to.have.length(1);
    })
    it('Should error when fields is empty - (status: 400)', async function() {
      const data = {};
      const response = await Chai
        .request(app)
        .post('/user')
        .send(data)

      expect(response).to.have.status(400);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.include('Password is required');
      expect(response.body.errors).to.include('Fullname is required');
      expect(response.body.errors).to.include('Email is required');
      expect(response.body.errors).to.have.length(3);
      
    })
  })
  describe('POST /user/login', function() {
    it('Shoudl send token when login is success - (status: 200)', async function() {
      const data = {
        email: 'logintest@mail.com',
        password: '12345678',
      };
      const response = await Chai
        .request(app)
        .post('/user/login')
        .send(data)

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('token');
    })
    it('Should error when fields is empty - (status: 400)', async function() {
      const data = {
        email: '',
        password: '',
      };

      const response = await Chai
        .request(app)
        .post('/user/login')
        .send(data)

      expect(response).to.have.status(400);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.be.an('Array');
      expect(response.body.errors).to.include('email and password could not be empty');
    })
    it('Should error when email is wrong - (status: 400)', async function() {
      const data = {
        email: 'helloe@mail.com',
        password: '12345678',
      };

      const response = await Chai
        .request(app)
        .post('/user/login')
        .send(data)

      expect(response).to.have.status(404);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.be.an('Array');
      expect(response.body.errors).to.include('Access denied, user not found');
    })
    it('Should error when password is wrong - (status: 400)', async function() {
      const data = {
        email: 'logintest@mail.com',
        password: '126lkjmnjkh78',
      };

      const response = await Chai
        .request(app)
        .post('/user/login')
        .send(data)

      expect(response).to.have.status(401);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.be.an('Array');
      expect(response.body.errors).to.include('Access denied, Wrong email / password');
    })
  })
})