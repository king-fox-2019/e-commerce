const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const User = require("../models/User");

chai.use(chaiHttp);
const expect = chai.expect;
let server = chai.request(app);

let newUser = {
  name: "Ice Bear",
  email: "icebear@mail.com",
  password: "ic3eBe@r"
};

let userSignIn = {
  email: newUser.email,
  password: newUser.password
};

before(function() {
  server.keepOpen();
});

after(function() {
  server.close();
});

before(function() {
  const data = {
    name: "Panda",
    email: "panda@mail.com",
    password: "p4nd@Cute"
  };
  User.create(data)
    .then(user => console.log("testing: success create initial user"))
    .catch(console.log);
});

after(function(done) {
  if (process.env.NODE_ENV === "testing") {
    User.deleteMany({})
      .then(_ => {
        console.log("testing: delete data user success!");
        done();
      })
      .catch(console.log);
  }
});

describe("User route", function() {
  describe("POST /users/signup", function() {
    describe("Success proccess", function() {
      it("Should send an object ('message','token') with 201 status code", function(done) {
        server
          .post("/users/signup")
          .send(newUser)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message", "token");
            expect(res.body.message).to.equal("Sign Up Success");
            done();
          });
      });
    });
    describe("Error proccess", function() {
      it("Should send an error 400 status code because missing name value", function(done) {
        const withoutName = { ...newUser };
        delete withoutName.name;
        server
          .post("/users/signup")
          .send(withoutName)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message");
            expect(res.body.message).to.equal("ValidationError");
            done();
          });
      });
      it("Should send an error 400 status code because missing email value", function(done) {
        const withoutEmail = { ...newUser };
        delete withoutEmail.email;
        server
          .post("/users/signup")
          .send(withoutEmail)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message");
            expect(res.body.message).to.equal("ValidationError");
            done();
          });
      });
      it("Should send an error 400 status code because existing email value", function(done) {
        const sameValue = { ...newUser };
        server
          .post("/users/signup")
          .send(sameValue)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message");
            expect(res.body.message).to.equal("ValidationError");
            done();
          });
      });
      it("Should send an error 400 status code because email format is invalid", function(done) {
        const withoutEmail = { ...newUser };
        withoutEmail.email = "thisisemail";
        server
          .post("/users/signup")
          .send(withoutEmail)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message");
            expect(res.body.message).to.equal("ValidationError");
            done();
          });
      });
      it("Should send an error 400 status code because missing password value", function(done) {
        const withoutPassword = { ...newUser };
        delete withoutPassword.password;
        server
          .post("/users/signup")
          .send(withoutPassword)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message");
            expect(res.body.message).to.equal("ValidationError");
            done();
          });
      });
      it("Should send an error 400 status code because password format is invalid", function(done) {
        const withoutPassword = { ...newUser };
        withoutPassword.password = "thisisinvalidpassword";
        server
          .post("/users/signup")
          .send(withoutPassword)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message");
            expect(res.body.message).to.equal("ValidationError");
            done();
          });
      });
    });
  });
  describe("POST /users/signin", function() {
    describe("Success proccess", function() {
      it("Should send an object ('message','token') with 200 status code", function(done) {
        server
          .post("/users/signin")
          .send(userSignIn)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message", "token");
            expect(res.body.message).to.equal("Sign In Success");
            done();
          });
      });
    });
    describe("Error proccess", function() {
      it("Should send an error 400 status code because missing email value", function(done) {
        const withoutEmail = { ...userSignIn };
        delete withoutEmail.email;
        server
          .post("/users/signin")
          .send(withoutEmail)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message");
            expect(res.body.message).to.equal("User not found");
            done();
          });
      });
      it("Should send an error 400 status code because wrong email value", function(done) {
        const wrongEmail = { ...userSignIn };
        wrongEmail.email = "thisiswrongmail@mail.com";
        server
          .post("/users/signin")
          .send(wrongEmail)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message");
            expect(res.body.message).to.be.equal("User not found");
            done();
          });
      });
      it("Should send an error 400 status code because missing password value", function(done) {
        const withoutPassword = { ...userSignIn };
        delete withoutPassword.password;
        server
          .post("/users/signin")
          .send(withoutPassword)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message");
            expect(res.body.message).to.be.equal("Password cannot be empty");
            done();
          });
      });
      it("Should send an error 400 status code because password is wrong", function(done) {
        const wrongPassword = { ...userSignIn };
        wrongPassword.password = "thisiswrongpassword";
        server
          .post("/users/signin")
          .send(wrongPassword)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.be.have.status(400);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message");
            expect(res.body.message).to.be.equal("Wrong password");
            done();
          });
      });
    });
  });
});
