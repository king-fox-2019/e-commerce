const chai = require("chai");
const chaiHttp = require("chai-http")
const server = require("../app");
const { User } = require("../models")
chai.use(chaiHttp);
const expect = chai.expect;

//---------------------------------------------------//
//          User Sign In / Register Testing          //
// --------------------------------------------------//

after(function(done) {
  User.deleteMany({})
  .then(() => {
    done()
  })
  .catch(err => {
    console.log(err)
  })
})


describe("User", function() {
  describe("POST /user/signup", function() {
    
    describe("Successful", function() {
      it("should return status code 201 and access token", function(done) {
        let user = {
          username: "username",
          email: "my@mail.com",
          password: "pass123"
        }
        chai.request(server)
        .post("/user/signup")
        .send(user)
        .then(res => {
          expect(res).to.have.status(201)
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.keys("access_token", "email")
          done();
        })
        .catch(done)
      })
    })
    
    describe("Taken email", function() {
      it("should return status code 400 and email has been registered message", function(done) {
        let user = {
          username: "usernameX",
          email: "my@mail.com",
          password: "pass123"
        }
        chai.request(server)
        .post("/user/signup")
        .send(user)
        .then(res => {
          expect(res).to.have.status(400)
          expect(res.body).to.be.an("object")
          expect(res.body.message).to.include("email")
          done();
        })
        .catch(done)
      })
    })
    
    describe("Taken username", function() {
      it("should return status code 400 and username has been registered message", function(done) {
        let user = {
          username: "username",
          email: "myU@mail.com",
          password: "pass123"
        }
        chai.request(server)
        .post("/user/signup")
        .send(user)
        .then(res => {
          expect(res).to.have.status(400)
          expect(res.body).to.be.an("object")
          expect(res.body.message).to.include("username")
          done();
        })
        .catch(done)
      })
    })
    
    describe("Invalid email input", function() {
      it("should return status code 400 and invalid email input message", function(done) {
        let user = {
          username: "username1",
          email: "mymail.com",
          password: "pass123"
        }
        chai.request(server)
        .post("/user/signup")
        .send(user)
        .then(res => {
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body.message).to.include("email")
            done();
          })
          .catch(done)
        })
      })

      describe("Too short password", function() {
        it("should return status code 400 and minimum password length message", function(done) {
        let user = {
          username: "username2",
          email: "mymail2@mail.com",
          password: "short"
        }
        chai.request(server)
        .post("/user/signup")
          .send(user)
          .then(res => {
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body.message).to.include("password")
            done();
          })
          .catch(done)
        })
      })
      
      describe("Empty username", function() {
        it("should return status code 400 and message invalid email input", function(done) {
          let user = {
            email: "my3@mail.com",
            password: "pass123"
          }
          chai.request(server)
          .post("/user/signup")
          .send(user)
          .then(res => {
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body.message).to.include("username")
            done();
          })
          .catch(done)
        })
      })
      
      describe("Empty email", function() {
        it("should return status code 400 and message email must be filled out", function(done) {
          let user = {
            username: "usernamee",
            password: "pass123"
          }
          chai.request(server)
          .post("/user/signup")
          .send(user)
          .then(res => {
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body.message).to.include("email")
            done();
          })
          .catch(done)
        })
      })
      
      describe("Empty password", function() {
        it("should return status code 400 and message password must be filled out", function(done) {
        let user = {
          username: "usernameex",
          email: "empty@mail.com"
        }
        chai.request(server)
        .post("/user/signup")
        .send(user)
        .then(res => {
          expect(res).to.have.status(400)
          expect(res.body).to.be.an("object")
          expect(res.body.message).to.include("password")
          done();
        })
        .catch(done)
      })
    })
    
  })
  
  describe("POST /user/signin", function() {
    
    describe("Successful", function() {
      it("should return status code 200 and access token", function(done) {
        let user = {
          email: "my@mail.com", 
          password: "pass123"
        }
        chai.request(server)
        .post("/user/signin")
        .send(user)
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.keys("access_token", "email")
          done();
        })
        .catch(done)
      })
    })
    
    describe("Invalid email", function() {
      it("should return status code 400 and invalid email message", function(done) {
        let user = {
          email: "mymail.com", 
          password: "pass123"
        }
        chai.request(server)
        .post("/user/signin")
        .send(user)
        .then(function(res) {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object")
          expect(res.body.message).to.include("email")
            done();
          })
          .catch(done)
        })
      })
      
      describe("Empty email", function() {
        it("should return status code 400 and email must be filled out message", function(done) {
          let user = {
            password: "ada"
          }
          chai.request(server)
          .post("/user/signin")
          .send(user)
          .then(function(res) {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object")
            expect(res.body.message).to.include("email")
            done();
          })
          .catch(done)
        })
      })
      
    });
  })
  






