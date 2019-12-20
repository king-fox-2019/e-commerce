const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const {User} = require('../models');

chai.use(chaiHttp);

describe('Testing users router', function() {
  describe('#Testing register routes', function() {
    afterEach(function() {
      User.deleteOne({username: 'test'})
        .then(console.log)
        .catch(console.log);
    });

    it('should return access token and status code 201', function(done) {
      chai
        .request(app)
        .post('/users/register')
        .send({
          username: 'test',
          email: 'test@email.com',
          password: 'asdfasdf',
        })
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('access_token');
          expect(res.body).to.have.property('username');
          done();
        })
        .catch(done);
    });

    describe('##Testing errors on register routes', function() {
      it('should return 2 errors with status code 400 when omit 2 required field', function(done) {
        chai
          .request(app)
          .post('/users/register')
          .send({
            username: 'test',
          })
          .then(function(res) {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors).to.be.an('array');
            expect(res.body.errors).with.lengthOf(2);
            done();
          })
          .catch(done);
      });

      it('should return 3 errors with status code 400 when omit all required field', function(done) {
        chai
          .request(app)
          .post('/users/register')
          .then(function(res) {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors).to.be.an('array');
            expect(res.body.errors).with.lengthOf(3);
            done();
          })
          .catch(done);
      });

      it('should return 1 error with status code 400 when omit 1 required field', function(done) {
        chai
          .request(app)
          .post('/users/register')
          .send({
            username: 'test',
            email: 'test@email.com',
          })
          .then(function(res) {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors).to.be.an('array');
            expect(res.body.errors).with.lengthOf(1);
            done();
          })
          .catch(done);
      });

      it('should return 1 error with status code 400 when input invalid email format', function(done) {
        chai
          .request(app)
          .post('/users/register')
          .send({
            username: 'test',
            email: 'invalidemailformat',
            password: 'asdfasdf',
          })
          .then(function(res) {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors).to.be.an('array');
            expect(res.body.errors).with.lengthOf(1);
            expect(res.body.errors[0]).equal('invalid email format');
            done();
          })
          .catch(done);
      });

      it('should return 1 error with status code 400 when password length less than 6', function(done) {
        chai
          .request(app)
          .post('/users/register')
          .send({
            username: 'test',
            email: 'test@email.com',
            password: 'asdf',
          })
          .then(function(res) {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors).to.be.an('array');
            expect(res.body.errors).with.lengthOf(1);
            expect(res.body.errors[0]).equal(
              'password length at least 6 characters',
            );
            done();
          })
          .catch(done);
      });
    });
  });

  describe('#Testing login routes', function() {
    before(function() {
      User.create({
        username: 'test',
        email: 'test@email.com',
        password: 'asdfasdf',
      })
        .then(console.log)
        .catch(console.log);
    });

    it('should return error with status code 403', function(done) {
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: 'wrong@email.com',
          password: 'wrongpassword',
        })
        .then(function(res) {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.be.a('string');
          expect(res.body.errors).equal('email or password is wrong');
          done();
        })
        .catch(done);
    });

    it('should return access token and username with status code 200', function(done) {
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: 'test@email.com',
          password: 'asdfasdf',
        })
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('access_token');
          expect(res.body).to.have.property('username');
          done();
        })
        .catch(done);
    });
  });

  after(function() {
    User.deleteOne({username: 'test'})
      .then(console.log)
      .catch(console.log);
  });
});
